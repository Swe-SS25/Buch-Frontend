import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import fs from 'fs';
import path from 'path';

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    server: {
        https: {
            key: fs.readFileSync(path.resolve(__dirname, 'cert/key.pem')),
            cert: fs.readFileSync(path.resolve(__dirname, 'cert/cert.pem')),
        },
        proxy: {
            '/graphql': {
                target: 'https://localhost:3000',
                changeOrigin: true,
                secure: false,
                ws: true,
            },
        },
    },
});
