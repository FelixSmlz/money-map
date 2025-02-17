import { useState } from "react";
import SearchBar from "./SearchBar";
import HistoryTable from "./HistoryTable";
import FilterMenu from "./FilterMenu";

const FilterableHistoryTable = () => {
  const [searchFilter, setSearchFilter] = useState("");
  return (
    <div className="pb-20 sm:mx-auto lg:max-w-[700px] sm:max-w-[500px]">
      <div className="flex items-center gap-4 mt-6 mb-3">
        <SearchBar
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
        />
        <FilterMenu />
      </div>
      <HistoryTable searchFilter={searchFilter} />
    </div>
  );
};

export default FilterableHistoryTable;
