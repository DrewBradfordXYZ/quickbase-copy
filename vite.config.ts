import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    "process.env": process.env,
  },
  build: {
    target: "esnext",
    sourcemap: false,
    chunkSizeWarningLimit: 1024, // Code pages can not excede 1 MB
    rollupOptions: {
      output: {
        sourcemapExcludeSources: true, // exclude node_modules sources from sourcemap
      },
    },
  },
});
