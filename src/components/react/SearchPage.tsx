import { Search, SearchIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSearchPage } from "@/hooks/useSearchPage";
import sanitiaeHtml from "sanitize-html";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export function SearchPage() {
  const [open, setOpen] = useState(false);
  const { searchValue, setSearchValue, results } = useSearchPage();

  const resultsHtml = useMemo(() => {
    return results.map((result) => (
      <li
        key={result.raw_url}
        className="list-none py-1 px-2 mb-1 w-[calc(100%-2rem)] rounded-md mx-auto flex flex-col hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
      >
        <a
          href={result.raw_url}
          className="border-b hover:border-transparent pb-1"
        >
          <h2 className="font-bold text-lg mb-2">{result.meta.title}</h2>
          <p
            dangerouslySetInnerHTML={{
              __html: sanitiaeHtml(result.excerpt),
            }}
          ></p>
        </a>
      </li>
    ));
  }, [results]);

  return (
    <>
      <Button variant={"ghost"} onClick={() => setOpen(true)} size={"icon"}>
        <SearchIcon />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="animate-in">
          <DialogHeader className="border-b-2">
            <div className="flex items-center px-3">
              <Search className={"mr-2 h-4 w-4 shrink-0 opacity-50"} />
              <Input
                placeholder="Search..."
                value={searchValue}
                type="text"
                className="border-none outline-none"
                onChange={({ target }) => setSearchValue(target.value.trim())}
              />
            </div>
          </DialogHeader>
          <ScrollArea className="w-full max-h-80">
            <ul className="w-full">{resultsHtml}</ul>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
