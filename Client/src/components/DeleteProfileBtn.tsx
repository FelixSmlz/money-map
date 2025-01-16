import deleteProfileIcon from "../assets/icons/delete_profile.svg";
import { useFetcher } from "react-router-dom";

const DeleteProfileBtn = () => {
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
    <div
      onClick={handleDeleteProfile}
      className="flex items-center gap-4 mx-4 py-4 cursor-pointer border-b border-light_gray"
    >
      <div className="bg-[#FAEBEB] w-fit p-2 rounded-[15px]">
        <img src={deleteProfileIcon} alt="" />
      </div>
      <p className="text-red text-base h-fit mr-auto">Delete Profile</p>
    </div>
  );
};

export default DeleteProfileBtn;
