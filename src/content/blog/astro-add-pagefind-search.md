---
title: "Astro 添加 Pagefind 搜索"
pubDate: "2024-03-25"
description: ""
heroImage: ""
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

## 封装 Pagefind Search Api hook

```ts
type SearchResult = Array<SearchResultItem>;

interface SearchResultItem {
  url: string;
  meta: {
    title: string;
  };
  raw_url: string;
  excerpt: string;
}

export function useSearchPage() {
  const [results, setResults] = useState<SearchResult>([]);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
    setResults([]);
    if (!debouncedSearchValue) return;
    async function search() {
      let pagefind;
      try {
        // @ts-ignore
        // 动态导入 pagefind.js
        pagefind = await import("/pagefind/pagefind.js");
      } catch (error) {
        console.log("Failed to import pagefind.js");
        return;
      }

      pagefind.init();

      const searchResults = await pagefind.search(debouncedSearchValue);
      if (!searchResults) return;

      let dataList: SearchResult = [];
      for (const result of searchResults.results) {
        const data = await result.data();
        // 过滤掉 title 是 Daydreamer Blog，感觉主页面没啥好搜索的
        if (!data || data.meta.title === "Daydreamer Blog") continue;
        dataList.push(data);
      }
      setResults(dataList);
    }
    search();
  }, [debouncedSearchValue]);

  return { results, searchValue, setSearchValue };
}
```

## 将 `/pagefind/pagefind.js` 标记为外部模块

这里搞了我好久 😭

```diff
export default defineConfig({
  site: "https://blog.yumdeb.top",
  server: {
    host: true,
  },
+ vite: {
+   build: {
+     rollupOptions: {
+       // 将 pagefind.js 标记为外部模块以确保成功构建
+       external: ["/pagefind/pagefind.js"],
+     },
+   },
+ },
  integrations: [
    mdx(),
    sitemap(),
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
});
```

还是因为这个报错我才解决掉编译不成功的问题 😭😭

```plaintext
Rollup failed to resolve import "/pagefind/pagefind.js" from "E:/web/blog/src/components/react/SearchPage.tsx".
This is most likely unintended because it can break your application at runtime.
If you do want to externalize this module explicitly add it to
```

## 添加搜索框

搜索框就比较好写了，就不记录了

## 用到的网站

- [Pagefind](https://pagefind.app/docs/api/)
- [Astro](https://docs.astro.build/zh-cn/reference/configuration-reference/#vite)
- [Vite](https://cn.vitejs.dev/config/build-options.html#build-rollupoptions)
