import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        outDir: 'public',
        emptyOutDir: true
    },
    server: {
        proxy: {
            // Proxy API requests to your Express server
            '/api': 'http://localhost:3000'
        }
    }
});
