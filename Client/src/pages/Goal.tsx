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
    <div className="min-h-dvh bg-bg_gray/5 px-5 max-w-[1024px] mx-auto py-10 relative">
      <Background />
      <header className="flex justify-between items-center mb-12 text-bg_black">
        <BackArrow />
        <NotificationDropdown />
      </header>
      <div className="flex flex-col items-center gap-8 animate-fadeIn">
        <div className="bg-white/95 backdrop-blur-sm p-8 rounded-[25px] w-full max-w-[400px] shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5">
          <div className="flex justify-center items-center gap-10">
            <GoalIndicator
              targetAmount={goal.target_amount}
              currentAmount={goal.current_amount}
              size={90}
              strokeWidth={15}
            />
            <div className="flex flex-col items-center gap-2">
              <p className="text-my_gray text-sm uppercase tracking-wider">
                Goal Progress
              </p>
              <p className="text-4xl font-semibold text-bg_black">
                {goal.current_amount}€
                <span className="text-my_gray text-lg">
                  {" "}
                  / {goal.target_amount}€
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <CategoryIcon category_id={goal.category_id} />
          <DeleteBtn onDelete={handleDelete} />
        </div>
        <div className="flex flex-col w-full max-w-[500px] bg-white/95 backdrop-blur-sm p-8 rounded-[25px] shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[1.75rem] font-semibold text-bg_black">
              Details
            </h2>
            <button
              onClick={() => setIsUpdateModalOpen(true)}
              className="bg-bg_black hover:bg-white text-white hover:text-bg_black p-3 rounded-full shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-bg_black group"
            >
              <img
                src={editIcon}
                alt="edit"
                className="w-5 h-5 transition-all duration-300 group-hover:scale-110 group-hover:invert"
              />
            </button>
          </div>

          <div className="space-y-6">
            <DataRow label="name" value={goal.name} />
            <DataRow
              label="current amount"
              value={`${goal.current_amount ? goal.current_amount : "0"}€`}
            />
            <DataRow label="target amount" value={`${goal.target_amount}€`} />
            <DataRow
              label="start date"
              value={new Date(goal.start_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            />
            <DataRow label="category" value={category.name} />
          </div>
        </div>
      </div>
      <UpdateModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        type="goal"
        data={goal}
      />
    </div>
  );
};

export default Goal;
