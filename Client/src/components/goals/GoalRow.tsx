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
      className="group flex items-center w-full bg-white hover:bg-bg_black rounded-[15px] p-4 gap-5"
    >
      <CategoryIcon className="bg-gray-100" category_id={category_id} />
      <div className="flex justify-between w-full items-center">
        <div className="flex flex-col gap-2">
          <h3 className="text-bg_black group-hover:text-white text-base">
            {name}
          </h3>
          <p className="text-light_gray group-hover:text-white text-xs">
            {start_date}
          </p>
        </div>
        <div className="flex flex-col gap-2 ">
          <GoalIndicator
            currentAmount={current_amount}
            targetAmount={target_amount}
          />
        </div>
      </div>
    </Link>
  );
};

export default GoalRow;
