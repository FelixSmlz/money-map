import { NavLink } from "react-router-dom";
import ArrowIcon from "../assets/icons/arrow-right.svg";

function ProfileBtn() {
  return (
    <NavLink
      to="/profile"
      className="flex items-center gap-4 mx-4 py-4 border-b border-light_gray"
    >
      <div className="bg-[#F2F2F2] w-fit p-2 rounded-[15px]">
        <svg
          width="24"
          height="24"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className=" group-hover:fill-bg_black"
            d="M13.1733 11.7758C13.0649 11.765 12.9349 11.765 12.8158 11.7758C10.2374 11.6891 8.18994 9.57663 8.18994 6.97663C8.18994 4.32246 10.3349 2.16663 12.9999 2.16663C15.6541 2.16663 17.8099 4.32246 17.8099 6.97663C17.7991 9.57663 15.7516 11.6891 13.1733 11.7758Z"
            stroke="#1A1B1C"
            stroke-width="1.75"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            className=" group-hover:fill-bg_black"
            d="M7.75666 15.7734C5.13499 17.5284 5.13499 20.3884 7.75666 22.1325C10.7358 24.1259 15.6217 24.1259 18.6008 22.1325C21.2225 20.3775 21.2225 17.5175 18.6008 15.7734C15.6325 13.7909 10.7467 13.7909 7.75666 15.7734Z"
            stroke="#1A1B1C"
            stroke-width="1.75"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <p className="text-bg_black text-base h-fit mr-auto">My Profile</p>
      <img className="w-4" src={ArrowIcon} alt="" />
    </NavLink>
  );
}

export default ProfileBtn;
