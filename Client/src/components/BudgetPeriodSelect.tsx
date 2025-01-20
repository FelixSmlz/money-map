import { useState, useEffect, useRef } from "react";

type Period = "daily" | "weekly" | "monthly" | "custom";

type Props = {
  initialPeriod: Period;
  onChange: (period: Period) => void;
};

const BudgetPeriodSelect = ({ initialPeriod, onChange }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const periods: Period[] = ["daily", "weekly", "monthly", "custom"];

  const handleSelect = (period: Period) => {
    onChange(period);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white py-3 px-6 rounded-[15px] hover:bg-bg_black hover:text-white shadow-sm"
      >
        <span className="capitalize min-w-[6ch]">{initialPeriod}</span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M6 9l6 6 6-6"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white rounded-[15px] shadow-lg">
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => handleSelect(period)}
              className="w-full px-6 py-3 text-left hover:bg-bg_black hover:text-white first:rounded-t-[15px] last:rounded-b-[15px] capitalize"
            >
              {period}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BudgetPeriodSelect;
