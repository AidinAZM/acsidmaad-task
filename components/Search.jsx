"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Calculator } from "lucide-react";
function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMWEyZDY1ODlmODI3ZWFkMDQ4ZTVjZjEzY2U0ZGY4YyIsIm5iZiI6MTc0NzA2ODU3OC42MzMsInN1YiI6IjY4MjIyNmEyYjkwYzI3ZDA5NWFkOTU3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qXvR-KWxbkhGoshDpsiWp5-AGrMzgDZV_qp_eI3XyXE",
          },
        }
      );
      const data = await res.json();
      setSearchResults(data.results);
      console.log("search Results", data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchValue.length > 0) {
      handleSearch(searchValue);
    } else {
      setSearchResults([]);
    }
  }, [searchValue]);

  return (
    <div className="w-[100%] flex justify-between items-center h-11 relative">
      <Command
        value={searchValue}
        className="rounded-md border"
        onChange={(event) => {
          setSearchValue(event.target.value);
        }}
      >
        <CommandInput
          placeholder="Search movies by title..."
          className="border-b-0 h-11"
        />
        <div
          className={`${
            searchValue != "" ? "block" : "hidden"
          } absolute top-12 border rounded-md w-full items-center p-2 bg-white z-10 max-h-[350px] overflow-y-auto`}
        >
          <div className="w-full">
            {searchResults.map((result) => (
              <div
                className="flex items-center my-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                key={result.id}
                onClick={() => console.log(result.id)}
              >
                <Image
                  src={`https://media.themoviedb.org/t/p/w500/${result.poster_path}`}
                  alt={result.title}
                  width={50}
                  height={50}
                  className="rounded-sm mr-2"
                />
                <span>{result.title}</span>
              </div>
            ))}
          </div>
        </div>
      </Command>

      {/* <Button
        variant="outline"
        className=" h-11 mx-2 bg-cyan-600 text-white"
        onClick={() => handleSearch(searchValue)}
      >
        Search
      </Button> */}
    </div>
  );
}

export default Search;
