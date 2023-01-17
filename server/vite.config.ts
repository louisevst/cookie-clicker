/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';

export default defineConfig({
  server: {
    port: 5555,
  },
  plugins: [
    ...VitePluginNode({
      adapter: 'fastify',
      appPath: './src/server.ts',
      exportName: 'fastify',
      tsCompiler: 'esbuild',
    }),
  ],
});
