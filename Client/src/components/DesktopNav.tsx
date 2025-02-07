import React from "react";
import { NavLink } from "react-router-dom";
import Avatar from "./Avatar";
import AddMenu from "./AddMenu";
import dashboardIcon from "../assets/icons/dashboard.svg";
import historyIcon from "../assets/icons/history.svg";
import settingsIcon from "../assets/icons/settings.svg";
import profileIcon from "../assets/icons/profile.svg";

type DesktopNavType = {
  user?: any;
  userFirstName?: string;
  isOpen: boolean;
  onClose: () => void;
};

const DesktopNav = ({
  user,
  userFirstName,
  isOpen,
  onClose,
}: DesktopNavType) => {
  return (
    <div
      className={`fixed left-0 top-0 h-full bg-white w-64 shadow-lg transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-bg_black"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="p-12 flex flex-col gap-14">
        <div className="flex items-center space-x-4">
          <Avatar
            color={user.profile_color}
            name={user.name ?? "Guest"}
            size="md"
          />
          <a href="/profile" className="text-lg text-bg_black font-semibold">
            Hi, {userFirstName}
          </a>
        </div>
        <nav className="flex flex-col gap-6">
          <NavLink className={"flex gap-4 items-center"} to="/dashboard">
            <img src={dashboardIcon} alt="Dashboard" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink className={"flex gap-4 items-center"} to="/history">
            <img src={historyIcon} alt="History" />
            <span>History</span>
          </NavLink>
          <NavLink className={"flex gap-4 items-center"} to="/settings">
            <img src={settingsIcon} alt="Settings" />
            <span>Settings</span>
          </NavLink>
          <NavLink className={"flex gap-4 items-center"} to="/profile">
            <img src={profileIcon} alt="Profile" />
            <span>Profile</span>
          </NavLink>
        </nav>
        <AddMenu />
      </div>
    </div>
  );
};

export default DesktopNav;
