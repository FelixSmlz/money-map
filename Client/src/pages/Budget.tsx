import { getBudget, updateBudget, isLoggedIn } from "../utils/api";
import Background from "../components/Background";
import { ActionFunctionArgs, useNavigate } from "react-router";
import { useState } from "react";
import { useLoaderData, useFetcher, Link } from "react-router-dom";
import DataRow from "../components/DataRow";
import CategoryIcon from "../components/CategoryIcon";
import DeleteBtn from "../components/DeleteBtn";
import { deleteBudget } from "../utils/api";
import BudgetPeriodSelect from "../components/BudgetPeriodSelect";
import BudgetIndicator from "../components/budgets/BudgetIndicator";
import NotificationDropdown from "../components/NotificationMenu";

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
  const [budgetResponse, { user }] = await Promise.all([
    getBudget(params.id),
    isLoggedIn(),
  ]);

  return {
    budget: budgetResponse.budget,
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
  const { budget } = useLoaderData() as { budget: BudgetType; user: any };
  const [currentBudget, setCurrentBudget] = useState(budget);

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
    <div className="px-5 py-10 position-relative">
      <Background />
      <header className="flex justify-between items-center mb-8 text-bg_black">
        <div onClick={() => navigate(-1)}>
          <svg
            fill="none"
            stroke="black"
            strokeWidth="1"
            height="30"
            viewBox="0 0 24 24"
            width="30"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="m10.7071 12 4.6464-4.64645c.1953-.19526.1953-.51184 0-.7071s-.5118-.19529-.7071 0l-5.3536 5.35355c-.1953.19526-.1953.51184 0 .7071l5.3536 5.3536c.1953.1953.5118.1953.7071 0s.1953-.5118 0-.7071l-4.6464-4.6464h12.2929c.2828 0 .5-.2239.5-.5s-.2232-.5-.5-.5z"
              fillRule="evenodd"
            />
          </svg>
        </div>
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
          <CategoryIcon />
          <BudgetPeriodSelect
            initialPeriod={currentBudget.period}
            onChange={handlePeriodChange}
          />
          <DeleteBtn onDelete={handleDelete} />
        </div>
        <div className="flex flex-col gap-6 bg-white w-full p-4 rounded-[15px] shadow-sm">
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
          <DataRow label="category" value={budget.category_id} />
        </div>
      </div>
    </div>
  );
};

export default Budget;
