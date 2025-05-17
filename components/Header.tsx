import FilterMenu from "./FilterMenu";

import FilterChips from "./FilterChips";
import SortMenu from "./SortMenu";
import Search from "./Search";
import { ArrowDownUp, SlidersHorizontal } from "lucide-react";

function Header() {
  return (
    <div className="w-[100%]">
      <div className="flex justify-between items-center w-[100%]">
        <ArrowDownUp size={30} className="hidden md:block mx-2" />
        <SortMenu />

        <div className="hidden w-[100%] searchbarDesktop mx-2">
          <Search />
        </div>

        <FilterMenu />
        <SlidersHorizontal size={30} className="hidden md:block mx-2" />
      </div>
      <FilterChips />
      <div className="flex items-center justify-between w-[100%] searchbarMobile mt-3">
        <Search />
      </div>
    </div>
  );
}

export default Header;
