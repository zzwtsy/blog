import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";

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
        if (!data || data.meta.title === "Daydreamer Blog") continue;
        dataList.push(data);
      }
      setResults(dataList);
    }
    search();
  }, [debouncedSearchValue]);

  return { results, searchValue, setSearchValue };
}
