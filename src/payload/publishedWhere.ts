import type {Where} from 'payload';

/**
 * Restricts a query to published documents when not in draft/preview mode.
 *
 * Payload's `draft` flag only selects which version's data is returned — it does
 * NOT filter out never-published (draft-only) docs. So to hide unpublished content
 * on the public site, this `_status: published` constraint must be added explicitly.
 *
 * @param draft - Whether draft/preview mode is active.
 * @returns A `Where` clause to spread into a query: `{_status: {equals: 'published'}}`
 * normally, or `{}` in draft mode so preview shows everything.
 *
 * @example
 * payload.find({collection: 'pages', where: {...publishedWhere(draft)}});
 */
export const publishedWhere = (draft: boolean): Where => (draft ? {} : {_status: {equals: 'published'}});
