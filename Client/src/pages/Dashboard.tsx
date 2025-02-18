import Background from "../components/Background";
import Analytics from "../components/Analytics";
import Recent from "../components/Recent";
import DesktopNav from "../components/DesktopNav";
import { useEffect, useState } from "react";
import AddMenu from "../components/AddMenu";
import Nav from "../components/Nav";
import { isLoggedIn, getMonthlySpending } from "../utils/api";
import { useLoaderData, useNavigate } from "react-router-dom";
import Avatar from "../components/Avatar";
import NotificationMenu from "../components/NotificationMenu";
import { driver } from "driver.js";
import "../assets/css/driver.css";
import "driver.js/dist/driver.css";

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
  const navigate = useNavigate();
  const monthlySpent = data?.monthly_spent;
  const userFirstName = user?.name.split(" ")[0];
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const tutorialKey = `hasSeenTutorial_${user?.id}`;
    const hasSeenTutorial = localStorage.getItem(tutorialKey);

    if (!hasSeenTutorial) {
      const driverObj = driver({
        showProgress: true,
        animate: true,
        showButtons: ["close", "next", "previous"],
        allowClose: false,
        steps: [
          {
            element: ".dashboard",
            popover: {
              title: "Welcome to your dashboard! 👋",
              description:
                "Let me walk you through the features of your dashboard.",
              popoverClass: "custom-class",
            },
          },
          {
            element: ".monthly-spending",
            popover: {
              title: "Monthly Spending Overview",
              description:
                "Have a live view of your monthly spending, that updates automatically when adding transactions.",
              popoverClass: "custom-class",
              side: "right",
            },
          },
          {
            element: ".analytics",
            popover: {
              title: "Analytics 📊",
              description:
                "Get a visual representation of your spending. See the daily balance for every day of the last week.",
              popoverClass: "custom-class",
              side: "right",
            },
          },
          {
            element: ".notifications",
            popover: {
              title: "Notifications 🔔",
              description:
                "Stay informed with notifications about your budgets, goals, and important updates.",
              popoverClass: "custom-class",
              side: "right",
            },
          },
          {
            element: ".add-button",
            popover: {
              title: "Add a new item ",
              description:
                "Quickly add transactions, budgets, goals or categories from here.",
              popoverClass: "custom-class",
              side: "top",
            },
          },
          {
            element: ".recent",
            popover: {
              title: "Want to see more? 🔍",
              description:
                "Let's check out the history page where you can view all your transactions!",
              popoverClass: "custom-class",
              side: "left",
              onNextClick: () => {
                localStorage.setItem(`tutorialStep_${user?.id}`, "history");
                navigate("/history");
              },
            },
          },
        ],
        onDestroyStarted: () => {
          localStorage.setItem(tutorialKey, "true");
          localStorage.removeItem(`tutorialStep_${user?.id}`);
          driverObj.destroy();
        },
        onDestroyed: () => {
          localStorage.setItem(tutorialKey, "true");
          localStorage.removeItem(`tutorialStep_${user?.id}`);
        },
      });

      const timer = setTimeout(() => {
        driverObj.drive();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  return (
    <div className="px-5 py-10 max-w-[1024px] mx-auto position-relative mb-10 overflow-clip">
      <Background />
      <header className="flex justify-between items-center text-bg_black mb-8">
        <div className="flex items-center gap-4 transition-all hover:opacity-90">
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
          <Avatar color={user?.profile_color} name={user?.name} size="md" />
          <a
            href="/dashboard"
            className="text-lg text-bg_black font-semibold hover:opacity-80 transition-opacity"
          >
            Hi, {userFirstName}
          </a>
        </div>
        <div className="notifications">
          <NotificationMenu />
        </div>
      </header>
      <div
        className="lg:bg-white/75 dashboard lg:px-8 lg:py-10 lg:rounded-[25px] 
        lg:shadow-xl backdrop-blur-sm transition-all duration-300"
      >
        <div
          className="flex flex-col sm:max-w-[600px] lg:max-w-[1024px] lg:gap-12 
          sm:mx-auto lg:flex-row"
        >
          <div className="flex flex-col sm:w-[600px] sm:mx-auto lg:w-[1000px] lg:flex-row">
            {/* Left Column */}
            <div className="lg:w-1/2  flex flex-col gap-8">
              <div className="p-6 rounded-[15px]">
                <div className="flex flex-col justify-center gap-1 text-center">
                  <div className="monthly-spending flex flex-col justify-center gap-1 text-center mt-8 mb-5">
                    <p className="text-bg_black font-semibold text-sm">
                      Spent this month
                    </p>
                    <h2 className="text-xl text-bg_black">{monthlySpent}€ </h2>
                  </div>
                </div>
              </div>
              <div className="analytics hidden lg:block statistics">
                <Analytics />
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:w-1/2 lg:m-4">
              <div className="analytics lg:hidden statistics flex justify-center mb-8">
                <Analytics />
              </div>
              <div className="recent">
                <Recent />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation - Show only on mobile */}
      <div className="lg:hidden">
        <Nav />
      </div>
      <AddMenu />

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
