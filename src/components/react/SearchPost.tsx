import { SearchIcon, Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Input } from "../ui/input";

export function SearchPost() {
  const [open, setOpen] = useState(false);
  // useCallback(async () => {
  //   const pagefind = await import("../../../dist/pagefind/pagefind");
  //   const search = await pagefind.search("static");
  //   const resultList = await search.results.data();
  // }, [open]);

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
                placeholder={"Search..."}
                type="text"
                className={
                  "flex h-11 w-full rounded-md bg-transparent py-3 text-sm border-none outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                }
              />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
