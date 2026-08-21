# Changelog

All notable changes to this project are documented here. This project follows
[semantic versioning](https://semver.org/): breaking changes to any exported
signature or entry point require a major bump.

## 1.0.0 — 2026-08-21

Initial release.

### `arkulpa-utils`

- `isBlockedRequest(pathname)` — detects vulnerability-scanner paths
- `isDefined(value)` — type guard dropping `null`/`undefined`
- `parseDraft(input, secret)` — validates a `?draft=` signal against a secret
- `round(value, decimals)` — `toFixed`-based rounding
- `sleep(ms)` — promise resolving after a delay
- `slugify(value)` — URL slug with German umlauts expanded

### `arkulpa-utils/payload`

- `publishedWhere(draft)` — `where` clause restricting a query to published docs

### `arkulpa-utils/react`

- `useDebounce(value, delay)` — value that updates once it stops changing
