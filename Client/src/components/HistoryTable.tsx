import HistoryTableHeading from "./HistoryTableHeading";
import TransactionRow from "./transactions/TransactionRow";
import GoalRow from "./goals/GoalRow";
import BudgetRow from "./budgets/BudgetRow";
import { useContext } from "react";
import { TransactionContext, DataType } from "../pages/History";

type Props = {
  searchFilter: string;
};

const HistoryTable = ({ searchFilter }: Props): React.ReactElement => {
  const { data, dataType } = useContext(TransactionContext) as {
    data: any[];
    dataType: DataType;
  };

  const generateHistoryTable = () => {
    const jsx: React.ReactElement[] = [];

    const filteredData = data
      .filter((item) => {
        return item.name.toLowerCase().includes(searchFilter.toLowerCase());
      })
      .sort((a, b) => {
        const dateA = new Date(a.date || a.start_date).getTime();
        const dateB = new Date(b.date || b.start_date).getTime();
        return dateB - dateA;
      });

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
              key={item.id}
              id={item.id}
              name={item.name}
              amount={item.amount}
              type={item.type}
              date={item.date}
              categoryId={item.categoryId}
            />
          );
          break;
        case "budgets":
          jsx.push(
            <BudgetRow
              key={item.id}
              id={item.id}
              name={item.name}
              limit={item.limit}
              period={item.period}
              startDate={item.startDate}
              customPeriod={item.customPeriod}
              categoryId={item.categoryId}
            />
          );
          break;
        case "goals":
          jsx.push(
            <GoalRow
              key={item.id}
              name={item.name}
              targetAmount={item.targetAmount}
              startDate={item.startDate}
              endDate={item.endDate}
              categoryId={item.categoryId}
            />
          );
          break;
        // case "categories":
        //   jsx.push(
        //     <CategoryRow
        //       key={item.id}
        //       name={item.name}
        //       description={item.description}
        //     />
        //   );
        //   break;
        default:
          break;
      }
    });
    return jsx;
  };

  return <div className="flex flex-col gap-3">{generateHistoryTable()}</div>;
};

export default HistoryTable;
