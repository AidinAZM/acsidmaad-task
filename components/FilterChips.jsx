"use client";

import { X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function FilterChips() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [genreFilters, setGenreFilters] = useState(
    searchParams.get("genre")?.split(",") || []
  );

  useEffect(() => {
    setGenreFilters(searchParams.get("genre")?.split(","));
  }, [searchParams]);

  const genres = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  const handleChipDelete = (genre) => {
    const updatedFilters = genreFilters.filter((item) => item !== genre);
    setGenreFilters(updatedFilters);

    if (updatedFilters.length == 0) {
      params.delete("genre");
    } else {
      params.set("genre", updatedFilters.join(","));
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      {genreFilters?.length != 0 ? (
        <div className="flex flex-wrap gap-3 mt-3">
          {genreFilters?.map((genre) => (
            <div
              key={genre}
              className="flex items-center p-2 px-3 bg-gray-300 rounded-full"
            >
              <span className=" text-[12px]">{genres[Number(genre)]}</span>
              <X
                size={15}
                className="ml-1 hover:text-red-600 hover:cursor-pointer"
                onClick={() => handleChipDelete(genre)}
              />
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default FilterChips;
