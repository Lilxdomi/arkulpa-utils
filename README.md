# arkulpa-utils

Commonly used utils by arkulpa.

```bash
yarn add arkulpa-utils
```

```ts
import {slugify} from 'arkulpa-utils';
import {publishedWhere} from 'arkulpa-utils/payload';
import {useDebounce} from 'arkulpa-utils/react';
```

Entry points are split by dependency, so importing from the root never pulls in Payload or React.

## `arkulpa-utils`

No dependencies.

- **`isBlockedRequest(pathname)`** — detects vulnerability-scanner paths (WordPress, PHP, traversal, Log4Shell) for a middleware 404.
- **`isDefined(value)`** — type guard dropping `null`/`undefined`; `0`, `''` and `false` pass. Use as `arr.filter(isDefined)`.
- **`parseDraft(input, secret)`** — validates a `?draft=` signal (string, `searchParams` promise, or boolean) against a secret.
- **`round(value, decimals)`** — `toFixed`-based rounding. Not for money: `round(1.005, 2)` is `1`.
- **`sleep(ms)`** — promise resolving after `ms`.
- **`slugify(value)`** — URL slug with German umlauts expanded (`Grüße` → `gruesse`).

## `arkulpa-utils/payload`

Needs `payload` (optional peer).

- **`publishedWhere(draft)`** — `where` clause restricting a query to published docs; `{}` in draft mode.

## `arkulpa-utils/react`

Needs `react` (optional peer).

- **`useDebounce(value, delay = 500)`** — copy of `value` that updates once it stops changing.

## Development

```bash
yarn test        # vitest
yarn typecheck
yarn build       # tsup → ESM + CJS + types
```

Requires Node >= 22.
