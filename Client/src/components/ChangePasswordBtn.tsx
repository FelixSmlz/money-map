import { Link } from "react-router-dom";
import ArrowIcon from "../assets/icons/arrow-right.svg";
import ChangePasswordIcon from "../assets/icons/change_password.svg";

const ChangePasswordBtn = () => {
  return (
    <>
      <Link
        to="/change-password"
        className="w-full flex items-center gap-4 p-4 hover:bg-bg_gray/5 
        transition-colors  group border-b "
      >
        <div
          className="bg-[#F2F2F2] p-3 rounded-[15px] transition-colors 
        group-hover:bg-bg_black"
        >
          <img
            src={ChangePasswordIcon}
            alt="Change Password"
            className="w-6 h-6 transition-transform group-hover:scale-110 
            group-hover:invert"
          />
        </div>

        <div className="flex flex-col">
          <p className="text-bg_black font-medium">Change Password</p>
          <span className="text-my_gray text-sm">
            Update your account password
          </span>
        </div>

        <img
          src={ArrowIcon}
          alt=""
          className="w-4 h-4 ml-auto transition-transform 
          group-hover:translate-x-1"
        />
      </Link>
    </>
  );
};

export default ChangePasswordBtn;
