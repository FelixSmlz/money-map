import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-fit h-dvh mx-auto flex flex-col gap-4 justify-center items-center">
      <div>
        <h1 className="font-semibold text-[5rem] text-center">404</h1>
        <p className="text-lg font-medium text-center">Page was not found</p>
      </div>
      <NavLink
        to=""
        className="bg-bg_black text-white hover:bg-white hover:text-bg_black border-bg_black border-2 p-3 w-full rounded-[15px] text-center"
      >
        Back to Home
      </NavLink>
    </div>
  );
};

export default NotFound;
