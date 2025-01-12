import {defineConfig} from "vite";
import typescript from "@rollup/plugin-typescript";

export default defineConfig({
    root: "src",
    base: "./",
    server: {
        host: "127.0.0.1",
        port: 1923
    },
    build: {
        target: "ES2022",
        outDir: "../dist",
        emptyOutDir: true,
        rollupOptions: {
            input: "./src/index.html"
        }
    },
    worker: {
        format: "es"
    },
    plugins: [
        typescript({
            tsconfig: "./tsconfig.json"
        })
    ]
});
