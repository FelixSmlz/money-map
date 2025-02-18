import { useState } from "react";
import { ActionFunctionArgs, useNavigate } from "react-router";
import { useFetcher, useLoaderData } from "react-router-dom";
import editIcon from "../assets/icons/edit.svg";
import BackArrow from "../components/BackArrow";
import Background from "../components/Background";
import BudgetPeriodSelect from "../components/BudgetPeriodSelect";
import BudgetIndicator from "../components/budgets/BudgetIndicator";
import CategoryIcon from "../components/CategoryIcon";
import DataRow from "../components/DataRow";
import DeleteBtn from "../components/DeleteBtn";
import NotificationDropdown from "../components/NotificationMenu";
import UpdateModal from "../components/UpdateModal";
import {
  deleteBudget,
  getBudget,
  getCategory,
  isLoggedIn,
  updateBudget,
} from "../utils/api";
import { CategoryType } from "./Category";

export type BudgetType = {
  id: string;
  period: "daily" | "weekly" | "monthly" | "custom";
  limit: number;
  current_amount: number;
  name: string;
  start_date: string;
  custom_period?: number | null;
  category_id: string;
};

export const loader = async ({ params }: any) => {
  const budget = await getBudget(params.id);
  const [category, { user }] = await Promise.all([
    getCategory(budget.category_id),
    isLoggedIn(),
  ]);

  return {
    budget,
    category,
    user,
  };
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const response = await updateBudget(params.id as string, formData);
  if (!response || !response.data) {
    return { error: "Failed to update budget" };
  }
  return { budget: response.data.budget };
};

const Budget = () => {
  const navigate = useNavigate();
  const fetcher = useFetcher<typeof action>();
  const { budget, category } = useLoaderData() as {
    budget: BudgetType;
    user: any;
    category: CategoryType;
  };
  const [currentBudget, setCurrentBudget] = useState(budget);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const handleDelete = async () => {
    const response = await deleteBudget(budget.id);
    if (response.status === 200) {
      navigate("/history");
    }
  };

  const handlePeriodChange = (newPeriod: BudgetType["period"]) => {
    const formData = new FormData();
    formData.append("period", newPeriod);

    setCurrentBudget((prev) => ({
      ...prev,
      period: newPeriod,
    }));

    fetcher.submit(formData, {
      method: "PUT",
    });
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
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <p className="text-my_gray text-sm uppercase tracking-wider">
                Budget Limit
              </p>
              <p className="text-4xl font-semibold text-bg_black">
                {budget.limit}€
              </p>
            </div>
            <BudgetIndicator
              withText={false}
              currentAmount={budget.current_amount}
              maxWidth="250px"
              strokeWidth={15}
              limit={budget.limit}
            />
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <CategoryIcon category_id={budget.category_id} />
          <BudgetPeriodSelect
            initialPeriod={currentBudget.period}
            onChange={handlePeriodChange}
          />
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
            <DataRow label="name" value={budget.name} />
            <DataRow
              label={
                budget.period === "custom" ? "limit" : `${budget.period} limit`
              }
              value={`${budget.limit}€`}
            />
            {budget.period === "custom" && (
              <DataRow
                label="custom period (days)"
                value={budget.custom_period ? budget.custom_period : "-"}
              />
            )}
            <DataRow
              label="start date"
              value={new Date(budget.start_date).toLocaleDateString("en-US", {
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
        type="budget"
        data={budget}
      />
    </div>
  );
};

export default Budget;
