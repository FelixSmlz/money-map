import axios from "axios";
import { Transaction } from "../components/transactions/TransactionRow";

const getTransactions = async (): Promise<Transaction[]> => {
  try {
    const response = await axios.get("/api/transactions");
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
};

export default getTransactions;
