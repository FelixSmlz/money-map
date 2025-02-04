import Background from "../components/Background";
import { getTransaction, isLoggedIn } from "../utils/api";
import { useLoaderData, useFetcher, useNavigate } from "react-router-dom";
import { useId, useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import TransactionTypeSwitch from "../components/TransactionTypeSwitch";
import CategoryIcon from "../components/CategoryIcon";
import { ActionFunctionArgs } from "react-router";
import {
  updateTransaction,
  deleteTransaction,
  getCategory,
} from "../utils/api";
import DataRow from "../components/DataRow";
import NotificationDropdown from "../components/NotificationMenu";
import { CategoryType } from "./Category";
import BackArrow from "../components/BackArrow";

export type TransactionType = {
  id: string;
  type: "income" | "expense";
  amount: number;
  name: string;
  date: string;
  category_id: string;
};

export const loader = async ({ params }: any) => {
  const transaction = await getTransaction(params.id);
  const [category, { user }] = await Promise.all([
    getCategory(transaction.category_id),
    isLoggedIn(),
  ]);

  return {
    transaction,
    category,
    user,
  };
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const response = await updateTransaction(params.id as string, formData);
  if (!response || !response.data) {
    return { error: "Failed to update transaction" };
  }
  return { transaction: response.data.transaction };
};

const Transaction = () => {
  const navigate = useNavigate();
  const fetcher = useFetcher<typeof action>();
  const { transaction, category } = useLoaderData() as {
    transaction: TransactionType;
    category: CategoryType;
    user: any;
  };
  const [currentTransaction, setCurrentTransaction] = useState(transaction);

  const handleTypeSwitch = (newType: "income" | "expense") => {
    const formData = new FormData();
    formData.append("type", newType);

    setCurrentTransaction((prev: any) => ({
      ...prev,
      type: newType,
    }));

    fetcher.submit(formData, {
      method: "PUT",
    });
  };

  const handleDelete = async () => {
    const response = await deleteTransaction(transaction.id);
    if (response.status === 200) {
      navigate("/history");
    }
  };

  return (
    <div className="px-5 py-10 position-relative">
      <Background />
      <header className="flex justify-between items-center mb-8 text-bg_black">
        <BackArrow />
        <NotificationDropdown />
      </header>
      <div className="flex flex-col items-center gap-6">
        {currentTransaction.type === "income" ? (
          <p className="text-bg_black text-xl text-center">
            {currentTransaction.amount}€
          </p>
        ) : (
          <p className="text-bg_black text-xl text-center">
            - {currentTransaction.amount}€
          </p>
        )}
        <div className="flex gap-3 items-center">
          <CategoryIcon category_id={currentTransaction.category_id} />
          <TransactionTypeSwitch
            onChange={handleTypeSwitch}
            initialType={currentTransaction.type}
          />
          <DeleteBtn onDelete={handleDelete} />
        </div>
        <div className="flex flex-col gap-6 bg-white w-full p-4 rounded-[15px] shadow-sm">
          <DataRow label="name" value={transaction.name} />
          <DataRow label="amount" value={transaction.amount} />
          <DataRow label="date" value={transaction.date} />
          <DataRow label="category" value={category.name} />
        </div>
      </div>
    </div>
  );
};

export default Transaction;
