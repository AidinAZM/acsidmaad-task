"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function SortMenu() {
  const [sortMethod, setSortMethod] = useState("popularity.desc");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const params = new URLSearchParams(searchParams);

  useEffect(() => {
    params.set("sortMethod", sortMethod);
    router.push(`${pathname}?${params.toString()}`);
  }, [sortMethod]);
  return (
    <Select
      value={sortMethod}
      defaultValue="popularity.desc"
      onValueChange={(value) => setSortMethod(value)}
    >
      <SelectTrigger className="mr-2 sortSelect h-11">
        <SelectValue placeholder="Popularity Descending" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="popularity.desc">Popularity Descending</SelectItem>
          <SelectItem value="popularity.asc">Popularity Ascending</SelectItem>
          <SelectItem value="vote_average.desc">Rating Descending</SelectItem>
          <SelectItem value="vote_average.asc">Rating Ascending</SelectItem>
          <SelectItem value="primary_release_date.desc">
            Release Date Descending
          </SelectItem>
          <SelectItem value="primary_release_date.asc">
            Release Date Ascending
          </SelectItem>
          <SelectItem value="title.desc">Title (A-Z)</SelectItem>
          <SelectItem value="title.asc">Title (Z-A)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SortMenu;
