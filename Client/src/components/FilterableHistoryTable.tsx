import { useState } from "react";
import SearchBar from "./SearchBar";
import HistoryTable from "./HistoryTable";

const FilterableHistoryTable = () => {
  const [searchFilter, setSearchFilter] = useState("");
  return (
    <div className="pb-20">
      <SearchBar
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
      />
      <HistoryTable searchFilter={searchFilter} />
    </div>
  );
};

export default FilterableHistoryTable;
