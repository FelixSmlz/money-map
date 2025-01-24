import { NavLink } from "react-router-dom";
import Background from "../components/Background";

const Welcome = () => {
  return (
    <div className="flex items-center justify-center h-dvh px-5 py-10 position-relative">
      <Background />
      <div className="bg-white w-full rounded-[15px] shadow-sm p-10 flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl font-medium text-bg_black">MoneyMap</h1>
          <p className="text-gray text-center max-w-[25ch]">
            Track your expenses and achieve your financial goals
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <NavLink
            to="/guest/login"
            className="bg-bg_black text-white hover:bg-white hover:text-bg_black border-2 border-bg_black rounded-[15px] p-3 text-center"
          >
            Login
          </NavLink>
          <NavLink
            to="/guest/register"
            className="bg-white text-bg_black hover:bg-bg_black hover:text-white border-2 border-bg_black rounded-[15px] p-3 text-center"
          >
            Register
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
