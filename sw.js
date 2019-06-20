// Define cache
var CacheName = 'mws-restaurant-Stage1';

// Random number generatiing for Cache ID Refrence: https://stackoverflow.com/questions/12728879/add-random-number-to-css-so-it-doesnt-cache
 var randomNumber = Math.floor(Math.random()*20000);
 var cid = randomNumber;
 CacheName += cid;

/*Reference: https://developers.google.com/web/fundamentals/codelabs/offline/*/
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CacheName).then(function(cache) {
    return cache.addAll([
      'index.html','/js/regesterServiceWorker.js','restaurant.html','/css/main.css','/css/styles1.css','/css/styles2.css','/css/responsive.css',
      '/js/main.js','/js/dbhelper.js','/js/restaurant_info.js','/img/*'
    ])
    .catch(error => { 
    });
  }));
});

/*Reference: https://developers.google.com/web/fundamentals/codelabs/offline/*/
self.addEventListener('fetch', 
function(event) {
  event.respondWith(    
    caches.match(event.request)
    .then(
      function(response) {
        if (response !== undefined) {
          return response;
        } 
        else {        
          return fetch(event.request).then(
              function (response) {
                let responseClone = response.clone();             
                caches.open(CacheName)
                .then(
                  function (cache) {
                    cache.put(event.request, responseClone);
                  });
                return response;
              });
        }
      })   
  ); 
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('mws-restaurant-') &&
                 cacheName != CacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});


