import Background from "../components/Background";
import Analytics from "../components/Analytics";
import Recent from "../components/Recent";
import DesktopNav from "../components/DesktopNav";
import { useState } from "react";
import AddMenu from "../components/AddMenu";
import Nav from "../components/Nav";
import { isLoggedIn, getMonthlySpending } from "../utils/api";
import { useLoaderData } from "react-router-dom";
import Avatar from "../components/Avatar";
import NotificationMenu from "../components/NotificationMenu";

export const loader = async () => {
  const { user } = await isLoggedIn();
  const { monthly_spent } = await getMonthlySpending();
  if (user) {
    return { user, monthly_spent };
  }
};

function Dashboard() {
  const data = useLoaderData<typeof loader>();
  const user = data?.user;
  const monthlySpent = data?.monthly_spent;
  const userFirstName = user?.name.split(" ")[0];
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="px-5 py-10 max-w-[1024px] mx-auto position-relative mb-10">
      <Background />
      <header className="flex justify-between items-center text-bg_black">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden lg:block mr-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
          <Avatar color={user?.profile_color} name={user?.name} size="md" />
          <a href="/dashboard" className="text-lg text-bg_black font-semibold">
            Hi, {userFirstName}
          </a>
        </div>
        <NotificationMenu />
      </header>
      <div className="lg:bg-white/70 lg:px-[3rem]  lg:pb-[3rem] lg:mt-[5rem] lg:rounded-[15px] lg:shadow-md">
        <div className="flex flex-col sm:max-w-[600px] lg:max-w-[1024px] lg:gap-[3rem] sm:mx-auto lg:flex-row">
          <div className="flex flex-col sm:w-[600px] lg:gap-[3rem] sm:mx-auto lg:w-[1000px] lg:flex-row ">
            {/* Left Column */}
            <div className="lg:w-1/2  flex flex-col gap-8">
              <div className="p-6 rounded-[15px]">
                <div className="flex flex-col justify-center gap-1 text-center">
                  <div className="flex flex-col justify-center gap-1 text-center mt-8 mb-5">
                    <p className="text-bg_black font-semibold text-sm">
                      Spent this month
                    </p>
                    <h2 className="text-xl text-bg_black">{monthlySpent}€ </h2>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                <Analytics />
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:w-1/2 lg:m-4">
              <div className="lg:hidden flex justify-center mb-8">
                <Analytics />
              </div>
              <Recent />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation - Show only on mobile */}
      <div className="lg:hidden">
        <Nav />
        <AddMenu />
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <DesktopNav
          onClose={() => setIsSidebarOpen(false)}
          user={user}
          userFirstName={userFirstName}
          isOpen={isSidebarOpen}
        />
      </div>
    </div>
  );
}

export default Dashboard;
