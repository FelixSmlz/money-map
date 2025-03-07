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
      className="group flex w-full items-center bg-white/95 backdrop-blur-sm 
      hover:bg-bg_black rounded-[15px] p-5 gap-4 shadow-sm hover:shadow-lg 
      transition-all duration-300 hover:scale-[1.01] border border-transparent 
      hover:border-turkois/10"
    >
      <CategoryIcon
        category_id={category_id}
        className="transition-transform group-hover:scale-110"
      />

      <div className="flex justify-between w-full items-center">
        <div className="flex flex-col gap-1.5">
          <p
            className="text-bg_black group-hover:text-white text-base font-medium 
          transition-colors"
          >
            {name}
          </p>
          <span
            className="text-my_gray group-hover:text-white/70 text-xs 
          tracking-wide transition-colors"
          >
            {type === "income" ? "Income" : "Expense"}
          </span>
        </div>

        <div className="flex flex-col items-end gap-1.5">
          <p
            className={`${
              type === "income"
                ? "text-turkois group-hover:text-white"
                : "text-red group-hover:text-white"
            } text-right font-medium transition-colors`}
          >
            {type === "income" ? "+" : "-"}
            {amount}€
          </p>
          <span
            className="text-my_gray group-hover:text-white/70 text-xs 
          tracking-wide transition-colors"
          >
            {date}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default TransactionRow;
