import { NavLink } from "react-router-dom";
import Background from "../components/Background";
import Logo from "../components/Logo";

const Welcome = () => {
  return (
    <div className="flex items-center justify-center min-h-dvh px-5 py-10 relative">
      <Background />
      <div className="bg-white/95 backdrop-blur-sm w-full max-w-[500px] lg:max-w-[1000px] rounded-[25px] shadow-xl p-10 lg:p-16 flex flex-col lg:flex-row items-center lg:justify-between gap-10 lg:gap-16 animate-fadeIn">
        <div className="lg:w-1/2 flex justify-center transform hover:scale-105 transition-transform duration-300">
          <Logo />
        </div>

        <div className="flex flex-col lg:w-1/2 items-center gap-8">
          <div className="flex flex-col items-center gap-6 text-center">
            <h1 className="text-3xl font-bold text-bg_black">
              Welcome to MoneyMap
            </h1>

            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                MoneyMap is your smart companion for tracking expenses and
                managing finances with ease. Stay in control of your money, set
                budgets, and visualize your spending patterns in one intuitive
                app.
              </p>

              <p className="text-bg_black font-semibold">
                Sign up now or login to get started! 🚀
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full max-w-[300px]">
            <NavLink
              to="/guest/login"
              className="bg-bg_black text-white hover:bg-white hover:text-bg_black border-2 border-bg_black rounded-[15px] p-4 text-center font-medium transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Login
            </NavLink>
            <NavLink
              to="/guest/register"
              className="bg-white text-bg_black hover:bg-bg_black hover:text-white border-2 border-bg_black rounded-[15px] p-4 text-center font-medium transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
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
