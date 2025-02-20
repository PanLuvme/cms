import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import glsl from 'vite-plugin-glsl';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [glsl(), vue(), vueJsx()],
    resolve: {
        alias: {
            '@bcms/selfhosted-ui': fileURLToPath(
                new URL('./src', import.meta.url),
            ),
            '@bcms/selfhosted-sdk': fileURLToPath(
                new URL('./src/sdk', import.meta.url),
            ),
            '@bcms/selfhosted-backend': fileURLToPath(
                new URL('../backend/types', import.meta.url),
            ),
            '@bcms/selfhosted-utils': fileURLToPath(
                new URL('../backend/src/_utils', import.meta.url),
            ),
        },
    },
    build: {
        rollupOptions: {
            external: new RegExp('../backend/_utils'),
        },
    },
});
