import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://blog.yumdeb.top",
  server: {
    host: true,
  },
  vite: {
    build: {
      rollupOptions: {
        // 将 pagefind.js 标记为外部模块以确保成功构建
        external: ["/pagefind/pagefind.js"],
      },
    },
  },
  integrations: [
    mdx(),
    sitemap(),
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
});
