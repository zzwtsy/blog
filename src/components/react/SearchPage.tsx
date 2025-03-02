import { Search, SearchIcon } from "lucide-react";
import { useEffect, useMemo, useRef, useState, memo } from "react";
import { Button } from "@/components/ui/button";
import {
  useSearchPage,
  type SearchResult,
  type SearchResultItem,
} from "@/hooks/useSearchPage";
import sanitiaeHtml from "sanitize-html";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "@/styles/SearchPage.css";
import { Loading } from "./Loading";
import { useDebounce } from "react-use";

export function SearchPage() {
  const [open, setOpen] = useState(false);
  const { setSearchValue, results, isSearching } = useSearchPage();
  const [displayedResults, setDisplayedResults] = useState<SearchResult>([]);
  const [searchInput, setSearchInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useDebounce(
    () => {
      setSearchValue(searchInput.trim());
    },
    300,
    [searchInput]
  );

  useEffect(() => {
    setDisplayedResults(results);
  }, [results]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const SearchItem = memo(
    ({ id, raw_url, meta, excerpt, nodeRef }: SearchResultItem) => (
      <CSSTransition key={id} timeout={300} nodeRef={nodeRef} classNames="fade">
        <div className="border-b hover:border-transparent">
          <li
            ref={nodeRef}
            className="group list-none py-3 px-4 rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground focus-within:bg-accent focus-within:text-accent-foreground"
          >
            <a href={raw_url} onClick={() => setOpen(false)}>
              <h2 className="font-bold text-lg mb-2 group-hover:text-primary">
                {meta.title}
              </h2>
              <p
                className="text-sm text-muted-foreground line-clamp-2"
                dangerouslySetInnerHTML={{
                  __html: sanitiaeHtml(excerpt),
                }}
              />
            </a>
          </li>
        </div>
      </CSSTransition>
    )
  );

  const memoResults = useMemo(() => {
    return (
      <TransitionGroup component="ul" className="w-full">
        <div className="space-y-2">
          {displayedResults
            .sort()
            .map(({ id, raw_url, url, meta, excerpt, nodeRef }) => (
              <SearchItem
                key={id}
                id={id}
                raw_url={raw_url}
                meta={meta}
                excerpt={excerpt}
                nodeRef={nodeRef}
                url={url}
              />
            ))}
        </div>
      </TransitionGroup>
    );
  }, [displayedResults]);

  return (
    <>
      <Button
        aria-label="搜索网页"
        variant={"ghost"}
        onClick={() => setOpen(true)}
        size={"icon"}
      >
        <SearchIcon />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader className="border-b-2">
            <div className="flex items-center px-3">
              <Search className={"mr-2 h-4 w-4 shrink-0 opacity-50"} />
              <Input
                ref={inputRef}
                placeholder="搜索文章..."
                value={searchInput}
                type="text"
                className="border-none outline-none"
                onChange={({ target }) => setSearchInput(target.value)}
              />
            </div>
          </DialogHeader>
          <ScrollArea className="w-full h-80">
            {isSearching ? <Loading className="h-80" /> : memoResults}
          </ScrollArea>
          <DialogFooter className="w-full">
            <span className="text-center">
              {displayedResults.length} 个结果
            </span>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
