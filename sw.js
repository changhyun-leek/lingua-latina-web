const CACHE = 'lingua-latina-shell-d692e0a85ea3';
const ROOT = new URL('./', self.location.href);
const PRECACHE = ["./app-icon-512.png","./app-icon.png","./assets/CourseHome-CfQUPHOV.js","./assets/CourseReader-DxZlSLu0.js","./assets/Library-DsbdQX2I.js","./assets/QuizRunner-BTItbwu-.js","./assets/Review-Cn4js9tW.js","./assets/Settings-CSQoDUoY.js","./assets/audio-BJqYsC48.js","./assets/dbWorker-DQq7eXUp.js","./assets/gentium-plus-latin-ext-400-normal-BID1L8QP.woff2","./assets/gentium-plus-latin-ext-700-normal-3Uomgn00.woff2","./assets/index-BV2VS3uR.css","./assets/index-jepApFNl.js","./assets/noto-sans-kr-korean-400-normal-CmjJz_gz.woff2","./assets/noto-sans-kr-korean-600-normal-DaMZfL7Z.woff2","./assets/noto-serif-kr-korean-400-normal-Vo1gosft.woff2","./assets/noto-serif-kr-korean-600-normal-BzrM9Tn9.woff2","./assets/sqlite3-BVKGSWc-.wasm","./assets/sqlite3-opfs-async-proxy-D_xnb1D8.js","./assets/sqlite3-worker1-d88FnpHp.js","./index.html","./manifest.webmanifest"];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE)
    .then((cache) => cache.addAll(PRECACHE.map((path) => new URL(path, ROOT).href)))
    .then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || url.pathname.includes('/content/')) return;
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).then((response) => {
      const copy = response.clone();
      caches.open(CACHE).then((cache) => cache.put(new URL('index.html', ROOT), copy));
      return response;
    }).catch(() => caches.match(new URL('index.html', ROOT))));
    return;
  }
  event.respondWith(caches.match(request).then((cached) => cached || fetch(request).then((response) => {
    if (response.ok) caches.open(CACHE).then((cache) => cache.put(request, response.clone()));
    return response;
  })));
});
