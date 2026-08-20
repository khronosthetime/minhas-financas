const CACHE = 'financas-v7';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-180.png',
  './vendor/pdf.min.mjs', './vendor/pdf.worker.min.mjs'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())
  );
});

// Cache-first: the app is fully self-contained, so offline works after the first load.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
      return res;
    }).catch(() => caches.match('./index.html')))
  );
});

// Web Push: alerta de meta com o app fechado.
self.addEventListener('push', e => {
  let d = { title: 'Meta de gasto', body: '' };
  try { d = e.data.json(); } catch (_) { if (e.data) d.body = e.data.text(); }
  e.waitUntil(self.registration.showNotification(d.title || 'Meta de gasto', {
    body: d.body || '',
    icon: './icon-192.png',
    badge: './icon-192.png',
    tag: d.tag || 'meta',
    renotify: true
  }));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => {
    for (const c of cs) { if ('focus' in c) return c.focus(); }
    return clients.openWindow('./index.html');
  }));
});
