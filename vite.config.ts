import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/edrian-s-developer-portfolio/", // GitHub Pages sub-path
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1400,
    rollupOptions: {
      output: {
        // three.js stays inside the lazily imported HeroScene chunk so it never blocks first paint.
        manualChunks: {
          gsap: ["gsap", "@gsap/react", "lenis"],
        },
      },
    },
  },
});
