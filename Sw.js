const CACHE_NAME = 'min-app-cache-v1';
const ASSETS = [
  'index.html',
  'manifest.json',
  'ikon.png'
];

// Installerar appen och sparar filerna i telefonens minne
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Laddar filer från minnet i första hand (offline-stöd)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
