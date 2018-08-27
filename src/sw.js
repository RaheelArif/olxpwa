importScripts('node_modules/sw-toolbox/sw-toolbox.js');

const swCaches = {
  'static': 'olx-pakistan',
  'dynamic': 'data-olx-pakistan'
}

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
    caches.open(swCaches.static)
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
          // if (key !== cacheName) {
          if (!Object.values(swCaches).includes(key)) {
            // console.log("service worker deleting the old key", key);
            return caches.delete(key);
          }
        }));
      })
  );
  self.clients.claim();
});

toolbox.router.get('/assets/*', toolbox.cacheFirst, {
  cache: {
    name: swCaches.static,
    maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
  }
});
toolbox.router.get('/index.html', toolbox.cacheFirst, {
  cache: {
    name: swCaches.static,
    maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
  }
});

toolbox.router.get('/favicon.ico', toolbox.cacheFirst, {
  cache: {
    name: swCaches.static,
    maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
  }
});

toolbox.router.get('/*', function(request, values, options) {
  return toolbox.networkFirst(request, values, options)
  .catch(function(error){
    return caches.match(new Request('/assets/js/offline.json'));
  })
}, {
  networkTimeoutSeconds: 1,
  cache: {
    name: swCaches.dynamic,
    maxEntries: 500,
  }
});
/*
self.addEventListener('fetch', function (e) {
  if (navigator.onLine && e.request.method.toLowerCase() !== "get") {
    e.respondWith(
      fetch(e.request) // only get requests can be cached, so simply sending the request to network if it is not a get request
    )
  } else if (navigator.onLine && e.request.method.toLowerCase() === "get") {
    // it will create a problem if user is on Lie fi, need to set somet timeout here
    e.respondWith(
      fetchAndUpdate(e.request) //fetch from network and update in cache as well
    )
  } else {
    e.respondWith(
      caches.match(e.request.url)
        .then(function (response) {
          if (response)
            return response;
          // if (response) {
          //   // return response from cache and initiate a request to update the cached version for next use.
          //   updateCache(e.request);
          //   // return the cached version.
          //   return response;
          // }


          if (!navigator.onLine) {
            // console.log('no internet to perform the request at', e.request);
            return caches.match(new Request('/assets/js/offline.json'));
          }
          // else {
          //   return fetchAndUpdate(e.request);
          // }
        })
    );
  }
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
    }).catch(function (error) {
      caches.match(request)
        .then(function (response) {
          if (response) {
            return response;
          } else {
            return caches.match(new Request('/assets/js/offline.json'));
          }
        })
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
            .then(function (cache) {
              cache.put(request, res.clone());
            });
        } else {
          // Dynamic asset request, store in DataCache
          caches.open(cacheDataName)
            .then(function (cache) {
              cache.put(request, res.clone());
            })
        }
      });
    });
}
*/