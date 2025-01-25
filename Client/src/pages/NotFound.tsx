import { NavLink } from "react-router-dom";
import Background from "../components/Background";
import notFound from "../assets/icons/not_found.svg";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-dvh px-5 py-10 position-relative">
      <Background />
      <div className="bg-white w-full rounded-[15px] p-10 flex flex-col gap-8 justify-center items-center">
        <div className="flex flex-col items-center">
          <h1 className="text-bg_black font-semibold text-[4rem]">oops!</h1>
          <p className="text-center text-base text-gray mb-8">
            The page you are looking for does not exist.
          </p>
          <img className="w-[175px]" src={notFound} alt="Not found" />
        </div>
        <NavLink
          to="/dashboard"
          className="bg-bg_black text-white hover:bg-white hover:text-bg_black border-bg_black border-2 p-3 w-full rounded-[15px] text-center"
        >
          Back to Home
        </NavLink>
      </div>
    </div>
  );
};

export default NotFound;
