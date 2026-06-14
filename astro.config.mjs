// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";
import { fileURLToPath } from "url";

// https://astro.build/config
export default defineConfig({
  site: "https://guijosa.dev",
  adapter: vercel({ imageService: true }),
  integrations: [react(), sitemap()],
  compressHTML: true,
  prefetch: { prefetchAll: true, defaultStrategy: "viewport" },

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    optimizeDeps: {
      include: ["lucide-react"],
    },
    build: {
      minify: 'terser'
    }
  },
});