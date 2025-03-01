import { Link } from "react-router-dom";

export type EditBtnType = {
  title: string;
};

function EditBtn({ title }: EditBtnType) {
  return (
    <Link
      className="group hover:text-white hover:bg-bg_black bg-white rounded-[15px] flex items-center gap-2 py-3 px-6 shadow-card"
      to="/profile"
    >
      {title}
      <svg
        width="22"
        height="21"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.5 2H9.5C4.5 2 2.5 4 2.5 9V15C2.5 20 4.5 22 9.5 22H15.5C20.5 22 22.5 20 22.5 15V13"
          stroke="#171717"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="group-hover:stroke-white"
        />
        <path
          d="M16.5399 3.02001L8.65988 10.9C8.35988 11.2 8.05988 11.79 7.99988 12.22L7.56988 15.23C7.40988 16.32 8.17988 17.08 9.26988 16.93L12.2799 16.5C12.6999 16.44 13.2899 16.14 13.5999 15.84L21.4799 7.96001C22.8399 6.60001 23.4799 5.02001 21.4799 3.02001C19.4799 1.02001 17.8999 1.66001 16.5399 3.02001Z"
          stroke="#171717"
          stroke-width="2"
          strokeMiterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="group-hover:stroke-white"
        />
        <path
          d="M15.4099 4.15002C16.0799 6.54002 17.9499 8.41002 20.3499 9.09002"
          stroke="#171717"
          stroke-width="2"
          strokeMiterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="group-hover:stroke-white"
        />
      </svg>
    </Link>
  );
}

export default EditBtn;
