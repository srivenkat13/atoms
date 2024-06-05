self.addEventListener("install", (e) => {
    e.waitUntil(
      caches.open("static"),
      then((cache) => {
        return cache.addAll([
          "./",
          "./style.css",
          "./script.js",
          "./images/atom-48-48.png",
          "./images/atom-192-192.png",
        ]);
      })
    );
  });
  
  self.addEventListener("fetch", (e) => {
    e.respondWith(
      caches.match(e.request).then((response) => {
        return response || fetch(e.request);
      })
    );
  });