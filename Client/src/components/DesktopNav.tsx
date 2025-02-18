import { NavLink } from "react-router-dom";
import dashboardIcon from "../assets/icons/dashboard.svg";
import dashboardIconHover from "../assets/icons/dashboard_hover.svg";
import historyIcon from "../assets/icons/history.svg";
import historyIconHover from "../assets/icons/history_hover.svg";
import settingsIcon from "../assets/icons/settings.svg";
import settingsIconHover from "../assets/icons/settings_hover.svg";
import profileIcon from "../assets/icons/profile.svg";
import Avatar from "./Avatar";
import { useState } from "react";
import { useFetcher } from "react-router-dom";
import ConfirmWindow from "./ConfirmWindow";

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
  const [showConfirm, setShowConfirm] = useState(false);
  const fetcher = useFetcher();
  const handleLogout = () => {
    console.log("Initiating logout...");
    fetcher.submit(
      { intent: "logout" },
      {
        method: "POST",
        action: "/",
      }
    );
    console.log("Fetcher state:", fetcher.state);
    setShowConfirm(false);
  };

  const navLinks = [
    {
      to: "/dashboard",
      icon: dashboardIcon,
      iconHover: dashboardIconHover,
      label: "Dashboard",
    },
    {
      to: "/history",
      icon: historyIcon,
      iconHover: historyIconHover,
      label: "History",
    },
    {
      to: "/profile",
      icon: profileIcon,
      label: "Profile",
    },
    {
      to: "/settings",
      icon: settingsIcon,
      iconHover: settingsIconHover,
      label: "Settings",
    },
  ];

  return (
    <div
      className={`fixed left-0 bg-white top-0 h-full shadow-lg transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2.5 hover:bg-gray-100 rounded-full transition-all duration-200 ease-out"
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
      <div className="p-12 bg-white/100 flex mt-6 flex-col h-full">
        <div className="flex items-center gap-4 p-4 mb-8 bg-gray-50 rounded-2xl">
          <Avatar
            color={user.profile_color}
            name={user.name ?? "Guest"}
            size="md"
          />
          <div className="flex flex-col">
            <span className="text-sm text-my_gray">Welcome back</span>
            <a
              href="/profile"
              className="text-lg text-bg_black font-semibold hover:text-turkois transition-colors"
            >
              {userFirstName}
            </a>
          </div>
        </div>
        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 min-w-min py-3.5 rounded-xl transition-all duration-200 ease-out ${
                  isActive
                    ? "bg-turkois/10 text-bg_black font-medium"
                    : "text-my_gray hover:bg-gray-50"
                }`
              }
              to={link.to}
            >
              {({ isActive }) => (
                <>
                  <img
                    src={isActive ? link.iconHover : link.icon}
                    alt={link.label}
                    className="w-5 h-5"
                  />
                  <span>{link.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={() => setShowConfirm(true)}
          className="mt-auto flex items-center gap-4 px-4 py-3.5 text-red hover:bg-red/5 rounded-xl transition-all duration-200 ease-out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span>Logout</span>
        </button>
      </div>

      {showConfirm && (
        <ConfirmWindow
          message="Are you sure you want to log out?"
          onConfirm={handleLogout}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
};

export default DesktopNav;
