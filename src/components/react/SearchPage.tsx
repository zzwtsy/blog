import { Search, SearchIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSearchPage, type SearchResult } from '@/hooks/useSearchPage';
import sanitiaeHtml from 'sanitize-html';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '@/styles/SearchPage.css';
import { Loading } from './Loading';

export function SearchPage() {
  const [open, setOpen] = useState(false);
  const { searchValue, setSearchValue, results, isSearching } = useSearchPage();
  const [displayedResults, setDisplayedResults] = useState<SearchResult>([]);

  useEffect(() => {
    setDisplayedResults(results);
  }, [results]);

  const memoResults = useMemo(() => {
    return (
      <TransitionGroup component="ul" className="w-full">
        {displayedResults
          .sort()
          .map(({ id, raw_url, meta: { title }, excerpt, nodeRef }) => (
            <CSSTransition
              key={id}
              timeout={300}
              nodeRef={nodeRef}
              classNames={{
                enter: 'fade-enter',
                enterActive: 'fade-enter-active',
                exit: 'fade-exit',
                exitActive: 'fade-exit-active',
              }}
            >
              <li
                ref={nodeRef}
                className="list-none py-1 px-2 mb-1 w-[calc(100%-2rem)] rounded-md mx-auto flex flex-col hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                <a
                  href={raw_url}
                  className="border-b hover:border-transparent pb-1"
                >
                  <h2 className="font-bold text-lg mb-2">{title}</h2>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: sanitiaeHtml(excerpt),
                    }}
                  ></p>
                </a>
              </li>
            </CSSTransition>
          ))}
      </TransitionGroup>
    );
  }, [displayedResults]);

  return (
    <>
      <Button aria-label="搜索网页" variant={'ghost'} onClick={() => setOpen(true)} size={'icon'}>
        <SearchIcon />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader className="border-b-2">
            <div className="flex items-center px-3">
              <Search className={'mr-2 h-4 w-4 shrink-0 opacity-50'} />
              <Input
                placeholder="Search..."
                value={searchValue}
                type="text"
                className="border-none outline-none"
                onChange={({ target }) => setSearchValue(target.value.trim())}
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
