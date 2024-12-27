import { defineConfig } from 'vite';
import path from 'node:path';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    plugins: [],
    build: {
        minify: false,
        manifest: true,
        emptyOutDir: false,
        outDir: path.resolve(__dirname, 'dist'), // dist directory for the vite build
        rollupOptions: {
            input: path.resolve(__dirname, 'public/scripts/script.js'),
        },
        define: {
            'process.env.PORT': JSON.stringify(process.env.PORT),
            'process.env.CLIENT_ID': JSON.stringify(process.env.CLIENT_ID),
            'process.env.CLIENT_SECRET': JSON.stringify(process.env.CLIENT_SECRET),
            'process.env.REDIRECT_URI': JSON.stringify(process.env.REDIRECT_URI)
        },
    },
});
