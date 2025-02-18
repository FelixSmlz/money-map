import { useFetcher } from "react-router-dom";
import { useState } from "react";
import ConfirmWindow from "./ConfirmWindow";
import { createPortal } from "react-dom";

const DeleteProfileBtn = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const fetcher = useFetcher();

  const handleDeleteProfile = () => {
    fetcher.submit({ intent: "deleteProfile" }, { method: "POST" });
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="w-full flex items-center gap-4 p-4 hover:bg-[#FAEBEB]/10 
          transition-colors  group border-b "
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
              d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998"
              stroke="#FF0051"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:stroke-white transition-colors"
            />
            <path
              d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
              stroke="#FF0051"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:stroke-white transition-colors"
            />
            <path
              d="M18.85 9.14001L18.2 19.21C18.09 20.78 18 22 15.21 22H8.79002C6.00002 22 5.91002 20.78 5.80002 19.21L5.15002 9.14001"
              stroke="#FF0051"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:stroke-white transition-colors"
            />
          </svg>
        </div>

        <div className="flex flex-col text-left">
          <p className="text-red font-medium">Delete Profile</p>
          <span className="text-my_gray text-sm">
            Permanently delete your account
          </span>
        </div>
      </button>

      {showConfirm &&
        createPortal(
          <ConfirmWindow
            message="Are you sure you want to delete your profile? This action cannot be undone."
            onConfirm={handleDeleteProfile}
            onCancel={() => setShowConfirm(false)}
          />,
          document.body
        )}
    </>
  );
};

export default DeleteProfileBtn;
