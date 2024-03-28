import { useEffect, useState, type RefObject, createRef } from "react";
import { useDebounce } from "./useDebounce";
import { SITE_TITLE } from "../consts";

type SearchResult = Array<SearchResultItem>;

interface SearchResultItem {
  id: string;
  url: string;
  meta: {
    title: string;
  };
  raw_url: string;
  excerpt: string;
  nodeRef: RefObject<HTMLLIElement>;
}

export function useSearchPage() {
  const [results, setResults] = useState<SearchResult>([]);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
    if (!debouncedSearchValue) {
      setResults([]);
      return;
    }
    async function search() {
      let pagefind;
      try {
        if (pagefind === void 0) {
          // @ts-ignore
          pagefind = await import("/pagefind/pagefind.js");
        }
      } catch (error) {
        console.log("Failed to import pagefind.js", error);
        return;
      }

      pagefind.init();

      const searchResults = await pagefind.search(debouncedSearchValue);
      if (!searchResults) return;

      const dataList: SearchResult = [];
      for (const result of searchResults.results) {
        const data = await result.data();
        if (!data || data.meta.title === SITE_TITLE) continue;
        dataList.push({
          ...data,
          id: result.id,
          nodeRef: createRef(),
        });
      }
      setResults(dataList);
    }
    search();
  }, [debouncedSearchValue]);

  return { results, searchValue, setSearchValue };
}
