// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel({}),
  integrations: [react()],
  compressHTML: true,

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
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