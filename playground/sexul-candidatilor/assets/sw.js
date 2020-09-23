
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.precaching.precacheAndRoute([
  '../data/liste-candidati.topo.json',
  { url: 'index.html', revision: '383670' },
]);


workbox.routing.registerRoute(
  new RegExp('.*\.js'),
  workbox.strategies.networkFirst()
);

workbox.routing.registerRoute(
  new RegExp('.*\.html'),
  workbox.strategies.networkFirst({
    cacheName: 'html-cache'
  })
);

workbox.routing.registerRoute(
  // Cache CSS files
  /.*\.json/,
  // Use cache but update in the background ASAP
  workbox.strategies.cacheFirst({
    // Use a custom cache name
    cacheName: 'json-cache',
    plugins: [
      new workbox.expiration.Plugin({
        // Cache for a maximum 2 weeks
        maxAgeSeconds: 14 * 24 * 60 * 60,
      })
    ],
  })
);

workbox.routing.registerRoute(
  // Cache image files
  /.*\.(?:png|jpg|jpeg|svg|gif)/,
  // Use the cache if it's available
  workbox.strategies.cacheFirst({
    // Use a custom cache name
    cacheName: 'image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        // Cache only 20 images
        maxEntries: 20,
        // Cache for a maximum of a week
        maxAgeSeconds: 7 * 24 * 60 * 60,
      })
    ],
  })
);