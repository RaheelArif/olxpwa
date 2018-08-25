var cacheName = "olx-pakistan";
var cacheDataName = "olx-pakistan-data";

var filesToCache = [
  '/',
  '/index.html',
  '/assets/js/main.js',
  '/assets/css/main.css',
  '/assets/js/offline.json',
  '/assets/img/footer-bg.png',
  '/assets/img/olx-logo.png',
  '/assets/img/user.png',
  '/favicon.ico',
];
self.addEventListener('install', function (e) {
  // console.log('[ServiceWorker] install');
  e.waitUntil(
    caches.open(cacheName)
      .then(function (cache) {
        return cache.addAll(filesToCache);
      })
  );
});

self.addEventListener('activate', function (e) {
  // console.log('[ServiceWorker] activate');
  e.waitUntil(
    caches.keys()
      .then(function (keyList) {
        return Promise.all(keyList.map(function (key) {
          if (key !== cacheName) {
            // console.log("service worker deleting the old key", key);
            return caches.delete(key);
          }
        }));
      })
  );
  self.clients.claim();
});


self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request.url)
      .then(function (response) {
        if (response) {
          // initiate a request to update the cached version for next use.
          updateCache(e.request);
          // return the cached version.
          return response;
        }


        if (!navigator.onLine && e.request.method.toLowerCase() !== "get") {
          // console.log('no internet to perform the request at', e.request);
          return caches.match(new Request('/assets/js/offline.json'));
        } else {
          return fetchAndUpdate(e.request);
        }
      })
  );
});

function fetchAndUpdate(request) {
  return fetch(request)
    .then(function (res) {
      if (res) {
        return caches.open(cacheDataName)
          .then(function (cache) {
            return cache.put(request, res.clone())
              .then(function () {
                return res;
              })
          });
      }
    })
}

function updateCache(request) {
  // check if we can send a request over the network
  if (!navigator.onLine)
    return;

  fetch(request.url)
    .then(function (res) {
      // check if the request is for the file for static assets?
      filesToCache.map(function (filename) {
        if (request.url.indexOf(filename) !== -1) {
          // Static asset request
          caches.open(cacheName)
          .then(function(cache) {
            cache.put(request, res.clone());
          });
        } else {
          // Dynamic asset request, store in DataCache
          caches.open(cacheDataName)
          .then(function(cache) {
            cache.put(request, res.clone());
          })
        }
      });
    });

}