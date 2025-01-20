import Background from "../components/Background";
import { getTransaction, getTransactions } from "../utils/api";
import { useLoaderData, useFetcher, useNavigate } from "react-router-dom";
import { useId, useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import TransactionTypeSwitch from "../components/TransactionTypeSwitch";
import CategoryIcon from "../components/CategoryIcon";
import { ActionFunctionArgs } from "react-router";
import { updateTransaction, deleteTransaction } from "../utils/api";
import DataRow from "../components/DataRow";

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
  return transaction;
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
  const { transaction } = useLoaderData() as { transaction: TransactionType };
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
        <a
          className="group bg-white hover:bg-bg_black p-2 rounded-full"
          href="/notifications"
        >
          <svg
            fill="none"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              className="group-hover:stroke-white"
              stroke="#1A1B1C"
              strokeMiterlimit="10"
              strokeWidth="1.75"
            >
              <path
                d="m12.02 2.91003c-3.31003 0-6.00003 2.69-6.00003 6v2.88997c0 .61-.26 1.54-.57 2.06l-1.15 1.91c-.71 1.18-.22 2.49 1.08 2.93 4.31 1.44 8.96003 1.44 13.27003 0 1.21-.4 1.74-1.83 1.08-2.93l-1.15-1.91c-.3-.52-.56-1.45-.56-2.06v-2.88997c0-3.3-2.7-6-6-6z"
                strokeLinecap="round"
              />
              <path
                d="m13.87 3.19994c-.31-.09-.63-.16-.96-.2-.96-.12-1.88-.05-2.74.2.29-.74 1.01-1.26 1.85-1.26s1.56.52 1.85 1.26z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="m15.02 19.0601c0 1.65-1.35 3-3 3-.82 0-1.58-.34-2.11998-.88-.54-.54-.88-1.3-.88-2.12" />
            </g>
          </svg>
        </a>
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
