/**
 * Slugifies a (German) string for use in URLs: umlauts/ß expanded to ASCII, remaining
 * accents stripped, non-alphanumerics collapsed to single hyphens, and trimmed.
 *
 * @param value - The string to slugify.
 * @returns A lowercase `a-z0-9-` slug with no leading or trailing hyphen.
 *
 * @example
 * slugify('Grüße aus Vorarlberg — Café!'); // 'gruesse-aus-vorarlberg-cafe'
 */
export const slugify = (value: string): string => {
  const umlauts: Record<string, string> = {ä: 'ae', ö: 'oe', ü: 'ue', ß: 'ss'};
  return value
    .toLowerCase()
    .replace(/[äöüß]/g, (char) => umlauts[char] ?? char)
    .normalize('NFKD')
    .replace(/\p{M}/gu, '') // strip combining diacritical marks (é → e, etc.)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};
