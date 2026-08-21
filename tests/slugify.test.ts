import {describe, expect, it} from 'vitest';
import {slugify} from '../src/slugify';

describe('slugify', () => {
  it('lowercases and hyphenates', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('expands German umlauts and ß to ASCII', () => {
    expect(slugify('Grüße')).toBe('gruesse');
    expect(slugify('Öffnungszeiten')).toBe('oeffnungszeiten');
    expect(slugify('Ähnlich')).toBe('aehnlich');
  });

  it('strips remaining accents instead of expanding them', () => {
    expect(slugify('Café')).toBe('cafe');
    expect(slugify('naïve')).toBe('naive');
  });

  it('collapses runs of non-alphanumerics into a single hyphen', () => {
    expect(slugify('a  --  b')).toBe('a-b');
    expect(slugify('foo/bar?baz')).toBe('foo-bar-baz');
  });

  it('trims leading and trailing hyphens', () => {
    expect(slugify('  spaced  ')).toBe('spaced');
    expect(slugify('---x---')).toBe('x');
  });

  it('keeps digits', () => {
    expect(slugify('Top 10 Tipps')).toBe('top-10-tipps');
  });

  it('returns an empty string when nothing survives', () => {
    expect(slugify('')).toBe('');
    expect(slugify('!!!')).toBe('');
  });

  it('is idempotent', () => {
    const once = slugify('Grüße aus Vorarlberg — Café!');
    expect(slugify(once)).toBe(once);
  });
});
