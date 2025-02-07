import { useState, useRef, useEffect } from "react";
import AddModal from "./AddModal";
import transactionIcon from "../assets/icons/transaction.svg";
import budgetIcon from "../assets/icons/budget.svg";
import goalIcon from "../assets/icons/goal.svg";
import categoryIcon from "../assets/icons/category.svg";

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
      className="fixed bottom-[6rem] lg:top-[31%] lg:left-[38%] right-0  mr-5 z-10"
    >
      {isOpen && (
        <div className="absolute bottom-16 lg:top-16 lg:h-fit lg:left-12 right-0 bg-white rounded-[15px] shadow-lg p-2 min-w-[200px]">
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
        className="bg-bg_black shadow-card p-4 flex justify-center items-center rounded-full text-white group hover:bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
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
