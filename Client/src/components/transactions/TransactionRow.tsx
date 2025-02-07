import { Link } from "react-router-dom";
import { TransactionType } from "../../pages/Transaction";
import CategoryIcon from "../CategoryIcon";

const TransactionRow = ({
  id,
  name,
  amount,
  type,
  date,
  category_id,
}: TransactionType) => {
  return (
    <Link
      to={`/transactions/${id}`}
      className="group flex w-full items-center shadow-md bg-white hover:bg-bg_black rounded-[15px] p-4 gap-5"
    >
      <CategoryIcon className="bg-gray-100" category_id={category_id} />
      <div className="flex justify-between w-full items-center">
        <div className="flex flex-col gap-2">
          <p className="text-bg_black group-hover:text-white text-base">
            {name}
          </p>
          <p className="text-light_gray group-hover:text-white text-xs">
            {type === "income" ? "Income" : "Expense"}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          {type === "income" ? (
            <p className="text-bg_black group-hover:text-white text-right">
              {amount}€
            </p>
          ) : (
            <p className="text-red group-hover:text-white text-right">
              - {amount}€
            </p>
          )}
          <p className="text-light_gray group-hover:text-white text-xs text-right">
            {date}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default TransactionRow;
