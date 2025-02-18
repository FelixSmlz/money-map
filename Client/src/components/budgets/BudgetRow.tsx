import { Link } from "react-router-dom";
import { BudgetType } from "../../pages/Budget";
import CategoryIcon from "../CategoryIcon";
import BudgetIndicator from "./BudgetIndicator";

const BudgetRow = ({
  id,
  name,
  limit,
  period,
  current_amount,
  category_id,
}: BudgetType) => {
  return (
    <Link
      to={`/budgets/${id}`}
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
          tracking-wide capitalize transition-colors"
          >
            {period}
          </span>
        </div>

        <div className="flex flex-col items-end gap-2 min-w-[140px]">
          <BudgetIndicator
            currentAmount={current_amount}
            limit={limit}
            maxWidth="100px"
            textClassName="text-bg_black group-hover:text-white transition-colors"
            className="group-hover:opacity-90 transition-opacity"
          />
        </div>
      </div>
    </Link>
  );
};

export default BudgetRow;
