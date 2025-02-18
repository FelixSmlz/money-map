import { useFetcher } from "react-router-dom";
import ConfirmWindow from "./ConfirmWindow";
import { useState } from "react";
import { createPortal } from "react-dom";

const LogoutBtn = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const fetcher = useFetcher();

  const handleLogout = () => {
    fetcher.submit({ intent: "logout" }, { method: "POST" });
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="w-full flex items-center gap-4 p-4 hover:bg-[#FAEBEB]/10 
          transition-colors  group"
        type="button"
      >
        <div
          className="bg-[#FAEBEB] p-3 rounded-[15px] transition-colors 
          group-hover:bg-red"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform group-hover:scale-110"
          >
            <path
              d="M9.40039 8.17999C9.71039 4.57999 11.5604 3.10999 15.6104 3.10999H15.7404C20.2104 3.10999 22.0004 4.89999 22.0004 9.36999V15.89C22.0004 20.36 20.2104 22.15 15.7404 22.15H15.6104C11.5904 22.15 9.74039 20.7 9.41039 17.16"
              stroke="#FF0051"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:stroke-white transition-colors"
            />
            <path
              d="M15.5001 12.62H4.12012"
              stroke="#FF0051"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:stroke-white transition-colors"
            />
            <path
              d="M6.35 9.27002L3 12.62L6.35 15.97"
              stroke="#FF0051"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:stroke-white transition-colors"
            />
          </svg>
        </div>

        <div className="flex flex-col text-left">
          <p className="text-red font-medium">Logout</p>
          <span className="text-my_gray text-sm">Sign out of your account</span>
        </div>
      </button>

      {showConfirm &&
        createPortal(
          <ConfirmWindow
            message="Are you sure you want to log out?"
            onConfirm={handleLogout}
            onCancel={() => setShowConfirm(false)}
          />,
          document.body
        )}
    </>
  );
};

export default LogoutBtn;
