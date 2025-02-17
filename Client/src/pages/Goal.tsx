import { useState } from "react";
import { ActionFunctionArgs, useLoaderData, useNavigate } from "react-router";
import editIcon from "../assets/icons/edit.svg";
import BackArrow from "../components/BackArrow";
import Background from "../components/Background";
import CategoryIcon from "../components/CategoryIcon";
import DataRow from "../components/DataRow";
import DeleteBtn from "../components/DeleteBtn";
import GoalIndicator from "../components/goals/GoalIndicator";
import NotificationDropdown from "../components/NotificationMenu";
import UpdateModal from "../components/UpdateModal";
import {
  deleteGoal,
  getCategory,
  getGoal,
  isLoggedIn,
  updateGoal,
} from "../utils/api";
import { CategoryType } from "./Category";

export type GoalType = {
  id: string;
  name: string;
  target_amount: number;
  current_amount: number;
  start_date: string;
  category_id: string;
};

export const loader = async ({ params }: any) => {
  const [goalResponse, category, { user }] = await Promise.all([
    getGoal(params.id),
    getCategory(params.id),
    isLoggedIn(),
  ]);

  return {
    goal: goalResponse.goal,
    category: category,
    user,
  };
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const response = await updateGoal(params.id as string, formData);
  if (!response || !response.data) {
    return { error: "Failed to update goal" };
  }
  return { goal: response.data.goal };
};

const Goal = () => {
  const navigate = useNavigate();
  const { goal, category } = useLoaderData() as {
    goal: GoalType;
    category: CategoryType;
  };
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const handleDelete = async () => {
    const response = await deleteGoal(goal.id);
    if (response.status === 200) {
      navigate("/history");
    }
  };

  return (
    <div className="px-5 max-w-[1024px] mx-auto py-10 position-relative">
      <Background />
      <header className="flex justify-between items-center mb-8 text-bg_black">
        <BackArrow />
        <NotificationDropdown />
      </header>
      <div className="flex flex-col mb-[4rem] items-center gap-6 relative">
        <GoalIndicator
          targetAmount={goal.target_amount}
          currentAmount={goal.current_amount}
          size={125}
          strokeWidth={15}
        />
        <div className="flex gap-3 items-center">
          <CategoryIcon category_id={goal.category_id} />
          <DeleteBtn onDelete={handleDelete} />
        </div>
        <div className="flex flex-col max-w-[500px] mx-auto gap-6 bg-white w-full p-4 rounded-[15px] shadow-sm">
          <DataRow label="name" value={goal.name} />
          <DataRow
            label="current amount"
            value={goal.current_amount ? goal.current_amount : "0"}
          />
          <DataRow label="target amount" value={goal.target_amount} />
          <DataRow label="start date" value={goal.start_date} />
          <DataRow label="category" value={category.icon_name} />
        </div>
        <UpdateModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          type="goal"
          data={goal}
        />
        <button
          onClick={() => setIsUpdateModalOpen(true)}
          className="bg-bg_black text-white p-4 shadow-md rounded-full"
        >
          <img src={editIcon} alt="edit" />
        </button>
      </div>
    </div>
  );
};

export default Goal;
