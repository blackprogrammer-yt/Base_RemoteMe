import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react({ include: "**/*.{js,jsx,ts,tsx}" })],
    esbuild: {
        loader: "jsx",
        include: /src[\\/].*\.[jt]sx?$/,
        jsx: "automatic",
    },
    optimizeDeps: {
        esbuildOptions: {
            jsx: "automatic",
            loader: {
                ".js": "jsx",
            },
        },
    },
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
});
