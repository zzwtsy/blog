import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  site: "https://blog.yumdeb.top",
  vite: {
    build: {
      rollupOptions: {
        // 将 pagefind.js 标记为外部模块以确保成功构建
        external: ["/pagefind/pagefind.js"],
      },
    },
    ssr: {
      noExternal: ["react-use"],
    },
    optimizeDeps: {
      include: ["react-use"],
    },
  },
  integrations: [
    expressiveCode({
      themes: ["github-dark", "github-light"],
    }),
    mdx(),
    sitemap(),
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
});
