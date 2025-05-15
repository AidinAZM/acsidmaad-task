"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function FilterChips() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChipDelete = (key) => {
    const params = new URLSearchParams(searchParams);
    params.delete(key);
    router.push(`${pathname}?${params.toString()}`);
  };
  const genreFilters = Array.from(searchParams.entries()).filter(
    (param) => param[0] === "genre"
  );
  return (
    <div>
      {genreFilters.map(([key, value]) => (
        <span key={key} className="p-1 bg-gray-400 rounded-full">
          Chip
        </span>
      ))}
    </div>
  );
}

export default FilterChips;
