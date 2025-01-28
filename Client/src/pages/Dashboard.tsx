import Background from "../components/Background";
import Analytics from "../components/Analytics";
import Recent from "../components/Recent";
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
  return (
    <div className="px-5 py-10 position-relative mb-10">
      <Background />
      <header className="flex justify-between items-center text-bg_black">
        <div className="flex items-center space-x-4">
          <Avatar name={user?.name} size="md" />
          <a href="/dashboard" className="text-lg text-bg_black font-semibold">
            Hi, {userFirstName}
          </a>
        </div>
        <NotificationMenu />
      </header>
      <div className="flex flex-col justify-center gap-1 text-center mt-8 mb-5">
        <p className="text-bg_black font-semibold text-sm">Spent this month</p>
        <h2 className="text-xl text-bg_black">{monthlySpent}€ </h2>
      </div>
      <Analytics />
      <Recent />
      <Nav />
      <AddMenu />
    </div>
  );
}

export default Dashboard;
