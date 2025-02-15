import { useContext, useEffect, useState } from "react";
import crossIcon from "../assets/icons/cross.svg";
import { DataContext } from "../pages/History";
import Dropdown from "./Dropdown";
import IconSelect from "./IconSelect";
import Input from "./Input";

export type FilterState = {
  dateFrom?: string;
  dateTo?: string;
  amountMin?: number;
  amountMax?: number;
  type?: "income" | "expense";
  period?: "daily" | "weekly" | "monthly" | "custom";
  icon_name?: string;
};

const FilterMenu = () => {
  const { dataType, filters, setFilters } = useContext(DataContext);
  const [isOpen, setIsOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState(filters);

  useEffect(() => {
    setTempFilters(filters);
  }, [isOpen]);

  const handleApply = () => {
    setFilters(tempFilters);
    setIsOpen(false);
  };

  const handleReset = () => {
    setTempFilters({});
    setFilters({});
  };

  const renderFilters = () => {
    switch (dataType) {
      case "transactions":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray">Date Range</label>
              <input
                type="date"
                className="mt-2 w-full focus:outline-bg_black p-3 rounded-[15px] border border-my_gray bg-transparent"
                value={tempFilters.dateFrom || ""}
                onChange={(e) =>
                  setTempFilters({ ...tempFilters, dateFrom: e.target.value })
                }
              />
              <input
                type="date"
                className="mt-2 w-full p-3 focus:outline-bg_black rounded-[15px] border border-my_gray bg-transparent"
                value={tempFilters.dateTo || ""}
                onChange={(e) =>
                  setTempFilters({ ...tempFilters, dateTo: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-my_gray">Type</label>
              <Dropdown
                id="type"
                value={tempFilters.type || ""}
                onChange={(value) =>
                  setTempFilters({
                    ...tempFilters,
                    type: value as "income" | "expense",
                  })
                }
                options={[
                  { label: "All", value: "" },
                  { label: "Income", value: "income" },
                  { label: "Expense", value: "expense" },
                ]}
              />
            </div>
            <div>
              <label className="block text-sm text-my_gray">Amount Range</label>
              <div className="flex gap-3 mt-2">
                <Input
                  id="amountMin"
                  type="number"
                  placeholder="Min"
                  onChange={(e) =>
                    setTempFilters({
                      ...tempFilters,
                      amountMin: Number(e.target.value),
                    })
                  }
                />
                <Input
                  id="amountMax"
                  type="number"
                  placeholder="Max"
                  onChange={(e) =>
                    setTempFilters({
                      ...tempFilters,
                      amountMax: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          </div>
        );

      case "budgets":
        return (
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm text-my_gray">Period</label>
              <Dropdown
                id="period"
                value={tempFilters.period || ""}
                onChange={(value) =>
                  setTempFilters({
                    ...tempFilters,
                    period: value as
                      | "daily"
                      | "weekly"
                      | "monthly"
                      | "custom"
                      | undefined,
                  })
                }
                options={[
                  { label: "All", value: "" },
                  { label: "Daily", value: "daily" },
                  { label: "Weekly", value: "weekly" },
                  { label: "Monthly", value: "monthly" },
                  { label: "Custom", value: "custom" },
                ]}
              />
            </div>
            <div>
              <label className="block text-sm text-my_gray">Date Range</label>
              <input
                type="date"
                className="mt-2 w-full focus:outline-bg_black p-3 rounded-[15px] border border-my_gray bg-transparent"
                value={tempFilters.dateFrom || ""}
                onChange={(e) =>
                  setTempFilters({ ...tempFilters, dateFrom: e.target.value })
                }
              />
              <input
                type="date"
                className="mt-2 w-full p-3 focus:outline-bg_black rounded-[15px] border border-my_gray bg-transparent"
                value={tempFilters.dateTo || ""}
                onChange={(e) =>
                  setTempFilters({ ...tempFilters, dateTo: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm text-my_gray">Limit Range</label>
              <div className="flex gap-3 mt-2">
                <Input
                  id="amountMin"
                  type="number"
                  placeholder="Min"
                  onChange={(e) =>
                    setTempFilters({
                      ...tempFilters,
                      amountMin: Number(e.target.value),
                    })
                  }
                />
                <Input
                  id="amountMax"
                  type="number"
                  placeholder="Max"
                  onChange={(e) =>
                    setTempFilters({
                      ...tempFilters,
                      amountMax: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          </div>
        );

      case "goals":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-my_gray">Date Range</label>
              <input
                type="date"
                className="mt-2 w-full focus:outline-bg_black p-3 rounded-[15px] border border-my_gray bg-transparent"
                value={tempFilters.dateFrom || ""}
                onChange={(e) =>
                  setTempFilters({ ...tempFilters, dateFrom: e.target.value })
                }
              />
              <input
                type="date"
                className="mt-2 w-full p-3 focus:outline-bg_black rounded-[15px] border border-my_gray bg-transparent"
                value={tempFilters.dateTo || ""}
                onChange={(e) =>
                  setTempFilters({ ...tempFilters, dateTo: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm text-my_gray">Target Range</label>
              <div className="flex gap-3 mt-2">
                <Input
                  id="amountMin"
                  type="number"
                  placeholder="Min"
                  onChange={(e) =>
                    setTempFilters({
                      ...tempFilters,
                      amountMin: Number(e.target.value),
                    })
                  }
                />
                <Input
                  id="amountMax"
                  type="number"
                  placeholder="Max"
                  onChange={(e) =>
                    setTempFilters({
                      ...tempFilters,
                      amountMax: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          </div>
        );

      case "categories":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2 text-my_gray">
                Icon Type
              </label>
              <IconSelect
                id="icon_name"
                value={tempFilters.icon_name || ""}
                onChange={(value) =>
                  setTempFilters({ ...tempFilters, icon_name: value })
                }
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-white hover:bg-bg_black group p-2 rounded-full transition-colors"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="stroke-bg_black group-hover:stroke-white"
        >
          <path
            d="M9.53333 17.3333H14.4667M4.6 9.33333H19.4H4.6Z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl w-80 max-h-[90vh] overflow-y-auto">
            <div className="p-6 pb-0">
              <div className="flex justify-between items-center">
                <h2 className="text-lg text-bg_black font-medium">Filter</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1 group hover:bg-white"
                >
                  <img src={crossIcon} alt="Exit filters" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {renderFilters()}

              <div className="mt-8 flex gap-3">
                <button
                  onClick={handleReset}
                  className="w-1/2 p-3 text-center text-red border border-red rounded-[15px] hover:bg-red hover:text-white"
                >
                  Reset
                </button>
                <button
                  onClick={handleApply}
                  className="w-1/2 p-3 text-center bg-bg_black border border-bg_black text-white rounded-[15px] hover:text-bg_black hover:bg-white"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterMenu;
