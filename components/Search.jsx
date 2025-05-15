"use client";

import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { Calculator, Calendar, Smile } from "lucide-react";
function Search() {
  return (
    <div className="w-[100%] flex justify-between items-center h-11">
      <Command className="rounded-md border">
        <CommandInput
          placeholder="Search movies by title..."
          className="border-b-0 h-11"
        />

        <CommandList className="hidden">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Calendar />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Smile />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem disabled>
              <Calculator />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </Command>
      <Button variant="outline" className=" h-11 mx-2 bg-cyan-600 text-white">
        Search
      </Button>
    </div>
  );
}

export default Search;
