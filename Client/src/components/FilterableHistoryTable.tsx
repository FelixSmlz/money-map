import { useState } from "react";
import SearchBar from "./SearchBar";
import HistoryTable from "./HistoryTable";
import FilterMenu from "./FilterMenu";

const FilterableHistoryTable = () => {
  const [searchFilter, setSearchFilter] = useState("");
  return (
    <div className="pb-20 sm:mx-auto lg:max-w-[700px] sm:max-w-[500px] animate-fadeIn">
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1">
          <SearchBar
            searchFilter={searchFilter}
            setSearchFilter={setSearchFilter}
          />
        </div>
        <FilterMenu />
      </div>

      <div className="transition-all duration-300">
        <HistoryTable searchFilter={searchFilter} />
      </div>
    </div>
  );
};

export default FilterableHistoryTable;
