import { defineConfig } from 'vite'
import mkcert from "vite-plugin-mkcert";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [mkcert(), react(), tailwindcss()],
    build: {
        outDir: "./dist",
        chunkSizeWarningLimit: 2500,
        rollupOptions: {
            external: [],
            output: {
                manualChunks: {
                    "react-vendor": ["react", "react-dom", "react/jsx-runtime"],
                },
            },
        },
    },
    server: {
        host: "0.0.0.0",
        port: 8022,
        open: true,
    },
    preview: {
        host: "0.0.0.0",
        port: 8022,
        open: true,
    },
});
