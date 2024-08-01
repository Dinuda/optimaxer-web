import { defineConfig } from 'vitest/config'
 
export default defineConfig({
  test: {
    testTimeout: 0,
    server: {
      deps: {
        inline: ['@optimaxer/web-core'],
      },
    },
    browser: {
      provider: 'webdriverio', // or 'webdriverio'
      enabled: true,
      name: 'edge', // browser name is required
    }
  },
});
 