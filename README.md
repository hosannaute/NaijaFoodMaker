# Naija Food Maker

An interactive Nigerian kitchen: choose ingredients, explore 16 measured home-style recipes, plan meals, and take a combined shopping list to the market.

## Run locally

Requires **Node.js 20+**. No third-party runtime packages or package installation are required.

```sh
cd /workspace/NaijaFoodMaker
npm start
```

Open `http://localhost:3000` in a browser. `npm run dev` starts the same server. `HOST` and `PORT` override its address; defaults are `0.0.0.0:3000`. Stop with Ctrl+C.

## Your kitchen

- Search or browse ingredients, select an entire category, or try the complete jollof pantry shortcut.
- Each recipe has measured ingredients, a base serving count, estimated prep/cook times, and numbered steps with completion checkboxes.
- Change servings from 1 to 12 to scale ingredient amounts. Cooking times and equipment need judgement; they do not scale linearly.
- “Ready to cook” requires **every listed ingredient**, including cooking staples. Pantry selections track availability, not quantities: check you have enough.
- Filter by vegetarian/vegan recipes or exclude peanuts, fish, shellfish, gluten, or coconut. Filters apply to the listed base recipe, not serving suggestions or cross-contact. Groundnut oil and yaji are conservatively flagged for peanuts; packaged stock is flagged for possible gluten. Read actual product labels. No recipe is certified allergen-free.
- Save favourites. Add recipes to a meal plan, adjust servings, and combine missing ingredients with their quantities. Identical ingredient/unit pairs are summed; pantry selections are excluded.
- Check shopping items off, copy the remaining list, or download the whole list as text. Changing a quantity resets that item's purchased state. Clipboard-denied browsers show selectable text instead.

Pantry selections, favourites, meal plans, shopping checkboxes, and dietary preferences are stored in this browser's local storage. If storage is unavailable, the app works for the visit. Clearing browser site data removes saved information.

## Android installation and offline use

Use Chrome on Android and choose **Install app** or **Add to Home screen** from the browser menu when offered. The in-app install guide includes Safari instructions. Installation availability depends on the browser.

The app must be served over **HTTPS** or localhost. On the first visit, remain online until the status says the kitchen is ready for offline use. The service worker caches the application shell and local images. Recipes, pantry, favourites, meal planning, shopping lists, and downloads then work offline, including after a reload. Native clipboard and installation prompts depend on browser support.

`manifest.webmanifest` uses relative scope/start URLs and includes 192px and 512px maskable PNG icons. The worker also supports the `/NaijaFoodMaker/` GitHub Pages subdirectory. Updates wait until the user accepts **Update available — refresh**. The worker deletes only older caches belonging to this app's scope; it does not clear another site's caches or browser local storage. **Bump the cache version in `web/sw.js` whenever changing cached application files.**

## Photography and attribution

The current serving illustrations are original project artwork. External photographs have **not yet been imported**. Wikimedia requests were blocked during initial implementation; the current environment now allows network access. The importer below is ready for a separate photo-selection and visual-review pass.

A repeatable photo workflow is included, using verified TLS and the normal environment proxy:

```sh
python3 scripts/import-photos.py --id 3
# Or omit --id to search all 16 dishes.
```

This writes `photo-candidates.json` with source file pages, authors, license names, and candidate download URLs. **Visually check dish identity and license details** on the original file pages. Build an approval JSON object mapping recipe IDs to the chosen candidate metadata, then run:

```sh
python3 scripts/import-photos.py --approve /path/to/reviewed-photos.json
```

Only CC BY, CC BY-SA, CC0, and public-domain candidates are accepted; original image authors and source/license links are retained. The importer downloads reviewed Wikimedia thumbnails into `web/assets/photos/` and writes `web/photos.js`. Recipe cards and dialogs use the local photos automatically. Credits are available in each photographed recipe and the footer. Shared-alike licenses continue to apply to their images; cropping/resizing is disclosed. Bump the service-worker cache version after importing photos. No automatic publication occurs.

## Recipe scope

These are **original home-style adaptations, not kitchen-tested formulas** or universal regional standards. Cooking times are estimates. Follow tenderness and safe-cooking checks in the method, and adjust liquid for your rice, garri, greens, or equipment. Some fish recipes explicitly call for stockfish that has already been soaked and cooked; that prior preparation time is extra. Optional sides are not included in ingredient readiness or dietary filters.

The web catalogue now includes afang leaves for Afang Soup and cocoyam for Onugbu Soup, along with the oil, salt, water, vegetables, and seasonings used by each method. The original Python CLI retains its separate simplified catalogue and is available with `python3 naijafoodmaker.py`; its garri/Eba crash has been fixed.

## Validation

```sh
npm test
```

The Node standard-library suite covers catalogue integrity, full-ingredient matching, serving scaling, merged shopping quantities, dietary/allergen filters, storage recovery, and manifest/PNG integrity. The photo-attribution check is explicitly skipped while no reviewed external photos are imported.

Optional repeatable browser checks use **Playwright** and **Chromium** (provided by the cloud runtime used for development):

```sh
node scripts/check-browser.cjs
# Optional settings:
# CHROMIUM_PATH=/path/to/chromium TEST_BASE_URL=http://127.0.0.1:3000/ node scripts/check-browser.cjs
```

Run the server first. This checks desktop and Android browser emulation, 320/390/412/768px layouts, measured recipe details, serving scaling, filters, shopping totals/persistence/downloads, clipboard fallback, offline reloads, accessible control roles, keyboard tabs, and primary 44px touch targets. Android emulation is **not physical-device or real screen-reader testing**. Screenshots are written to `/tmp/naija-kitchen-desktop.png` and `/tmp/naija-kitchen-mobile.png`.

## Files

- `web/index.html`, `web/styles.css`, `web/app.js`: semantic HTML5, responsive UI, and browser interactions.
- `web/data.js`: measured recipe and ingredient catalogue; edit this for web recipes.
- `web/matching.js`: pure matching, filtering, scaling, shopping, and storage helpers.
- `web/manifest.webmanifest`, `web/sw.js`, `web/offline.js`: installability, scoped caching, connectivity, and updates.
- `web/photos.js`, `web/assets/`: photo metadata, local artwork/photos, and icons.
- `scripts/`: optional licensed-photo import and browser validation.
- `server.js`: dependency-free static development server; no backend or build step is required.

## GitHub Pages

`.github/workflows/pages.yml` validates and deploys **only `web/`** when changes are pushed to `main`, or when run manually. In repository **Settings → Pages**, select **GitHub Actions** as the source.

The public site is `https://hosannaute.github.io/NaijaFoodMaker/`. GitHub Actions publishes updates after validation succeeds; check the deployment run before assuming a newly pushed revision is live. The app can also be hosted on another standard static HTTPS host.
