// service-worker.js

const CACHE_NAME = 'keypad-cache-v1';
// Add all the files you want to cache here
const urlsToCache = [
  '/',
  'index.html' 
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            if (response) {
                return response; // Return the cached version
            }
            return fetch(event.request); // Fetch from the network
        })
    );
});
