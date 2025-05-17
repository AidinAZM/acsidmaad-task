"use client";

import { Command, CommandInput } from "./ui/command";
import { useEffect, useState } from "react";
import Image from "next/image";

function Search() {
  const [searchValue, setSearchValue] = useState("");
  type MovieResult = {
    id: number;
    title: string;
    poster_path: string | null;
    // add other fields if needed
  };
  const [searchResults, setSearchResults] = useState<MovieResult[]>([]);

  const handleSearch = async (query) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.API_KEY}`,
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
          setSearchValue((event.target as HTMLInputElement).value);
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
