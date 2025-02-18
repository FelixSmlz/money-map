import { NavLink } from "react-router-dom";
import ArrowIcon from "../assets/icons/arrow-right.svg";

function ProfileBtn() {
  return (
    <NavLink
      to="/profile"
      className="w-full flex items-center gap-4 p-4 hover:bg-bg_gray/5 
        transition-colors  group border-b "
    >
      <div
        className="bg-[#F2F2F2] p-3 rounded-[15px] transition-colors 
        group-hover:bg-bg_black"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform group-hover:scale-110"
        >
          <path
            className="transition-all group-hover:stroke-white"
            d="M13.1733 11.7758C13.0649 11.765 12.9349 11.765 12.8158 11.7758C10.2374 11.6891 8.18994 9.57663 8.18994 6.97663C8.18994 4.32246 10.3349 2.16663 12.9999 2.16663C15.6541 2.16663 17.8099 4.32246 17.8099 6.97663C17.7991 9.57663 15.7516 11.6891 13.1733 11.7758Z"
            stroke="#1A1B1C"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="transition-all group-hover:stroke-white"
            d="M7.75666 15.7734C5.13499 17.5284 5.13499 20.3884 7.75666 22.1325C10.7358 24.1259 15.6217 24.1259 18.6008 22.1325C21.2225 20.3775 21.2225 17.5175 18.6008 15.7734C15.6325 13.7909 10.7467 13.7909 7.75666 15.7734Z"
            stroke="#1A1B1C"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="flex flex-col">
        <p className="text-bg_black font-medium">My Profile</p>
        <span className="text-my_gray text-sm">View and edit your profile</span>
      </div>

      <img
        src={ArrowIcon}
        alt=""
        className="w-4 h-4 ml-auto transition-transform 
          group-hover:translate-x-1"
      />
    </NavLink>
  );
}

export default ProfileBtn;
