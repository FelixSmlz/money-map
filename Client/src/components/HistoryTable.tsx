import HistoryTableHeading from "./HistoryTableHeading";
import TransactionRow from "./transactions/TransactionRow";
import GoalRow from "./goals/GoalRow";
import CategoryRow from "./categories/CategoryRow";
import BudgetRow from "./budgets/BudgetRow";
import { useContext } from "react";
import { DataContext, DataType } from "../pages/History";
import { FilterState } from "./FilterMenu";
import { useState } from "react";
import { set } from "react-hook-form";

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
    const jsx: React.ReactElement[] = [];
    const [errorSet, setErrorSet] = useState(false);

    if (!data || !Array.isArray(data) || data.length === 0) {
      if (!errorSet) setErrorSet(true);
      return (
        <div className="flex items-center justify-center h-96">
          <p className="text-center text-gray py-8">No {dataType} yet</p>
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
        <p className="text-center text-gray py-8">
          No {dataType} match your filters
        </p>
      );
    }

    if (dataType === "categories") {
      return (
        <div className="grid mt-4 grid-cols-2 gap-2">
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

    filteredData.map((item: any, index: number, orgData: any[]) => {
      const itemDate = item.date || item.start_date;
      const prevItemDate =
        orgData[index - 1]?.date || orgData[index - 1]?.start_date;

      if (index === 0 || itemDate !== prevItemDate) {
        jsx.push(<HistoryTableHeading key={index} date={itemDate} />);
      }

      switch (dataType) {
        case "transactions":
          jsx.push(
            <TransactionRow
              key={`transaction-${item.id}`}
              id={item.id}
              name={item.name}
              amount={item.amount}
              type={item.type}
              date={item.date}
              category_id={item.category_id}
            />
          );
          break;
        case "budgets":
          jsx.push(
            <BudgetRow
              key={`budget-${item.id}`}
              id={item.id}
              name={item.name}
              limit={item.limit}
              period={item.custom_period ? item.custom_period : item.period}
              start_date={item.start_date}
              current_amount={item.current_amount}
              custom_period={item.custom_period}
              category_id={item.category_id}
            />
          );
          break;
        case "goals":
          jsx.push(
            <GoalRow
              key={`goal-${item.id}`}
              id={item.id}
              name={item.name}
              target_amount={item.target_amount}
              current_amount={item.current_amount}
              start_date={item.start_date}
              category_id={item.category_id}
            />
          );
          break;
        default:
          break;
      }
    });
    return jsx;
  };

  return <div className="flex flex-col gap-3">{generateHistoryTable()}</div>;
};

export default HistoryTable;
