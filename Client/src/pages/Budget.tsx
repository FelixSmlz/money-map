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
  const [budgetResponse, category, { user }] = await Promise.all([
    getBudget(params.id),
    getCategory(params.id),
    isLoggedIn(),
  ]);

  return {
    budget: budgetResponse.budget,
    category: category,
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
    <div className="px-5 max-w-[1024px] mx-auto py-10 position-relative">
      <Background />
      <header className="flex justify-between items-center mb-8 text-bg_black">
        <BackArrow />
        <NotificationDropdown />
      </header>
      <div className="flex flex-col items-center gap-6">
        <p className="text-bg_black text-xl text-center">{budget.limit}€</p>
        <BudgetIndicator
          withText={false}
          currentAmount={budget.current_amount}
          maxWidth="250px"
          strokeWidth={15}
          limit={budget.limit}
        />
        <div className="flex gap-3 items-center">
          <CategoryIcon category_id={budget.category_id} />
          <BudgetPeriodSelect
            initialPeriod={currentBudget.period}
            onChange={handlePeriodChange}
          />
          <DeleteBtn onDelete={handleDelete} />
        </div>
        <div className="flex flex-col gap-6 max-w-[500px] mx-auto bg-white w-full p-4 rounded-[15px] shadow-sm">
          <DataRow label="name" value={budget.name} />
          <DataRow
            label={
              budget.period === "custom" ? "limit" : `${budget.period} limit`
            }
            value={budget.limit}
          />
          {budget.period === "custom" && (
            <DataRow
              label="custom period (days)"
              value={budget.custom_period ? budget.custom_period : "-"}
            />
          )}
          <DataRow label="start date" value={budget.start_date} />
          <DataRow label="category" value={category.icon_name} />
        </div>
        <button
          onClick={() => setIsUpdateModalOpen(true)}
          className="bg-bg_black text-white p-4 shadow-md rounded-full"
        >
          <img src={editIcon} alt="edit" />
        </button>
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
