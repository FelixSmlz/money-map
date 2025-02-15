import { useQuery } from "@tanstack/react-query";
import { createContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import AddMenu from "../components/AddMenu";
import Background from "../components/Background";
import DataTypeMenu from "../components/DataTypeMenu";
import DesktopNav from "../components/DesktopNav";
import FilterableHistoryTable from "../components/FilterableHistoryTable";
import { FilterState } from "../components/FilterMenu";
import Nav from "../components/Nav";
import NotificationDropdown from "../components/NotificationMenu";
import Loading from "../pages/Loading";
import {
  getBudgets,
  getCategories,
  getGoals,
  getTransactions,
} from "../utils/api";
import { loader } from "./Dashboard";

export type DataType = "transactions" | "categories" | "budgets" | "goals";

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
  const [dataType, setDataType] = useState<DataType>(() => {
    const stored = localStorage.getItem("selectedDataType");
    return (stored as DataType) || "transactions";
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const loaderData = useLoaderData<typeof loader>();
  const user = loaderData?.user;
  const userFirstName = user?.name.split(" ")[0];

  const handleDataTypeChange = (value: DataType) => {
    setDataType(value);
    setFilters({});
    localStorage.setItem("selectedDataType", value);
  };
  const [filters, setFilters] = useState<FilterState>({});

  const { data, isLoading } = useQuery({
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
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden lg:block mr-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <DataTypeMenu value={dataType} onChange={handleDataTypeChange} />
        </div>
        <div className="flex items-center gap-2">
          <NotificationDropdown />
        </div>
      </header>
      <DataContext.Provider value={{ data, dataType, filters, setFilters }}>
        <FilterableHistoryTable />
      </DataContext.Provider>
      <div className="hidden lg:block">
        <DesktopNav
          onClose={() => setIsSidebarOpen(false)}
          isOpen={isSidebarOpen}
          user={user}
          userFirstName={userFirstName}
        />
      </div>
      {/* Navigation - Show only on mobile */}
      <div className="lg:hidden">
        <Nav />
        <AddMenu />
      </div>
    </div>
  );
}

export default History;
