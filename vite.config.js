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
            'process.env.PORT': JSON.stringify(process.env.PORT)
        },
    },
});