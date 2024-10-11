import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    globals: true,
    root: './',
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html']
    }
  },
  resolve: { alias: { '@': resolve(__dirname, './src') }},
  plugins: [
    swc.vite({ module: { type: 'es6' }})
  ]
})
