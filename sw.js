const CACHE_NAME = `bruh-calc-cache`;

var version = "1.0.1";
var coreID = version + '_core';
var pageID = version + '_pages';
var imgID = version + '_img';
var cacheIDs = [coreID, pageID, imgID];

// On version update, remove old cached files
self.addEventListener('activate', function (event) {
	event.waitUntil(caches.keys().then(function (keys) {
		return Promise.all(keys.filter(function (key) {
			return !cacheIDs.includes(key);
		}).map(function (key) {
			return caches.delete(key);
		}));
	}).then(function () {
		return self.clients.claim();
	}));
});

/* other service worker stuff */

// On install, cache some stuff
self.addEventListener('install', function (event) {
  self.skipWaiting();
	event.waitUntil(caches.open(coreID).then(function (cache) {
		cache.addAll([
      '/',
      '/script.js',
      '/sw-update.js',
      '/style.css',
      '/icon512.png',
      '/icon_maskable.png'
    ]);
	}));
});

// use install event to cache files for offline functionality
/*self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll([
      '/',
      '/script.js',
      '/style.css'
    ]);
  })());
});*/

self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);

    // Get the resource from the cache.
    const cachedResponse = await cache.match(event.request);
    if (cachedResponse) {
      return cachedResponse;
    } 
    
    else {
      try {
        // If the resource was not in the cache, try the network.
        const fetchResponse = await fetch(event.request);

        // Save the resource in the cache and return it.
        cache.put(event.request, fetchResponse.clone());
        return fetchResponse;
      } 
      
      catch (e) {
        console.log("network failed..."); // The network failed.
      }
    }
  })());
});