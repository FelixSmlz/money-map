import { Link } from "react-router-dom";
import ArrowIcon from "../assets/icons/arrow-right.svg";
import ChangePasswordIcon from "../assets/icons/change_password.svg";

const ChangePasswordBtn = () => {
  return (
    <>
      <Link
        to="/change-password"
        className="flex items-center justify-between mx-4 py-4 cursor-pointer border-b border-light_gray"
      >
        <div className="flex items-center gap-4">
          <div className="bg-[#F2F2F2] w-fit p-2 rounded-[15px]">
            <img src={ChangePasswordIcon} alt="Change Password" />
          </div>
          <p className="text-bg_black text-base h-fit mr-auto">
            Change Password
          </p>
        </div>
        <img className="w-4" src={ArrowIcon} alt="" />
      </Link>
    </>
  );
};

export default ChangePasswordBtn;
