import { useState, useEffect } from "react";

type Props = {
  onChange: (type: "income" | "expense") => void;
  initialType?: "income" | "expense";
};

const TransactionTypeSwitch = ({
  onChange,
  initialType = "expense",
}: Props) => {
  const [type, setType] = useState<"income" | "expense">(initialType);

  const handleToggle = () => {
    const newType = type === "income" ? "expense" : "income";
    setType(newType);
    onChange(newType);
  };

  return (
    <div
      onClick={handleToggle}
      className="flex items-center gap-3 bg-white py-3 px-6 rounded-[15px] hover:bg-bg_black hover:text-white"
    >
      <div className="relative bg-light_gray w-6 h-2 rounded-full transition-colors duration-200 ease-in-out">
        <span
          className={`absolute left-0 -top-1 w-4 h-4 rounded-full flex items-center justify-center text-white transition-transform duration-200 ease-in-out ${
            type === "income"
              ? "translate-x-0 bg-turkois"
              : "translate-x-2 bg-red"
          }`}
        >
          {type === "income" ? "+" : "-"}
        </span>
      </div>
      <span className="text-base text-center w-[7ch]">
        {type === "income" ? "Income" : "Expense"}
      </span>
    </div>
  );
};

export default TransactionTypeSwitch;
