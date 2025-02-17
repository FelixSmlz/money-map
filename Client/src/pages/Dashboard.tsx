import Background from "../components/Background";
import Analytics from "../components/Analytics";
import Recent from "../components/Recent";
import DesktopNav from "../components/DesktopNav";
import { useEffect, useState } from "react";
import AddMenu from "../components/AddMenu";
import Nav from "../components/Nav";
import { isLoggedIn, getMonthlySpending } from "../utils/api";
import { useLoaderData } from "react-router-dom";
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
            element: ".recent",
            popover: {
              title: "Recent Transactions 🕑",
              description:
                'View a short list of the last transactions you added. By clicking on "See All" you can view all your transactions.',
              popoverClass: "custom-class",
              side: "left",
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
            popover: {
              title: "Congratulations, you did it! 🎉",
              description:
                "I hope, I could help you get started. Enjoy saving money with MoneyMap!",
              popoverClass: "custom-class",
              side: "top",
            },
          },
        ],
        onDestroyStarted: () => {
          localStorage.setItem(tutorialKey, "true");
          driverObj.destroy();
        },
        onDestroyed: () => {
          localStorage.setItem(tutorialKey, "true");
        },
      });

      const timer = setTimeout(() => {
        driverObj.drive();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [user]);

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
      <div className="lg:bg-white/75 dashboard lg:px-[3rem] lg:pb-[3rem] lg:mt-[50%] lg:-translate-y-[50%] lg:rounded-[15px] lg:shadow-md">
        <div className="flex flex-col sm:max-w-[600px] lg:max-w-[1024px] lg:gap-[3rem] sm:mx-auto lg:flex-row">
          <div className="flex flex-col sm:w-[600px] lg:gap-[3rem] sm:mx-auto lg:w-[1000px] lg:flex-row ">
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
