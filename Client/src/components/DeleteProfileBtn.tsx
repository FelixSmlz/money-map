import deleteProfileIcon from "../assets/icons/delete_profile.svg";
import { useFetcher } from "react-router-dom";
import { useState } from "react";
import ConfirmWindow from "./ConfirmWindow";

const DeleteProfileBtn = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const fetcher = useFetcher();
  const handleDeleteProfile = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your profile?"
    );
    if (confirmDelete) {
      fetcher.submit({ intent: "deleteProfile" }, { method: "POST" });
    }
  };
  return (
    <>
      <div
        onClick={() => setShowConfirm(true)}
        className="flex items-center gap-4 mx-4 py-4 cursor-pointer border-b border-light_gray"
      >
        <div className="bg-[#FAEBEB] w-fit p-2 rounded-[15px]">
          <img src={deleteProfileIcon} alt="" />
        </div>
        <p className="text-red text-base h-fit mr-auto">Delete Profile</p>
      </div>
      {showConfirm && (
        <ConfirmWindow
          message="Are you sure you want to delete your profile?"
          onConfirm={handleDeleteProfile}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
};

export default DeleteProfileBtn;
