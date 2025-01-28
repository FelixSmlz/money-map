import Background from "../components/Background";
import { getTransaction, isLoggedIn } from "../utils/api";
import { useLoaderData, useFetcher, useNavigate } from "react-router-dom";
import { useId, useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import TransactionTypeSwitch from "../components/TransactionTypeSwitch";
import CategoryIcon from "../components/CategoryIcon";
import { ActionFunctionArgs } from "react-router";
import { updateTransaction, deleteTransaction } from "../utils/api";
import DataRow from "../components/DataRow";
import NotificationDropdown from "../components/NotificationMenu";

export type TransactionType = {
  id: string;
  type: "income" | "expense";
  amount: number;
  name: string;
  date: string;
  category_id: string;
};

export const loader = async ({ params }: any) => {
  const [transactionResponse, { user }] = await Promise.all([
    getTransaction(params.id),
    isLoggedIn(),
  ]);

  return {
    transaction: transactionResponse.transaction,
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
  const { transaction } = useLoaderData() as {
    transaction: TransactionType;
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
        <div onClick={() => navigate(-1)}>
          <svg
            fill="none"
            stroke="black"
            strokeWidth="1"
            height="35"
            viewBox="0 0 24 24"
            width="35"
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
          <CategoryIcon />
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
          <DataRow label="category" value={transaction.category_id} />
        </div>
      </div>
    </div>
  );
};

export default Transaction;
