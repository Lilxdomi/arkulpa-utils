import {describe, expect, it} from 'vitest';
import {parseDraft} from '../src/parseDraft';

const SECRET = 's3cret';

describe('parseDraft', () => {
  it('trusts an already validated boolean', async () => {
    await expect(parseDraft(true, SECRET)).resolves.toBe(true);
    await expect(parseDraft(false, SECRET)).resolves.toBe(false);
    await expect(parseDraft(true, undefined)).resolves.toBe(true);
  });

  it('validates a raw string against the secret', async () => {
    await expect(parseDraft(SECRET, SECRET)).resolves.toBe(true);
    await expect(parseDraft('wrong', SECRET)).resolves.toBe(false);
  });

  it('reads the draft param out of a searchParams promise', async () => {
    await expect(parseDraft(Promise.resolve({draft: SECRET}), SECRET)).resolves.toBe(true);
    await expect(parseDraft(Promise.resolve({draft: 'wrong'}), SECRET)).resolves.toBe(false);
    await expect(parseDraft(Promise.resolve({}), SECRET)).resolves.toBe(false);
  });

  it('returns false for null and undefined input', async () => {
    await expect(parseDraft(null, SECRET)).resolves.toBe(false);
    await expect(parseDraft(undefined, SECRET)).resolves.toBe(false);
  });

  it('never matches when the secret is empty or missing', async () => {
    await expect(parseDraft('', '')).resolves.toBe(false);
    await expect(parseDraft('anything', '')).resolves.toBe(false);
    await expect(parseDraft(undefined, undefined)).resolves.toBe(false);
    await expect(parseDraft(Promise.resolve({draft: ''}), '')).resolves.toBe(false);
  });
});
