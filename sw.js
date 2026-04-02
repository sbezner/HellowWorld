// AT Hiker Guide — Service Worker
// Caches all HTML pages and Leaflet assets for offline use.
// Map tiles (OpenStreetMap) are cached opportunistically as viewed.

const CACHE_NAME = 'at-hiker-v1';

const CORE_ASSETS = [
  './',
  'index.html',
  'at-map.html',
  'at-georgia-map.html',
  'distance-calculator.html',
  'resupply-planner.html',
  'shelters.html',
  'noc-nantahala.html',
  'neel-gap-guide.html',
  'hiawassee-shuttle.html',
  'low-gap-resupply.html',
  'hostel-vs-hotel.html',
  'sumner-parts.html',
  // Shelter pages — Georgia
  'shelter-springer-mountain.html',
  'shelter-stover-creek.html',
  'shelter-hawk-mountain.html',
  'shelter-gooch-mountain.html',
  'shelter-blood-mountain.html',
  'shelter-whitley-gap.html',
  'shelter-blue-mountain.html',
  'shelter-tray-mountain.html',
  'shelter-deep-gap.html',
  'shelter-plumorchard-gap.html',
  // Shelter pages — North Carolina
  'shelter-muskrat-creek.html',
  'shelter-standing-indian.html',
  'shelter-carter-gap.html',
  'shelter-big-spring.html',
  'shelter-rock-gap.html',
  'shelter-siler-bald.html',
  'shelter-cold-spring.html',
  'shelter-wayah-bald.html',
  'shelter-wesser-bald.html',
  'shelter-rufus-morgan.html',
  'shelter-sassafras-gap-nc.html',
  'shelter-brown-fork-gap.html',
  'shelter-cable-gap.html',
  'shelter-fontana-dam.html',
  // Shelter pages — GSMNP
  'shelter-birch-spring-gap.html',
  'shelter-russell-field.html',
  'shelter-mollies-ridge.html',
  'shelter-spence-field.html',
  'shelter-derrick-knob.html',
  'shelter-silers-bald.html',
  'shelter-double-spring-gap.html',
  'shelter-mount-collins.html',
  'shelter-icewater-spring.html',
  'shelter-pecks-corner.html',
  'shelter-tricorner-knob.html',
  'shelter-cosby-knob.html',
  'shelter-davenport-gap.html',
  // Leaflet CDN assets
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
];

// Install — cache all core assets
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CORE_ASSETS);
    }).then(function() {
      return self.skipWaiting();
    })
  );
});

// Activate — clean up old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE_NAME; })
            .map(function(k) { return caches.delete(k); })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

// Fetch — network first for HTML (to get fresh weather), cache fallback.
// Map tiles: cache first (they rarely change), network fallback.
// Everything else: network first, cache fallback.
self.addEventListener('fetch', function(event) {
  var url = new URL(event.request.url);

  // Map tiles — cache first, then network (and cache the result)
  if (url.hostname.includes('tile.openstreetmap.org')) {
    event.respondWith(
      caches.match(event.request).then(function(cached) {
        if (cached) return cached;
        return fetch(event.request).then(function(response) {
          if (response.ok) {
            var clone = response.clone();
            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(event.request, clone);
            });
          }
          return response;
        }).catch(function() {
          // Offline and no cached tile — return nothing
          return new Response('', { status: 408, statusText: 'Offline' });
        });
      })
    );
    return;
  }

  // HTML pages and other assets — network first, cache fallback
  event.respondWith(
    fetch(event.request).then(function(response) {
      if (response.ok && event.request.method === 'GET') {
        var clone = response.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, clone);
        });
      }
      return response;
    }).catch(function() {
      return caches.match(event.request).then(function(cached) {
        return cached || new Response('Offline — page not cached', {
          status: 503,
          headers: { 'Content-Type': 'text/plain' }
        });
      });
    })
  );
});
