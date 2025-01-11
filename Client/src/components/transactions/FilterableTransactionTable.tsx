import { useState } from "react";
import SearchBar from "../SearchBar";
import TransactionTable from "./TransactionTable";
import { Transaction } from "./TransactionRow";

type Props = {
  transactions: Transaction[];
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
