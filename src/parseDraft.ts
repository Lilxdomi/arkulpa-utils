/** Anything that can carry the draft signal into a `draft: boolean` decision. */
export type DraftInput = Promise<{draft?: string}> | string | boolean | null | undefined;

/**
 * Normalises a draft signal to a boolean, validating any raw secret against `secret`.
 *
 * @param input - A page's `searchParams` promise, a raw `?draft=` string, or an
 * already validated boolean (passed down from a page that ran this).
 * @param secret - The expected draft secret. An empty or missing secret always
 * yields `false`, so `?draft=` can never match `''`.
 * @returns `true` when draft/preview mode should be enabled.
 *
 * @example
 * const draft = await parseDraft(searchParams, process.env.DRAFT_SECRET);
 */
export const parseDraft = async (input: DraftInput, secret: string | undefined): Promise<boolean> => {
  // Already validated upstream (e.g. the page's `draft` prop) — trust it.
  if (typeof input === 'boolean') return input;

  const draft = typeof input === 'string' ? input : (await input)?.draft;

  return Boolean(secret) && draft === secret;
};
