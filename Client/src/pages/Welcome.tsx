import { NavLink } from "react-router-dom";
import Background from "../components/Background";
import Logo from "../components/Logo";

const Welcome = () => {
  return (
    <div className="flex items-center justify-center h-dvh px-5 py-10 position-relative">
      <Background />
      <div className="bg-white w-full max-w-[500px] lg:max-w-[1000px] lg:p-14 rounded-[15px] shadow-md p-10 flex flex-col lg:flex-row items-center lg:justify-between gap-6">
        <Logo />
        <div className="flex flex-col lg:max-w-[400px] items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <p className="text-gray">
              MoneyMap is your smart companion for tracking expenses and
              managing finances with ease. Stay in control of your money, set
              budgets, and visualize your spending patterns in one intuitive
              app.
              <br />
              <br />
            </p>
            <p className="text-gray font-semibold text-center">
              Sign up now or login to get started! 🚀
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
    </div>
  );
};

export default Welcome;
