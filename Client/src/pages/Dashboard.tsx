import Background from "../components/Background";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Analytics from "../components/Analytics";
import Recent from "../components/Recent";
import AddMenu from "../components/AddMenu";
import NavMember from "../components/NavMember";

function Dashboard() {
  return (
    <div className="px-5 py-10 position-relative">
      <Background />
      <Header />
      <div className="flex flex-col justify-center gap-1 text-center mt-8 mb-5">
        <p className="text-bg_black font-semibold text-sm">Spent this month</p>
        <h2 className="text-xl text-bg_black">€600,20</h2>
      </div>
      <Analytics />
      <Recent />

      <AddMenu />
    </div>
  );
}

export default Dashboard;
