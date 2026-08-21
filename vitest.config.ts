import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    // Node by default; the react entry opts into jsdom per file via a docblock.
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
});
