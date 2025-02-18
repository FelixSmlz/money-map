import { useContext, useState } from "react";
import { DataContext, DataType } from "../pages/History";
import BudgetRow from "./budgets/BudgetRow";
import CategoryRow from "./categories/CategoryRow";
import { FilterState } from "./FilterMenu";
import GoalRow from "./goals/GoalRow";
import HistoryTableHeading from "./HistoryTableHeading";
import TransactionRow from "./transactions/TransactionRow";
import noDataIcon from "../assets/icons/no-data.svg";

type Props = {
  searchFilter: string;
};

const HistoryTable = ({ searchFilter }: Props): React.ReactElement => {
  const {
    data = [],
    dataType,
    filters,
  } = useContext(DataContext) as {
    data: any[];
    dataType: DataType;
    filters: FilterState;
  };

  const applyFilters = (items: any[]) => {
    return items.filter((item) => {
      if (!item.name.toLowerCase().includes(searchFilter.toLowerCase())) {
        return false;
      }

      if (filters.icon_name && item.icon_name !== filters.icon_name) {
        return false;
      }

      if (filters.dateFrom) {
        const itemDate = new Date(item.date || item.start_date);
        if (itemDate < new Date(filters.dateFrom)) return false;
      }
      if (filters.dateTo) {
        const itemDate = new Date(item.date || item.start_date);
        if (itemDate > new Date(filters.dateTo)) return false;
      }

      const amount = item.amount || item.target_amount || item.limit;
      if (filters.amountMin && amount < filters.amountMin) return false;
      if (filters.amountMax && amount > filters.amountMax) return false;

      if (filters.type && item.type !== filters.type) return false;

      if (filters.period && item.period !== filters.period) return false;

      return true;
    });
  };

  const generateHistoryTable = () => {
    const [errorSet, setErrorSet] = useState(false);

    if (!data || !Array.isArray(data) || data.length === 0) {
      if (!errorSet) setErrorSet(true);
      return (
        <div className="flex items-center justify-center mt-[50%] -translate-y-50% bg-white/75 w-fit mx-auto py-2 px-4 gap-2 rounded-[15px]">
          <img src={noDataIcon} alt="No Data yet" />
          <p className="text-center text-gray-400">No {dataType} yet</p>
        </div>
      );
    }

    const filteredData = applyFilters(data).sort((a, b) => {
      const dateA = new Date(a.date || a.start_date).getTime();
      const dateB = new Date(b.date || b.start_date).getTime();
      return dateB - dateA;
    });

    if (
      filteredData.length === 0 &&
      (searchFilter ||
        filters.dateFrom ||
        filters.dateTo ||
        filters.amountMin ||
        filters.amountMax ||
        filters.type ||
        filters.period ||
        filters.icon_name)
    ) {
      return (
        <div className="flex items-center justify-center mt-[50%] -translate-y-50% bg-white/75 w-fit mx-auto py-2 px-4 gap-2 rounded-[15px]">
          <img src={noDataIcon} alt="No Data yet" />
          <p className="text-center text-gray-400">
            No {dataType} match your filters
          </p>
        </div>
      );
    }

    if (dataType === "categories") {
      return (
        <div className="grid mt-4 lg:grid-cols-3 grid-cols-2 gap-2">
          {filteredData.map((category) => (
            <CategoryRow
              key={`category-${category.id}`}
              id={category.id}
              name={category.name}
              color_code={category.color_code}
              icon_name={category.icon_name}
            />
          ))}
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-4">
        {filteredData.map((item: any, index: number, orgData: any[]) => {
          const itemDate = item.date || item.start_date;
          const prevItemDate =
            orgData[index - 1]?.date || orgData[index - 1]?.start_date;

          if (index === 0 || itemDate !== prevItemDate) {
            return (
              <div key={`date-${itemDate}`} className="w-full">
                <HistoryTableHeading date={itemDate} />
                <div className="grid lg:grid-cols-2 gap-4 mt-4">
                  {filteredData
                    .filter((i: any) => (i.date || i.start_date) === itemDate)
                    .map((filteredItem: any) => {
                      switch (dataType) {
                        case "transactions":
                          return (
                            <TransactionRow
                              key={`transaction-${filteredItem.id}`}
                              id={filteredItem.id}
                              name={filteredItem.name}
                              amount={filteredItem.amount}
                              type={filteredItem.type}
                              date={filteredItem.date}
                              category_id={filteredItem.category_id}
                            />
                          );
                        case "budgets":
                          return (
                            <BudgetRow
                              key={`budget-${filteredItem.id}`}
                              id={filteredItem.id}
                              name={filteredItem.name}
                              limit={filteredItem.limit}
                              period={
                                filteredItem.custom_period
                                  ? filteredItem.custom_period
                                  : filteredItem.period
                              }
                              start_date={filteredItem.start_date}
                              current_amount={filteredItem.current_amount}
                              custom_period={filteredItem.custom_period}
                              category_id={filteredItem.category_id}
                            />
                          );
                        case "goals":
                          return (
                            <GoalRow
                              key={`goal-${filteredItem.id}`}
                              id={filteredItem.id}
                              name={filteredItem.name}
                              target_amount={filteredItem.target_amount}
                              current_amount={filteredItem.current_amount}
                              start_date={filteredItem.start_date}
                              category_id={filteredItem.category_id}
                            />
                          );
                      }
                    })}
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  };

  return <div className="flex flex-col gap-3">{generateHistoryTable()}</div>;
};

export default HistoryTable;
