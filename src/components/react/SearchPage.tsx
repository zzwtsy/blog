import { SearchIcon, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

type SearchResult = Array<SearchResultItem>;

interface SearchResultItem {
  url: string;
  meta: {
    title: string;
  };
  raw_url: string;
  excerpt: string;
}

export function SearchPage() {
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<SearchResult>([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setResults([]);
    if (!searchValue) return;
    async function search() {
      let pagefind;
      try {
        // @ts-ignore
        pagefind = await import("/pagefind/pagefind.js");
      } catch (error) {
        console.log("Failed to import pagefind.js");
      }
      pagefind.init();
      const search = await pagefind.search(searchValue);
      let dataList: SearchResult = [];
      for (const result of search.results) {
        const data = await result.data();
        if (!data || data.meta.title === "Daydreamer Blog") continue;
        dataList.push(data);
      }
      setResults(dataList);
    }
    search();
  }, [searchValue]);

  return (
    <>
      <Button variant={"ghost"} onClick={() => setOpen(true)} size={"icon"}>
        <SearchIcon />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center border-b px-3">
              <Search className={"mr-2 h-4 w-4 shrink-0 opacity-50"} />
              <Input
                value={searchValue}
                onChange={({ target }) => setSearchValue(target.value)}
                placeholder={"Search..."}
                type="text"
                className={
                  "border-none outline-none placeholder:text-muted-foreground"
                }
              />
            </div>
          </DialogHeader>
          <ScrollArea className="max-h-80 w-full">
            <div className="grid grid-cols-1 gap-2">
              {results.map((result) => (
                <div
                  className="border-b-2 py-2 px-1 hover:text-muted-foreground"
                  key={result.url}
                >
                  <a href={result.raw_url}>
                    <h2 className="text-lg font-bold mb-2">
                      {result.meta.title}
                    </h2>
                    <p dangerouslySetInnerHTML={{ __html: result.excerpt }}></p>
                  </a>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
