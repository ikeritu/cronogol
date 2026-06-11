const CACHE_NAME = "cronogol-v2.1.2";
const ASSETS = [
  "./",
  "./index.html",
  "./style.css?v=2.1.2",
  "./game.js?v=2.1.2",
  "./online-foundation.js?v=2.1.2",
  "./logo-cronogol.png",
  "./logo-cronogol-horizontal.png",
  "./favicon.png",
  "./favicon.svg",
  "./como-jugar.html",
  "./modos.html",
  "./feedback.html",
  "./apoya.html",
  "./privacidad.html",
  "./contacto.html"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).catch(()=>{}));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if(event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) =>
      cached || fetch(event.request).catch(() => caches.match("./index.html"))
    )
  );
});
