# Browser cache policy

Owning issue: https://github.com/kortexa-ai/freeinvoices/issues/2.
Shared edge work: https://github.com/kortexa-ai/api.server/issues/139.

One server-level Cache-Control map applies to HTML, workers, and assets
without replacing security headers in child locations. Mutable files
revalidate. Only hashed Vite asset names receive a year-long lifetime;
errors for hashed assets are not stored. MIME mappings remain independent.

The worker replaces its old cache namespace, fetches mutable files with
revalidation before offline fallback, keeps cache-first for hashed assets,
and does not store private/no-store responses. Activation preserves
unrelated cache namespaces.

Validation covers worker behavior with Node tests, production builds,
nginx candidate validation, and live HTML/worker/asset/error headers.
