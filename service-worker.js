const CACHE = 'menu-hospitalari-v4';
const ASSETS = [
  './',
  './index.html?v=4',
  './styles.css?v=4',
  './app.js?v=4',
  './manifest.webmanifest',
  './icons/192.png',
  './icons/512.png'
];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))); });
self.addEventListener('activate', e => { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', e => { e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))); });
