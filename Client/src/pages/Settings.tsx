import { useState } from "react";
import { ActionFunctionArgs } from "react-router";
import { redirect, useLoaderData } from "react-router-dom";
import AddMenu from "../components/AddMenu";
import Avatar from "../components/Avatar";
import Background from "../components/Background";
import ChangePasswordBtn from "../components/ChangePasswordBtn";
import DeleteProfileBtn from "../components/DeleteProfileBtn";
import DesktopNav from "../components/DesktopNav";
import FeedbackBtn from "../components/FeedbackBtn";
import LogoutBtn from "../components/LogoutBtn";
import NotificationMenu from "../components/NotificationMenu";
import NotificationSwitch from "../components/NotificationSwitch";
import ProfileLink from "../components/ProfileLink";
import {
  deleteProfile,
  isLoggedIn,
  logout,
  toggleNotifications,
} from "../utils/api";
import TutorialResetBtn from "../components/TutorialResetBtn";

export const loader = async () => {
  const { user } = await isLoggedIn();
  if (user) {
    return { user };
  }
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = formData.get("intent");

  switch (intent) {
    case "logout":
      const logoutResponse = await logout();
      if (logoutResponse.status === 200) {
        return redirect("/guest/login");
      }
      break;

    case "deleteProfile":
      const deleteResponse = await deleteProfile();
      if (deleteResponse.status === 200) {
        return redirect("/guest/login");
      }
      break;

    case "toggleNotifications":
      const toggleResponse = await toggleNotifications();
      if (toggleResponse.status === 200) {
        return redirect("/settings");
      }
      break;

    default:
      return { error: "Invalid intent" };
  }
};

function Settings() {
  const data = useLoaderData<typeof loader>();
  const user = data?.user;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-bg_gray/5 px-5 py-10 max-w-[1024px] mx-auto relative">
      <Background />
      <header className="flex justify-between items-center mb-8 text-bg_black">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden lg:flex items-center justify-center w-10 h-10 
              bg-white/95 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg 
              transition-all duration-300 hover:scale-105 hover:bg-bg_black 
              group border border-transparent hover:border-turkois/10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-bg_black group-hover:text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <a href="/settings" className="text-lg text-bg_black font-semibold">
            Settings
          </a>
        </div>
        <NotificationMenu />
      </header>
      <div className="flex flex-col items-center mb-8 animate-fadeIn">
        <div className="flex items-center gap-6 p-6 rounded-[20px] bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300">
          <Avatar color={user?.profile_color} name={user?.name} size="lg" />
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-medium text-bg_black">{user?.name}</h2>
            <p className="text-my_gray text-sm">{user?.email}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-4 bg-white/95 backdrop-blur-sm max-w-[500px] mx-auto rounded-[20px] shadow-xl w-full transition-all duration-300 animate-fadeIn">
        <div className="flex items-center gap-4 p-4 hover:bg-bg_gray/5  border-b  transition-all duration-300 group cursor-pointer">
          <div className="bg-[#F2F2F2] p-3 rounded-[15px] transition-all duration-300 group-hover:bg-bg_black shadow-sm group-hover:shadow-md">
            <svg
              fill="none"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform duration-300 group-hover:scale-110"
            >
              <g
                className="transition-colors duration-300 group-hover:stroke-white"
                stroke="#1A1B1C"
                strokeMiterlimit="10"
                strokeWidth="1.75"
              >
                <path
                  d="m12.02 2.91003c-3.31003 0-6.00003 2.69-6.00003 6v2.88997c0 .61-.26 1.54-.57 2.06l-1.15 1.91c-.71 1.18-.22 2.49 1.08 2.93 4.31 1.44 8.96003 1.44 13.27003 0 1.21-.4 1.74-1.83 1.08-2.93l-1.15-1.91c-.3-.52-.56-1.45-.56-2.06v-2.88997c0-3.3-2.7-6-6-6z"
                  strokeLinecap="round"
                />
                <path
                  d="m13.87 3.19994c-.31-.09-.63-.16-.96-.2-.96-.12-1.88-.05-2.74.2.29-.74 1.01-1.26 1.85-1.26s1.56.52 1.85 1.26z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="m15.02 19.0601c0 1.65-1.35 3-3 3-.82 0-1.58-.34-2.11998-.88-.54-.54-.88-1.3-.88-2.12" />
              </g>
            </svg>
          </div>
          <p className="text-bg_black font-medium group-hover:text-bg_black/80 transition-colors duration-300">
            Notifications
          </p>
          <div className="ml-auto">
            <NotificationSwitch enabled={user?.notifications_enabled} />
          </div>
        </div>
        <div className="space-y-1">
          <ProfileLink />
          <ChangePasswordBtn />
          <TutorialResetBtn />
          <FeedbackBtn />
          <DeleteProfileBtn />
          <LogoutBtn />
        </div>
      </div>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <DesktopNav
          onClose={() => setIsSidebarOpen(false)}
          isOpen={isSidebarOpen}
          user={user}
          userFirstName={user?.name.split(" ")[0]}
        />
      </div>
      <AddMenu />
    </div>
  );
}

export default Settings;
