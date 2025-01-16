import { useFetcher } from "react-router-dom";

const LogoutBtn = () => {
  const fetcher = useFetcher();
  const handleLogout = () => {
    fetcher.submit({ intent: "logout" }, { method: "POST" });
  };

  return (
    <div
      onClick={handleLogout}
      className="flex items-center gap-4 mx-4 py-4 cursor-pointer"
    >
      <div className="bg-[#FAEBEB] w-fit p-2 rounded-[15px]">
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.40039 8.17999C9.71039 4.57999 11.5604 3.10999 15.6104 3.10999H15.7404C20.2104 3.10999 22.0004 4.89999 22.0004 9.36999V15.89C22.0004 20.36 20.2104 22.15 15.7404 22.15H15.6104C11.5904 22.15 9.74039 20.7 9.41039 17.16"
            stroke="#FF0051"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15.5001 12.62H4.12012"
            stroke="#FF0051"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6.35 9.27002L3 12.62L6.35 15.97"
            stroke="#FF0051"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <p className="text-red text-base h-fit mr-auto">Logout</p>
    </div>
  );
};

export default LogoutBtn;
