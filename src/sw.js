importScripts('assets/plugins/sw-toolbox/sw-toolbox.js'); //eslint-disable-line
// importScripts('http://localhost:5005/assets/plugins/sw-toolbox/sw-toolbox.js');

const swCaches = {
  'static': 'olx-pakistan',
  'dynamic': 'data-olx-pakistan'
}

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

self.addEventListener('push', (evt) => {
  let data = evt.data.json();
  evt.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon,
      badge: data.badge,
    }
  ));
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();

  // we can grab the data from payload like
  // var title = e.notification.data.title;
  e.waitUntil(
    self.clients.openWindow(`${e.target.location.origin}/#/my-account/messages`)
  );
});

toolbox.router.get('/assets/*', toolbox.cacheFirst, { //eslint-disable-line no-undef
  cache: {
    name: swCaches.static,
    maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
  }
});

toolbox.router.get('/index.html', toolbox.cacheFirst, { //eslint-disable-line no-undef
  cache: {
    name: swCaches.static,
    maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
  }
});

toolbox.router.get('/favicon.ico', toolbox.cacheFirst, { //eslint-disable-line no-undef
  cache: {
    name: swCaches.static,
    maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
  }
});
/*
// ads/getAdById/cache/5b7770a63bb8160d5476d715
toolbox.router.get('/ads/getAdById/cache/5b7770a63bb8160d5476d715', function (request, values, options) {
  console.log('route hit');
  return fetch('ads/getAdById?adId=5b7770a63bb8160d5476d715')
  .then(function(resp) {
    return caches.open(swCaches.dynamic)
    .then(function(cache) {
      // store response in cache and thats it.
      return cache.put(request, resp);
    });
  })
}, {

});
*/
toolbox.router.get('/*', function (request, values, options) { //eslint-disable-line no-undef
  return toolbox.networkFirst(request, values, options) //eslint-disable-line no-undef
    .catch(function (error) { //eslint-disable-line no-unused-vars
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