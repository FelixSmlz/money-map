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
      className="fixed bottom-[6rem] lg:bottom-[3rem] lg:right-[3rem] right-0 mr-5 z-50"
    >
      {isOpen && (
        <div className="absolute bottom-[5rem] lg:h-fit right-4 bg-white rounded-[20px] shadow-xl p-3 min-w-[240px] transform opacity-0 animate-slideUpFade">
          <div className="flex flex-col gap-1">
            {menuItems.map((item) => (
              <button
                key={item.path}
                className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-xl cursor-pointer w-full text-left transition-all duration-200 group"
                onClick={() => {
                  setFormType(item.title.toLowerCase() as FormType);
                  setIsOpen(false);
                }}
              >
                <div className="bg-gray-50 group-hover:bg-white p-2 rounded-xl transition-colors">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-5 h-5 group-hover:scale-110 transition-transform"
                  />
                </div>
                <span className="text-bg_black font-medium group-hover:text-turkois transition-colors">
                  {item.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      <AddModal
        isOpen={!!formType}
        key={formType}
        onClose={() => setFormType(null)}
        type={formType as FormType}
      />

      <button
        className="add-button bg-bg_black shadow-xl p-4 flex justify-center items-center rounded-full text-white group hover:bg-white hover:scale-105 relative transition-all duration-300 ease-out hover:rotate-180"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          fill="none"
          height="28"
          viewBox="0 0 28 28"
          width="28"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform group-hover:rotate-180"
        >
          <g
            className="group-hover:stroke-bg_black transition-colors"
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
