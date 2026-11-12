const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

function worker(fetcher) {
  const listeners = {}, entries = new Map(), deleted = [], calls = [];
  const key = request => typeof request === 'string' ? request : new URL(request.url).pathname;
  const cache = { put: async (request, response) => entries.set(key(request), response.clone()) };
  const context = {
    URL, location: { origin: 'https://example.test' },
    self: { addEventListener: (name, callback) => { listeners[name] = callback; },
      clients: { claim: async () => {} }, skipWaiting: async () => {} },
    caches: { open: async () => cache, match: async request => entries.get(key(request))?.clone(),
      keys: async () => ['freetools-v1', 'freetools-v2', 'other-cache'],
      delete: async name => { deleted.push(name); return true; } },
    fetch: async (request, options) => { calls.push({ request, options }); return fetcher(request, options); },
  };
  vm.runInNewContext(readFileSync(join(__dirname, '../public/sw.js'), 'utf8'), context);
  return { entries, deleted, calls, listeners, async get(path, mode = 'cors') {
    let response;
    listeners.fetch({ request: { method: 'GET', url: 'https://example.test' + path, mode },
      respondWith: value => { response = value; } });
    return response;
  } };
}

test('mutable images, fonts, manifests and unversioned assets fetch fresh bytes', async () => {
  for (const path of ['/logo.png', '/fonts/body.woff2', '/site.webmanifest', '/assets/plain.js']) {
    const w = worker(async () => new Response('new'));
    w.entries.set(path, new Response('old'));
    assert.equal(await (await w.get(path)).text(), 'new');
    assert.equal(w.calls[0].options.cache, 'no-cache');
    assert.equal(await w.entries.get(path).text(), 'new');
  }
});

test('only hashed build assets use cache-first', async () => {
  const w = worker(async () => { throw Error('network should not run'); });
  w.entries.set('/assets/index-Abc_12-3.js', new Response('bundle'));
  assert.equal(await (await w.get('/assets/index-Abc_12-3.js')).text(), 'bundle');
  assert.equal(w.calls.length, 0);
});

test('offline files and navigation retain fallback', async () => {
  const w = worker(async () => { throw Error('offline'); });
  w.entries.set('/logo.png', new Response('offline image'));
  w.entries.set('/', new Response('offline page'));
  assert.equal(await (await w.get('/logo.png')).text(), 'offline image');
  assert.equal(await (await w.get('/new-route', 'navigate')).text(), 'offline page');
  await assert.rejects(w.get('/uncached.svg'), /offline/);
});

test('private, no-store and failed responses are never put in Cache Storage', async () => {
  for (const control of ['private, max-age=60', 'no-store']) {
    const w = worker(async () => new Response('fresh', { headers: { 'Cache-Control': control } }));
    assert.equal(await (await w.get('/logo.png')).text(), 'fresh');
    assert.equal(w.entries.size, 0);
  }
  const w = worker(async () => new Response('missing', { status: 404 }));
  w.entries.set('/logo.png', new Response('old'));
  assert.equal((await w.get('/logo.png')).status, 404);
  assert.equal(await w.entries.get('/logo.png').text(), 'old');
});

test('activation evicts the old worker cache and preserves unrelated caches', async () => {
  const w = worker(async () => new Response('fresh'));
  let completion;
  w.listeners.activate({ waitUntil: promise => { completion = promise; } });
  await completion;
  assert.deepEqual(w.deleted, ['freetools-v1']);
});

test('installation revalidates the offline page', async () => {
  const w = worker(async () => new Response('page'));
  let completion;
  w.listeners.install({ waitUntil: promise => { completion = promise; } });
  await completion;
  assert.equal(w.calls[0].options.cache, 'no-cache');
  assert.equal(await w.entries.get('/').text(), 'page');
});

test('non-GET and cross-origin requests stay outside the worker cache', () => {
  const w = worker(async () => new Response('unexpected'));
  for (const request of [
    { method: 'POST', url: 'https://example.test/action' },
    { method: 'GET', url: 'https://other.test/logo.png' },
  ]) w.listeners.fetch({ request, respondWith: () => assert.fail('request must pass through') });
});
