import {describe, expect, it} from 'vitest';
import {publishedWhere} from '../../src/payload/publishedWhere';

describe('publishedWhere', () => {
  it('constrains to published documents outside draft mode', () => {
    expect(publishedWhere(false)).toEqual({_status: {equals: 'published'}});
  });

  it('returns an empty clause in draft mode so preview shows everything', () => {
    expect(publishedWhere(true)).toEqual({});
  });

  it('spreads into an existing where clause', () => {
    expect({slug: {equals: 'home'}, ...publishedWhere(false)}).toEqual({
      slug: {equals: 'home'},
      _status: {equals: 'published'},
    });
  });
});
