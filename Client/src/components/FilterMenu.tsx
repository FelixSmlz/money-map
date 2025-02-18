import { useContext, useEffect, useState } from "react";
import crossIcon from "../assets/icons/cross.svg";
import { DataContext } from "../pages/History";
import Dropdown from "./Dropdown";
import IconSelect from "./IconSelect";
import Input from "./Input";
import { createPortal } from "react-dom";

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
        className="bg-white/95 backdrop-blur-sm hover:bg-bg_black group w-11 h-11
        rounded-full shadow-md hover:shadow-lg transition-all duration-300 
        hover:scale-105 border border-transparent hover:border-turkois/10
        flex items-center justify-center"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          className="stroke-bg_black group-hover:stroke-white transition-all duration-300 
          "
        >
          <path
            d="M9.53333 17.3333H14.4667M4.6 9.33333H19.4H4.6Z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 bg-bg_black/40 backdrop-blur-[2px]  flex items-center 
          justify-center z-50 px-5"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="bg-white backdrop-blur-sm  rounded-[25px] shadow-xl 
            w-[90%] max-w-[500px] max-h-[90vh] overflow-y-auto animate-scaleIn"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 lg:p-10 lg:pb-5 pb-5 border-gray-100">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <h2 className="text-[1.75rem] font-semibold text-bg_black">
                      Filters
                    </h2>
                    {Object.keys(tempFilters).length > 0 && (
                      <span
                        className="bg-turkois/10 text-turkois text-xs font-medium 
                    px-2.5 py-1 rounded-full"
                      >
                        {Object.keys(tempFilters).length} active
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="group p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <img
                      src={crossIcon}
                      alt="Close"
                      className="w-5 h-5 transition-transform group-hover:rotate-90"
                    />
                  </button>
                </div>
              </div>

              <div className="p-8 lg:p-10 lg:pt-5">
                <div className="space-y-6">{renderFilters()}</div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={handleReset}
                    className="w-1/2 py-3.5 px-6 text-red border-2 border-red rounded-[15px] 
                  font-medium hover:bg-red hover:text-white transition-all duration-300 
                  transform hover:scale-[1.02] shadow-sm hover:shadow-md"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleApply}
                    className="w-1/2 py-3.5 px-6 bg-bg_black border-2 border-bg_black 
                  text-white rounded-[15px] font-medium hover:bg-white 
                  hover:text-bg_black transition-all duration-300 transform 
                  hover:scale-[1.02] shadow-sm hover:shadow-md"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default FilterMenu;
