import { useState, useRef, useEffect } from "react";
import { DataType } from "../pages/History";

type DropdownProps = {
  value: string;
  onChange: (value: DataType) => void;
};

function DataTypeMenu({ value, onChange }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options: { value: DataType; label: string }[] = [
    { value: "transactions", label: "Transactions" },
    { value: "budgets", label: "Budgets" },
    { value: "goals", label: "Goals" },
    { value: "categories", label: "Categories" },
  ];

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-transparent text-lg font-medium"
      >
        <span>{options.find((opt) => opt.value === value)?.label}</span>
        <svg
          width="13"
          height="8"
          viewBox="0 0 13 8"
          fill="none"
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <path
            d="M1.99968 2L5.67421 5.67454C6.10816 6.10849 6.81827 6.10849 7.25222 5.67454L10.9268 2"
            stroke="#1A1B1C"
            strokeWidth="2.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full text-base left-0 mt-2 bg-white rounded-[15px] shadow-lg p-2 z-10 min-w-[150px] w-full">
          {options.map((option) => (
            <div
              key={option.value}
              className={`p-3 rounded-[15px] cursor-pointer hover:bg-my_gray/5 ${
                value === option.value ? "text-turkois" : "text-bg_black"
              }`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DataTypeMenu;
