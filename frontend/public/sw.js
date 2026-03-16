// --- FILE: public/sw.js ---
// TELAX Service Worker for PWA functionality

const CACHE_NAME = 'telax-v1';
const STATIC_CACHE = 'telax-static-v1';
const DYNAMIC_CACHE = 'telax-dynamic-v1';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  // Add other static assets as needed
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Static assets cached');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Failed to cache static assets', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Old caches cleaned');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip external requests (API calls, CDN, etc.)
  if (url.origin !== location.origin) {
    return;
  }
  
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          console.log('Service Worker: Serving from cache', request.url);
          return cachedResponse;
        }
        
        // Otherwise, fetch from network
        return fetch(request)
          .then((networkResponse) => {
            // Don't cache non-successful responses
            if (!networkResponse || networkResponse.status !== 200) {
              return networkResponse;
            }
            
            // Cache dynamic content
            return caches.open(DYNAMIC_CACHE)
              .then((cache) => {
                console.log('Service Worker: Caching dynamic content', request.url);
                cache.put(request, networkResponse.clone());
                return networkResponse;
              });
          })
          .catch((error) => {
            console.log('Service Worker: Network failed, trying offline fallback', error);
            
            // Try to serve from cache for dynamic content
            return caches.open(DYNAMIC_CACHE)
              .then((cache) => {
                return cache.match(request);
              })
              .then((cachedResponse) => {
                if (cachedResponse) {
                  console.log('Service Worker: Serving dynamic content from cache');
                  return cachedResponse;
                }
                
                // Return offline page for navigation requests
                if (request.mode === 'navigate') {
                  return caches.match('/offline.html') || new Response(
                    '<html><body><h1>Offline</h1><p>You are currently offline. Please check your internet connection.</p></body></html>',
                    { headers: { 'Content-Type': 'text/html' } }
                  );
                }
                
                // Return error for other requests
                return new Response('Offline', { status: 503 });
              });
          });
      })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync triggered', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

// Push notifications
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'New notification from TELAX',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-96x96.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore',
        icon: '/icons/icon-96x96.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/icon-96x96.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('TELAX', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification click received');
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/listings')
    );
  } else if (event.action === 'close') {
    // Just close the notification
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Background sync helper function
async function doBackgroundSync() {
  try {
    // Get all pending actions from IndexedDB
    const pendingActions = await getPendingActions();
    
    // Process each pending action
    for (const action of pendingActions) {
      try {
        await processAction(action);
        await removePendingAction(action.id);
      } catch (error) {
        console.error('Service Worker: Failed to process action', error);
      }
    }
    
    console.log('Service Worker: Background sync completed');
  } catch (error) {
    console.error('Service Worker: Background sync failed', error);
  }
}

// Helper functions for offline storage (would need to be implemented)
async function getPendingActions() {
  // This would interact with IndexedDB to get pending actions
  return [];
}

async function removePendingAction(actionId) {
  // This would remove a processed action from IndexedDB
}

async function processAction(action) {
  // This would process a pending action (e.g., retry API calls)
  console.log('Processing action:', action);
}

// Message handling for cache management
self.addEventListener('message', (event) => {
  const { type, payload } = event.data;
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
    case 'CACHE_UPDATE':
      updateCache(payload.url, payload.options);
      break;
    case 'CACHE_CLEAR':
      clearCache(payload.cacheName);
      break;
    default:
      console.log('Service Worker: Unknown message type', type);
  }
});

// Cache management helpers
async function updateCache(url, options = {}) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    await cache.add(url);
    console.log('Service Worker: Cache updated for', url);
  } catch (error) {
    console.error('Service Worker: Failed to update cache', error);
  }
}

async function clearCache(cacheName) {
  try {
    await caches.delete(cacheName);
    console.log('Service Worker: Cache cleared', cacheName);
  } catch (error) {
    console.error('Service Worker: Failed to clear cache', error);
  }
}
