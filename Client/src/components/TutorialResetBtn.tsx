import { useNavigate, useLoaderData } from "react-router-dom";
import { loader } from "../pages/Settings";

const TutorialResetBtn = () => {
  const navigate = useNavigate();
  const data = useLoaderData<typeof loader>();
  const user = data?.user;

  const handleReset = () => {
    if (user?.id) {
      localStorage.removeItem(`hasSeenTutorial_${user.id}`);

      window.location.href = "/dashboard";
    }
  };

  return (
    <button
      onClick={handleReset}
      className="w-full flex  border-b items-center gap-4 p-4 hover:bg-bg_gray/5 
        transition-colors  group"
      type="button"
    >
      <div
        className="bg-[#F2F2F2] p-3 rounded-[15px] transition-colors 
        group-hover:bg-bg_black"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 8V12L14 14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
            className="stroke-bg_black group-hover:stroke-white transition-colors"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="flex flex-col">
        <p className="text-bg_black text-left font-medium">Reset Tutorial</p>
        <span className="text-my_gray text-sm">
          Start the dashboard tutorial again
        </span>
      </div>
    </button>
  );
};

export default TutorialResetBtn;
