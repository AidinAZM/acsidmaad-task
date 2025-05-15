import FilterMenu from "./FilterMenu";

import FilterChips from "./FilterChips";
import SortMenu from "./SortMenu";
import Search from "./Search";
import { Button } from "./ui/button";

function Header() {
  return (
    <div className="w-[100%]">
      <div className="flex justify-between items-center w-[100%]">
        <SortMenu />

        <div className="hidden w-[100%] searchbarDesktop">
          <Search />
        </div>

        <FilterMenu />
      </div>
      <FilterChips />
      <div className="flex items-center justify-between w-[100%] searchbarMobile mt-3">
        <Search />
      </div>
    </div>
  );
}

export default Header;
