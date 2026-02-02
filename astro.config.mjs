import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default {
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
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
