import { useState } from "react";
import { ActionFunctionArgs } from "react-router";
import { useFetcher, useLoaderData, useNavigate } from "react-router-dom";
import editIcon from "../assets/icons/edit.svg";
import BackArrow from "../components/BackArrow";
import Background from "../components/Background";
import CategoryIcon from "../components/CategoryIcon";
import DataRow from "../components/DataRow";
import DeleteBtn from "../components/DeleteBtn";
import NotificationDropdown from "../components/NotificationMenu";
import TransactionTypeSwitch from "../components/TransactionTypeSwitch";
import UpdateModal from "../components/UpdateModal";
import {
  deleteTransaction,
  getCategory,
  getTransaction,
  isLoggedIn,
  updateTransaction,
} from "../utils/api";
import { CategoryType } from "./Category";

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
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

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
    <div className="min-h-dvh bg-bg_gray/5 px-5 max-w-[1024px] mx-auto py-10 relative">
      <Background />
      <header className="flex justify-between items-center mb-12 text-bg_black">
        <BackArrow />
        <NotificationDropdown />
      </header>
      <div className="flex flex-col items-center gap-8 animate-fadeIn">
        <div className="bg-white/95 backdrop-blur-sm p-8 rounded-[25px] w-full max-w-[250px] shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5">
          <div className="flex flex-col items-center gap-2">
            <p className="text-my_gray text-sm uppercase tracking-wider">
              {currentTransaction.type === "income" ? "Income" : "Expense"}
            </p>
            <p
              className={`text-4xl font-semibold ${
                currentTransaction.type === "income"
                  ? "text-turkois"
                  : "text-red"
              }`}
            >
              {currentTransaction.type === "income" ? "+" : "-"}
              {currentTransaction.amount}€
            </p>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <CategoryIcon category_id={currentTransaction.category_id} />
          <TransactionTypeSwitch
            onChange={handleTypeSwitch}
            initialType={currentTransaction.type}
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
            <DataRow label="name" value={transaction.name} />
            <DataRow label="amount" value={`${transaction.amount}€`} />
            <DataRow
              label="date"
              value={new Date(transaction.date).toLocaleDateString("en-US", {
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
        type="transaction"
        data={currentTransaction}
      />
    </div>
  );
};

export default Transaction;
