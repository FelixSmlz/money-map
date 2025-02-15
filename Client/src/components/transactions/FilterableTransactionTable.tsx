import { useState } from "react";
import SearchBar from "../SearchBar";
import TransactionTable from "./TransactionTable";
import { TransactionType } from "../../pages/Transaction";

type Props = {
  transactions: TransactionType[];
};

const FilterableTransactionTable = ({ transactions }: Props) => {
  const [searchFilter, setSearchFilter] = useState("");
  return (
    <div className="pb-20">
      <SearchBar
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
      />
      <TransactionTable
        transactions={transactions}
        searchFilter={searchFilter}
      />
    </div>
  );
};

export default FilterableTransactionTable;
