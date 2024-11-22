import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig(() => {
    const isProduction = process.env.NODE_ENV === 'production';

    return {
        plugins: [vue()],
        build: {
            rollupOptions: {
                input: {
                    'main': path.resolve(__dirname, './src/main.ts')
                }
            },
            emptyOutDir: true,
            outDir: path.resolve(__dirname, '../public/build'),
            assetsDir: '',
            manifest: true,
            minify: isProduction,
            sourcemap: !isProduction
        },
        server: {
            host: 'cook.local',
            proxy: {
                '/api': 'http://cook.local'
            }
        }
    };
});
