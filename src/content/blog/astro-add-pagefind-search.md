---
title: 'Astro 添加 Pagefind 搜索'
pubDate: '2024-03-25'
description: ''
heroImage: ''
---

## 安装 Pagefind

```plaintext
pnpm add -D pagefind
```

## 添加 postbuild 脚本

```diff
"scripts": {
    "dev": "astro dev",
    "start": "astro dev",
-   "build": "astro check && astro build",
+   "build": "astro check && astro build && pnpm run postbuild",
+   "postbuild": "pagefind --site dist",
    "preview": "astro preview",
    "astro": "astro"
}
```
