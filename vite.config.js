import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('opportunitiesDetailData')) {
            return 'data-opportunities';
          }
          if (id.includes('opportunityTranslations')) {
            return 'data-translations';
          }
          if (id.includes('universitiesData')) {
            return 'data-universities';
          }
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  }
});
