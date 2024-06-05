const CACHE_NAME = "pwa-cache-v1";

const URLsCache = [
  "/",
  "index.html",
  "styles.css",
  "script.js",
  "manifest.json",
  "/backend/quotes.json",
  "images/atom-48-48.png",
  "images/atom-192-192.png",
];
// check the spellings very carefully while caching the files

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("[Service Worker] Caching app shell");
        return cache.addAll(URLsCache);
      })
      .catch((error) => {
        console.error("Failed to cache resources:", error);
      })
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  // console.log("[Service Worker] Fetching resource:", event.request.url);
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        if (response) {
          // console.log("[Service Worker] Cache hit:", event.request.url);
          return response;
        }

        // console.log(
        //   "[Service Worker] Cache miss, fetching:",
        //   event.request.url
        // );
        return fetch(event.request);
      })
      .catch((error) => {
        console.error("[Service Worker] Error during fetch:", error);
      })
  );
});
