import TransactionRow from "./TransactionRow";
import { TransactionType } from "../../pages/Transaction";
import TransactionDate from "./TransactionDate";

type Props = {
  transactions: TransactionType[];
  searchFilter: string;
};

const TransactionTable = ({
  transactions,
  searchFilter,
}: Props): React.ReactElement => {
  const generateTransactionTable = () => {
    const jsx: React.ReactElement[] = [];

    const filteredTransactions = transactions.filter((transaction) => {
      return transaction.name
        .toLowerCase()
        .includes(searchFilter.toLowerCase());
    });

    filteredTransactions.map(
      (transaction: any, index: number, orgTransactions: any[]) => {
        if (
          index === 0 ||
          transaction.date !== orgTransactions[index - 1].date
        ) {
          jsx.push(<TransactionDate date={transaction.date} />);
        }

        jsx.push(
          <TransactionRow
            id={transaction.id}
            name={transaction.name}
            amount={transaction.amount}
            type={transaction.type}
            date={transaction.date}
            category_id={transaction.categoryId}
          />
        );
      }
    );
    return jsx;
  };

  return (
    <div className="flex flex-col gap-2">{generateTransactionTable()}</div>
  );
};

export default TransactionTable;
