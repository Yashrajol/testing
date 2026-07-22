const CACHE_VERSION = 'v1.0.0';
const STATIC_CACHE = `vedhkrit-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `vedhkrit-dynamic-${CACHE_VERSION}`;
const API_CACHE = `vedhkrit-api-${CACHE_VERSION}`;
const IMAGE_CACHE = `vedhkrit-images-${CACHE_VERSION}`;
const FONT_CACHE = `vedhkrit-fonts-${CACHE_VERSION}`;

const STATIC_ASSETS = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/assets/brand/veda-logo.png',
];

// Install Event - Pre-cache Static Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event - Clean Up Old Caches & Claim Clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith('vedhkrit-') && !name.endsWith(CACHE_VERSION))
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Route-Specific Cache Strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignore non-GET requests for standard caching (pass through to network/background sync)
  if (request.method !== 'GET') {
    return;
  }

  // 1. Navigation Requests -> Network First with /offline.html Fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          const clonedResponse = networkResponse.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, clonedResponse));
          return networkResponse;
        })
        .catch(async () => {
          const cachedResponse = await caches.match(request);
          if (cachedResponse) return cachedResponse;
          return caches.match('/offline.html');
        })
    );
    return;
  }

  // 2. NestJS API Endpoint Requests (/api/v1/*) -> StaleWhileRevalidate
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      caches.open(API_CACHE).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // 3. Fonts -> Cache First (Long Expiry)
  if (url.hostname.includes('fonts.gstatic.com') || request.destination === 'font') {
    event.respondWith(
      caches.open(FONT_CACHE).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        if (cachedResponse) return cachedResponse;
        try {
          const networkResponse = await fetch(request);
          cache.put(request, networkResponse.clone());
          return networkResponse;
        } catch {
          return null;
        }
      })
    );
    return;
  }

  // 4. Images -> Cache First
  if (request.destination === 'image' || url.pathname.match(/\.(png|jpg|jpeg|svg|webp|gif)$/i)) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        if (cachedResponse) return cachedResponse;
        try {
          const networkResponse = await fetch(request);
          if (networkResponse.status === 200) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        } catch {
          return cachedResponse;
        }
      })
    );
    return;
  }

  // 5. Static Scripts & Styles -> Stale While Revalidate
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request).then((networkResponse) => {
        if (networkResponse.status === 200) {
          caches.open(STATIC_CACHE).then((cache) => cache.put(request, networkResponse.clone()));
        }
        return networkResponse;
      }).catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});

// Push Notification Event Handler
self.addEventListener('push', (event) => {
  let data = { title: 'Vedhkrit Notification', body: 'You have a new update from your mentor.' };
  if (event.data) {
    try {
      data = event.data.json();
    } catch {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: '/assets/brand/veda-logo.png',
    badge: '/assets/brand/veda-logo.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/dashboard/student',
    },
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

// Notification Click Event Handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || '/dashboard/student';
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === targetUrl && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
