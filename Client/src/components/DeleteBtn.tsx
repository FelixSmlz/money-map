import { useState } from "react";
import { createPortal } from "react-dom";
import deleteIcon from "../assets/icons/delete.svg";
import ConfirmWindow from "./ConfirmWindow";

type Props = {
  onDelete: () => void;
  message?: string;
};

const DeleteBtn = ({
  onDelete,
  message = "Are you sure you want to delete this item?",
}: Props) => {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="group flex items-center gap-2 bg-white hover:bg-red rounded-[15px] py-3 px-6 
          transition-all duration-300 ease-in-out transform hover:scale-[1.02] 
          shadow-sm hover:shadow-md border border-transparent hover:border-red/10"
      >
        <span className="font-medium text-red group-hover:text-white transition-colors">
          Delete
        </span>
        <img
          src={deleteIcon}
          alt="delete"
          className="w-5 h-5 transition-transform group-hover:rotate-12 group-hover:scale-110 group-hover:invert"
        />
      </button>

      {showConfirm &&
        createPortal(
          <ConfirmWindow
            message={message}
            onCancel={() => setShowConfirm(false)}
            onConfirm={onDelete}
          />,
          document.body
        )}
    </>
  );
};

export default DeleteBtn;
