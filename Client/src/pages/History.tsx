import Background from "../components/Background";
import Nav from "../components/Nav";
import AddMenu from "../components/AddMenu";
import {
  getTransactions,
  getBudgets,
  getGoals,
  getCategories,
} from "../utils/api";
import FilterableHistoryTable from "../components/FilterableHistoryTable";
import { useState, createContext } from "react";
import NotificationDropdown from "../components/NotificationMenu";
import DataTypeMenu from "../components/DataTypeMenu";
import { useQuery } from "@tanstack/react-query";
import Loading from "../pages/Loading";
import { FilterState } from "../components/FilterMenu";

export type DataType = "transactions" | "categories" | "budgets" | "goals";

// export const DataContext = createContext<any>({
//   data: [],
//   dataType: "transactions",
// });

export const DataContext = createContext<{
  data: any[];
  dataType: DataType;
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}>({
  data: [],
  dataType: "transactions",
  filters: {},
  setFilters: () => {},
});

function History() {
  const [dataType, setDataType] = useState<DataType>("transactions");
  const [filters, setFilters] = useState<FilterState>({});

  const { data, isLoading, error } = useQuery({
    queryKey: [dataType],
    queryFn: async () => {
      switch (dataType) {
        case "transactions":
          return await getTransactions();
        case "budgets":
          return await getBudgets();
        case "goals":
          return await getGoals();
        case "categories":
          return await getCategories();
        default:
          return [];
      }
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="px-5 py-10 position-relative">
      <Background />
      <header className="flex items-center justify-between">
        <div className="text-bg_black flex items-center gap-2 bg-transparent text-lg font-medium">
          <DataTypeMenu
            value={dataType}
            onChange={(value) => setDataType(value as DataType)}
          />
        </div>
        <div className="flex items-center gap-2">
          <NotificationDropdown />
        </div>
      </header>
      <DataContext.Provider value={{ data, dataType, filters, setFilters }}>
        <FilterableHistoryTable />
      </DataContext.Provider>
      <Nav />
      <AddMenu />
    </div>
  );
}

export default History;
