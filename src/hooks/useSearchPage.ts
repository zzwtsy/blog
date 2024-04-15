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
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
    setIsSearching(true);
    async function search() {
      if (!debouncedSearchValue) {
        setResults([]);
        setIsSearching(false);
        return;
      }

      let searchResults;
      try {
        // @ts-ignore
        const pagefind = await import("/pagefind/pagefind.js");
        pagefind.init();
        searchResults = await pagefind.search(debouncedSearchValue);
      } catch (error) {
        setIsSearching(false);
        console.log("Failed to import pagefind.js", error);
        return;
      }

      if (!searchResults) {
        setIsSearching(false);
        return;
      }

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

      try {
        setResults(dataList);
      } finally {
        setIsSearching(false);
      }
    }
    search();
  }, [debouncedSearchValue]);

  return { results, isSearching, searchValue, setSearchValue };
}
