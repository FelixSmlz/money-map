import { Link } from "react-router-dom";
import GoalIndicator from "./GoalIndicator";
import { GoalType } from "../../pages/Goal";
import CategoryIcon from "../CategoryIcon";

const GoalRow = ({
  id,
  name,
  target_amount,
  current_amount,
  start_date,
  category_id,
}: GoalType) => {
  return (
    <Link
      to={`/goals/${id}`}
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
            {start_date}
          </span>
        </div>

        <div className="flex flex-col items-end gap-2 min-w-[140px]">
          <GoalIndicator
            currentAmount={current_amount}
            targetAmount={target_amount}
            className="group-hover:opacity-90 transition-opacity"
            textClassName="text-bg_black group-hover:text-white transition-colors"
          />
        </div>
      </div>
    </Link>
  );
};

export default GoalRow;
