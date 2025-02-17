import { useEffect, useRef, useState } from "react";
import budgetIcon from "../assets/icons/budget.svg";
import categoryIcon from "../assets/icons/category.svg";
import goalIcon from "../assets/icons/goal.svg";
import transactionIcon from "../assets/icons/transaction.svg";
import AddModal from "./AddModal";

type FormType = "transaction" | "budget" | "goal" | "category";

function AddMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [formType, setFormType] = useState<FormType | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { title: "Transaction", path: "/transactions/new", icon: transactionIcon },
    { title: "Budget", path: "/budgets/new", icon: budgetIcon },
    { title: "Goal", path: "/goals/new", icon: goalIcon },
    { title: "Category", path: "/categories/new", icon: categoryIcon },
  ];

  return (
    <div
      ref={menuRef}
      className="fixed bottom-[6rem] lg:bottom-[3rem] lg:right-[3rem] right-0 mr-5 z-10"
    >
      {isOpen && (
        <div className="absolute bottom-[5rem] lg:h-fit right-4 bg-white rounded-[15px] shadow-lg p-2 min-w-[200px]">
          {menuItems.map((item) => (
            <button
              key={item.path}
              className="flex items-center gap-3 p-3 hover:bg-my_gray/5 rounded-[15px] cursor-pointer w-full text-left"
              onClick={() => {
                setFormType(item.title.toLowerCase() as FormType);
                setIsOpen(false);
              }}
            >
              <img src={item.icon} alt={item.title} />
              <span className="text-bg_black">{item.title}</span>
            </button>
          ))}
        </div>
      )}
      <AddModal
        isOpen={!!formType}
        key={formType}
        onClose={() => setFormType(null)}
        type={formType as FormType}
      />

      <button
        className="add-button bg-bg_black shadow-card p-4 flex justify-center items-center rounded-full text-white group hover:bg-white hover:scale-105 relative transition-all duration-200 ease-out"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="absolute right-full -translate-x-2 top-1/2 -translate-y-1/2 pointer-events-none">
          <span className="bg-white px-3 py-1.5 rounded-lg shadow-md text-bg_black text-sm whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 ease-out">
            Add new item
          </span>
        </div>
        <svg
          fill="none"
          height="28"
          viewBox="0 0 28 28"
          width="28"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            className="group-hover:stroke-bg_black"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
          >
            <path d="m2.38672 14h23.22578" />
            <path d="m14 25.6129v-23.22582" />
          </g>
        </svg>
      </button>
    </div>
  );
}

export default AddMenu;
