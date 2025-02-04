import deleteIcon from "../assets/icons/delete.svg";
import { useState } from "react";
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
        className="flex items-center gap-2 text-red bg-white rounded-[15px] shadow-sm py-3 px-6 hover:bg-bg_black hover:text-white"
      >
        Delete
        <img src={deleteIcon} alt="delete" />
      </button>
      {showConfirm && (
        <ConfirmWindow
          message={message}
          onCancel={() => setShowConfirm(false)}
          onConfirm={onDelete}
        />
      )}
    </>
  );
};

export default DeleteBtn;
