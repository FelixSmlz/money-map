import { useState } from "react";
import SearchBar from "./SearchBar";
import HistoryTable from "./HistoryTable";
import { DataType } from "./HistoryTable";

type Props = {
  data: any[];
  dataType: DataType;
};

const FilterableHistoryTable = ({ data, dataType }: Props) => {
  const [searchFilter, setSearchFilter] = useState("");
  return (
    <div className="pb-20">
      <SearchBar
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
      />
      <HistoryTable
        dataType={dataType}
        data={data}
        searchFilter={searchFilter}
      />
    </div>
  );
};

export default FilterableHistoryTable;
