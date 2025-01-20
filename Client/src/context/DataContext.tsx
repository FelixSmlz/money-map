import { createContext, Dispatch, SetStateAction } from "react";

export type DataType = "transactions" | "categories" | "budgets" | "goals";

export type DataContextType = {
  dataType: DataType;
  setDataType: Dispatch<SetStateAction<string>>;
  data: any[];
  setData: Dispatch<SetStateAction<any[]>>;
};

export const DataContext = createContext<DataContextType>({
  dataType: "transactions",
  setDataType: () => {},
  data: [],
  setData: () => {},
});
