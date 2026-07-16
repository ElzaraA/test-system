import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const dateHash = Date.now();

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    target: "esnext",
    minify: true,
    cssCodeSplit: false,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        chunkFileNames: `assets/[name]-${dateHash}.js`,
        entryFileNames: `assets/[name]-${dateHash}.js`,
        assetFileNames: `assets/[name]-${dateHash}[extname]`,
      },
    },
  },
});
