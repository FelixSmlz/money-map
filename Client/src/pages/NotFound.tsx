import { NavLink } from "react-router-dom";
import Background from "../components/Background";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-dvh px-5 py-10 position-relative">
      <Background />
      <div className="bg-white w-full rounded-[15px] p-10 flex flex-col gap-8 justify-center items-center">
        <div>
          <h1 className="font-semibold text-[6rem] text-center">404</h1>
          <p className="text-lg text-center mt-[-1rem]">Page was not found</p>
        </div>
        <NavLink
          to=""
          className="bg-bg_black text-white hover:bg-white hover:text-bg_black border-bg_black border-2 p-3 w-full rounded-[15px] text-center"
        >
          Back to Home
        </NavLink>
      </div>
    </div>
  );
};

export default NotFound;
