// LOTUS BLANC INTERNATIONAL - Service Worker
const CACHE_NAME = 'lbi-v1-' + Date.now();

self.addEventListener('install', function(event){
  self.skipWaiting();
});

self.addEventListener('activate', function(event){
  event.waitUntil(
    caches.keys().then(function(names){
      return Promise.all(names.map(function(name){
        return caches.delete(name);
      }));
    }).then(function(){
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function(event){
  event.respondWith(
    fetch(event.request, {cache: 'no-store'})
      .catch(function(){
        return caches.match(event.request);
      })
  );
});
