const CACHE = "rental-app-v1";
const PRECACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/sw.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") {
    return;
  }
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        return cached;
      }
      return fetch(event.request).then(response => {
        try {
          if (response.ok && new URL(event.request.url).origin === self.location.origin) {
            caches.open(CACHE).then(cache => cache.put(event.request, response.clone()));
          }
        } catch (_) {
          // Ignore cache write errors.
        }
        return response;
      });
    })
  );
});
