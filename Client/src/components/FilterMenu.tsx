import { useState, useContext } from "react";
import { DataContext } from "../pages/History";

const FilterMenu = () => {
  const { dataType, filters, setFilters } = useContext(DataContext);
  const [isOpen, setIsOpen] = useState(false);

  const renderFilters = () => {
    switch (dataType) {
      case "transactions":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray">Date Range</label>
              <input
                type="date"
                className="mt-2 w-full p-3 rounded-[15px] border border-gray bg-transparent"
                value={filters.dateFrom || ""}
                onChange={(e) =>
                  setFilters({ ...filters, dateFrom: e.target.value })
                }
              />
              <input
                type="date"
                className="mt-2 w-full p-3 rounded-[15px] border border-gray bg-transparent"
                value={filters.dateTo || ""}
                onChange={(e) =>
                  setFilters({ ...filters, dateTo: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm text-gray">Amount Range</label>
              <div className="flex gap-2 mt-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full p-3 rounded-[15px] border border-gray bg-transparent"
                  value={filters.amountMin || ""}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      amountMin: Number(e.target.value),
                    })
                  }
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full p-3 rounded-[15px] border border-gray bg-transparent"
                  value={filters.amountMax || ""}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      amountMax: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray">Type</label>
              <select
                className="mt-2 w-full p-3 rounded-[15px] border border-gray bg-transparent"
                value={filters.type || ""}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    type: e.target.value as "income" | "expense",
                  })
                }
              >
                <option value="">All</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
          </div>
        );

      case "budgets":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray">Period</label>
              <select
                className="mt-2 w-full p-3 rounded-[15px] border border-gray bg-transparent"
                value={filters.period || ""}
                onChange={(e) =>
                  setFilters({ ...filters, period: e.target.value })
                }
              >
                <option value="">All</option>
                <option value="monthly">Monthly</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray">Limit Range</label>
              <div className="flex gap-2 mt-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full p-3 rounded-[15px] border border-gray bg-transparent"
                  value={filters.amountMin || ""}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      amountMin: Number(e.target.value),
                    })
                  }
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full p-3 rounded-[15px] border border-gray bg-transparent"
                  value={filters.amountMax || ""}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
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
              <label className="block text-sm text-gray">Target Range</label>
              <div className="flex gap-2 mt-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full p-3 rounded-[15px] border border-gray bg-transparent"
                  value={filters.amountMin || ""}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      amountMin: Number(e.target.value),
                    })
                  }
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full p-3 rounded-[15px] border border-gray bg-transparent"
                  value={filters.amountMax || ""}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      amountMax: Number(e.target.value),
                    })
                  }
                />
              </div>
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
            <div className="p-6 border-b border-gray/10">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium">Filter</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-2xl text-gray hover:text-bg_black"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              {renderFilters()}

              <div className="mt-8 flex gap-2">
                <button
                  onClick={() => {
                    setFilters({});
                    setIsOpen(false);
                  }}
                  className="w-1/2 p-3 text-center border border-gray rounded-[15px] hover:bg-gray/5"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-1/2 p-3 text-center bg-bg_black text-white rounded-[15px] hover:bg-opacity-90"
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
