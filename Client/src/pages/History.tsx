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
import { useEffect } from "react";
import { driver } from "driver.js";

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

  useEffect(() => {
    const tutorialStep = localStorage.getItem(`tutorialStep_${user?.id}`);

    if (tutorialStep === "history") {
      const driverObj = driver({
        showProgress: true,
        animate: true,
        showButtons: ["close", "next", "previous"],
        allowClose: false,
        steps: [
          {
            element: ".type-menu",
            popover: {
              title: "View Different Items 📋",
              description:
                "Switch between transactions, budgets, goals, and categories to view your data.",
              popoverClass: "custom-class",
              side: "bottom",
            },
          },
          {
            element: ".table",
            popover: {
              title: "Filter Your Data 🔍",
              description:
                "Use filters to find specific items or analyze your spending patterns.",
              popoverClass: "custom-class",
              side: "left",
            },
          },
          {
            popover: {
              title: "Congratulations, you did it! 🎉",
              description:
                "I hope I could help you get started. Enjoy saving money with MoneyMap!",
              popoverClass: "custom-class",
              side: "top",
            },
          },
        ],
        onDestroyStarted: () => {
          localStorage.setItem(`hasSeenTutorial_${user?.id}`, "true");
          localStorage.removeItem(`tutorialStep_${user?.id}`);
          driverObj.destroy();
        },
        onDestroyed: () => {
          localStorage.setItem(`hasSeenTutorial_${user?.id}`, "true");
          localStorage.removeItem(`tutorialStep_${user?.id}`);
          window.location.href = "/dashboard";
        },
      });

      const timer = setTimeout(() => {
        driverObj.drive();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [user]);

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-dvh bg-bg_gray/5 px-5 max-w-[1024px] mx-auto py-10 relative">
      <Background />
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden lg:flex items-center justify-center w-10 h-10 
              bg-white/95 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg 
              transition-all duration-300 hover:scale-105 hover:bg-bg_black 
              group border border-transparent hover:border-turkois/10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-bg_black group-hover:text-white"
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

          <div className="type-menu">
            <DataTypeMenu value={dataType} onChange={handleDataTypeChange} />
          </div>
        </div>

        <NotificationDropdown />
      </header>
      <div className="table w-full">
        <DataContext.Provider value={{ data, dataType, filters, setFilters }}>
          <FilterableHistoryTable />
        </DataContext.Provider>
      </div>
      <div className="hidden lg:block">
        <DesktopNav
          onClose={() => setIsSidebarOpen(false)}
          isOpen={isSidebarOpen}
          user={user}
          userFirstName={userFirstName}
        />
      </div>
      <div className="lg:hidden">
        <Nav />
      </div>
      <AddMenu />
    </div>
  );
}

export default History;
