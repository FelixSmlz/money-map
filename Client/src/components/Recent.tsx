import TransactionRow from "./transactions/TransactionRow";
import { TransactionType } from "../pages/Transaction";
import { getTransactions } from "../utils/api";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import noDataIcon from "../assets/icons/no-data.svg";

function Recent() {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await getTransactions();
      if (response) {
        const sortedTransactions = response
          .sort(
            (a: TransactionType, b: TransactionType) =>
              new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .slice(0, 5);
        setTransactions(sortedTransactions);
      }
      setIsLoading(false);
    };

    fetchTransactions();
  }, []);

  return (
    <div className=" flex flex-col justify-between items-center gap-7">
      <div className="flex justify-between w-full items-center">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-bg_black">
            Recent Transactions
          </h3>
        </div>
        <Link
          to="/history"
          className="flex items-center gap-1.5 text-sm font-medium text-bg_black hover:text-turkois transition-colors duration-200"
        >
          See All
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="transition-transform duration-200 transform group-hover:translate-x-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>

      <div className="flex flex-col gap-3 w-full">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-turkois"></div>
          </div>
        ) : transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-12">
            <img
              src={noDataIcon}
              alt="No Data"
              className="w-16 h-16 opacity-50"
            />
            <div className="text-center">
              <p className="text-my_gray font-medium">No recent transactions</p>
              <p className="text-my_gray/60 text-sm mt-1">
                Add your first transaction to see it here
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="transition-all duration-200 hover:translate-x-1"
              >
                <TransactionRow {...transaction} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Recent;
