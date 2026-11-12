// Hashed Vite assets use cache-first. Mutable URLs revalidate before the
// offline fallback, so images, fonts and manifests can change after a deploy.
const CACHE = 'freetools-v2';
const HASHED_ASSET = /^\/assets\/[^/]+-[A-Za-z0-9_-]{8}\.[A-Za-z0-9]+$/;

async function remember(request, response) {
  if (response.ok && !/\b(?:no-store|private)\b/i.test(response.headers.get('Cache-Control') || '')) {
    // A full/quota-limited cache must not replace a fresh network response.
    await caches.open(CACHE).then(cache => cache.put(request, response.clone())).catch(() => {});
  }
  return response;
}

self.addEventListener('install', (e) => {
  e.waitUntil(
    fetch(new URL('/', location.origin).href, { cache: 'no-cache' })
      .then(response => remember('/', response))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('freetools-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const { request } = e;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== location.origin) return;

  e.respondWith((async () => {
    const immutable = HASHED_ASSET.test(url.pathname);
    if (immutable) {
      const hit = await caches.match(request);
      if (hit) return hit;
    }
    try {
      return await remember(request, await fetch(request, { cache: immutable ? 'default' : 'no-cache' }));
    } catch (error) {
      const hit = await caches.match(request);
      if (hit) return hit;
      if (request.mode === 'navigate') {
        const page = await caches.match('/');
        if (page) return page;
      }
      throw error;
    }
  })());
});
