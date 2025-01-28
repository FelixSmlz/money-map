import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

function AddMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
    { title: "Transaction", path: "/transactions/new", icon: "💸" },
    { title: "Budget", path: "/budgets/new", icon: "💰" },
    { title: "Goal", path: "/goals/new", icon: "🎯" },
    { title: "Category", path: "/categories/new", icon: "📑" },
  ];

  return (
    <div ref={menuRef} className="fixed bottom-[6rem] right-0 mr-5 z-10">
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white rounded-[15px] shadow-lg p-2 min-w-[200px]">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 p-3 hover:bg-gray/5 rounded-[15px] cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-bg_black">{item.title}</span>
            </Link>
          ))}
        </div>
      )}

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
