const CACHE = 'menu-hospitalari-v3';
const ASSETS = [
  './','./index.html','./styles.css','./app.js','./manifest.webmanifest','./icons/192.png','./icons/512.png'
];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))); });
self.addEventListener('activate', e => { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', e => { e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))); });
