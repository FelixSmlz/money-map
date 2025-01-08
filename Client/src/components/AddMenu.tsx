import { useState } from "react";

function AddMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {isMenuOpen && (
        <>
          <div className="bg-bg_black opacity-40 fixed top-0 left-0 w-full h-full z-5"></div>
          <div className="bg-white z-10 fixed bottom-[125px] right-[50px] shadow-md rounded-[15px]">
            <ul className="flex flex-col">
              <li>
                <a
                  className="px-5 py-3 block hover:text-white hover:bg-bg_black cursor-pointer first:rounded-t-[15px]"
                  href=""
                >
                  Transaction
                </a>
              </li>
              <li>
                <a
                  className="px-5 py-3 block hover:text-white hover:bg-bg_black cursor-pointer"
                  href=""
                >
                  Budget
                </a>
              </li>
              <li className="">
                <a
                  className="px-5 py-3 block hover:text-white hover:bg-bg_black cursor-pointer"
                  href=""
                >
                  Goal
                </a>
              </li>
              <li className=" ">
                <a
                  className="px-5 py-3 block hover:text-white hover:bg-bg_black cursor-pointer last:rounded-b-[15px]"
                  href=""
                >
                  Category
                </a>
              </li>
            </ul>
          </div>
        </>
      )}
      <button
        className="bg-bg_black shadow-card fixed bottom-[6rem] right-0 mr-5 p-4 flex justify-center items-center z-10 rounded-full text-white group hover:bg-white"
        onClick={toggleMenu}
      >
        <svg
          fill="none"
          height="28"
          viewBox="0 0 28 28"
          width="28"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            className="group-hover:stroke-bg_black"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
          >
            <path d="m2.38672 14h23.22578" />
            <path d="m14 25.6129v-23.22582" />
          </g>
        </svg>
      </button>
    </>
  );
}

export default AddMenu;
