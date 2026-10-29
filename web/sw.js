import { photos } from './photos.js';
const prefix = `naija-kitchen:${new URL(self.registration.scope).pathname}:`;
// Bump this version when changing any cached application file or importing photos.
const cacheName = `${prefix}v2`;
const shell = ['./', './index.html', './styles.css', './app.js', './data.js', './matching.js', './photos.js', './offline.js', './manifest.webmanifest', './assets/mark.svg', './assets/icon-192.png', './assets/icon-512.png', ...['jollof', 'soup', 'suya', 'plantain', 'coconut'].map(name => `./assets/${name}.svg`), ...Object.values(photos).map(photo => photo.src)];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(shell)));
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) if (key.startsWith(prefix) && key !== cacheName) await caches.delete(key);
    await self.clients.claim();
  })());
});
self.addEventListener('message', event => { if (event.data === 'ACTIVATE_UPDATE') self.skipWaiting(); });
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin || !url.href.startsWith(self.registration.scope)) return;
  event.respondWith((async () => {
    const cache = await caches.open(cacheName);
    // Keep the whole application shell on one version until an update is accepted.
    if (event.request.mode === 'navigate') return (await cache.match('./index.html')) || fetch(event.request);
    return (await cache.match(event.request, { ignoreSearch: true })) || fetch(event.request);
  })());
});
