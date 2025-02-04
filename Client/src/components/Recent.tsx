import TransactionRow from "./transactions/TransactionRow";
import { TransactionType } from "../pages/Transaction";
import { getTransactions } from "../utils/api";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

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
    <div className="py-8 flex flex-col justify-between items-center gap-7">
      <div className="flex justify-between w-full">
        <h3 className="text-base font-semibold text-black">
          Recent Transaction
        </h3>
        <Link
          to="/history"
          className="flex font-semibold text-sm hover:text-gray text-black gap-0.5 justify-center items-center"
        >
          See All
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.71252 8.29995L6.42919 5.58328C6.75002 5.26245 6.75002 4.73745 6.42919 4.41662L3.71252 1.69995"
              stroke="#7E7E7E"
              strokeWidth="1"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
      <div className="flex flex-col gap-2 w-full">
        {isLoading ? (
          <p>Loading...</p>
        ) : transactions.length === 0 ? (
          <div className="flex items-center justify-center h-[140px]">
            <p className="text-center text-bg_black">No recent transactions</p>
          </div>
        ) : (
          transactions.map((transaction) => (
            <TransactionRow key={transaction.id} {...transaction} />
          ))
        )}
      </div>
    </div>
  );
}

export default Recent;
