import {defineConfig} from 'tsup';

export default defineConfig({
  // One entry per dependency group — keeps payload/next/react out of a consumer's
  // bundle unless they import that subpath. Mirrored in package.json "exports".
  entry: ['src/index.ts', 'src/payload/index.ts', 'src/react/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  treeshake: true,
  target: 'es2022',
  external: ['payload', 'react'],
});
