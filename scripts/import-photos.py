#!/usr/bin/env python3
"""Search Wikimedia Commons and stage licensed dish photos for visual review.

Uses the normal environment proxy and verified TLS. No API keys required.
Does not publish or automatically use unreviewed search results in the app.
"""
import argparse
import html
import json
from pathlib import Path
import re
import urllib.parse
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
QUERIES = {'1': 'Egusi soup', '2': 'Ogbono soup', '3': 'Nigerian jollof rice',
           '4': 'Nigerian catfish pepper soup', '5': 'fried plantain dodo', '6': 'Moi moi',
           '7': 'Efo riro', '8': 'Ofe onugbu', '9': 'Nigerian suya', '10': 'Eba garri',
           '11': 'Nigerian okra soup', '12': 'Nigerian yam porridge asaro',
           '13': 'Ewa agoyin', '14': 'Nigerian coconut rice', '15': 'Afang soup', '16': 'Nigerian fried rice'}

def get(url):
    request = urllib.request.Request(url, headers={'User-Agent': 'NaijaFoodMaker/1.0 (educational recipe app; Wikimedia photo attribution retained)'})
    with urllib.request.urlopen(request, timeout=40) as response:
        if response.status != 200:
            raise RuntimeError(f'HTTP {response.status}')
        return response.read()

def clean(value):
    return html.unescape(re.sub('<[^>]+>', '', value)).strip()

def search(query):
    params = dict(action='query', format='json', generator='search', gsrsearch=query + ' filetype:bitmap',
                  gsrnamespace=6, gsrlimit=5, prop='imageinfo', iiprop='url|extmetadata|mime', iiurlwidth=900)
    data = json.loads(get('https://commons.wikimedia.org/w/api.php?' + urllib.parse.urlencode(params)))
    results = []
    for page in sorted(data.get('query', {}).get('pages', {}).values(), key=lambda p: p.get('index', 0)):
        info = page.get('imageinfo', [{}])[0]
        meta = info.get('extmetadata', {})
        license_name = clean(meta.get('LicenseShortName', {}).get('value', ''))
        if not (re.fullmatch(r'CC BY(?:-SA)? [1-4]\.0', license_name) or license_name in ['CC0', 'Public domain']):
            continue
        if info.get('mime') not in ['image/jpeg', 'image/png', 'image/webp']:
            continue
        results.append(dict(title=page['title'], source=info.get('descriptionurl'),
                            download=info.get('thumburl') or info['url'],
                            author=clean(meta.get('Artist', {}).get('value', 'Unknown')),
                            license=license_name, licenseUrl=meta.get('LicenseUrl', {}).get('value', ''),
                            description=clean(meta.get('ImageDescription', {}).get('value', ''))))
    return results

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--id', choices=list(QUERIES), help='Search one dish instead of the whole catalogue')
    parser.add_argument('--approve', metavar='FILE', help='JSON map of visually reviewed recipe IDs to candidate metadata; downloads and activates those photos')
    args = parser.parse_args()
    if args.approve:
        approved = json.loads(Path(args.approve).read_text())
        target = ROOT / 'web/assets/photos'
        target.mkdir(parents=True, exist_ok=True)
        for recipe_id, photo in approved.items():
            if recipe_id not in QUERIES:
                raise ValueError('Unknown recipe ID')
            if not (re.fullmatch(r'CC BY(?:-SA)? [1-4]\.0', photo.get('license', '')) or photo.get('license') in ['CC0', 'Public domain']):
                raise ValueError('Unsupported license')
            if urllib.parse.urlparse(photo.get('source', '')).hostname != 'commons.wikimedia.org' or not photo.get('author'):
                raise ValueError('A Commons file-page source and author attribution are required')
            url = photo['download']
            if urllib.parse.urlparse(url).hostname != 'upload.wikimedia.org':
                raise ValueError('Only reviewed Wikimedia uploads are supported')
            image = get(url)
            extension = '.jpg' if image.startswith(b'\xff\xd8\xff') else '.png' if image.startswith(b'\x89PNG') else '.webp' if image[:4] == b'RIFF' and image[8:12] == b'WEBP' else None
            if not extension:
                raise ValueError('Image signature is unsupported')
            name = recipe_id + extension
            (target / name).write_bytes(image)
            photo['src'] = './assets/photos/' + name
            photo['alt'] = QUERIES[recipe_id] + ' — serving photograph'
            photo['changes'] = 'Resized by Wikimedia; displayed cropped to fit recipe cards.'
        (ROOT / 'web/photos.js').write_text('export const photos = ' + json.dumps(approved, indent=2, ensure_ascii=False) + ';\n')
        print(f'Downloaded {len(approved)} reviewed photos with attribution. No publication performed.')
    else:
        result = {key: search(query) for key, query in QUERIES.items() if not args.id or key == args.id}
        output = ROOT / 'photo-candidates.json'
        output.write_text(json.dumps(result, indent=2, ensure_ascii=False))
        print(f'Wrote {output}. Visually review candidates and licenses before --approve.')
