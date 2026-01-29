import tailwind from '@astrojs/tailwind';

export default {
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  output: 'static',
  site: 'https://stargazinghub.com',
  build: {
    format: 'directory',
  },
  vite: {
    optimizeDeps: {
      exclude: ['astro']
    }
  }
};
