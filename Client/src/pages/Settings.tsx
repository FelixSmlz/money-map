import Background from "../components/Background";
import EditBtn from "../components/EditBtn";
import Switch from "../components/Switch";
import AddMenu from "../components/AddMenu";
import DeleteProfileBtn from "../components/DeleteProfileBtn";
import LogoutBtn from "../components/LogoutBtn";
import Nav from "../components/Nav";
import { isLoggedIn } from "../utils/api";
import { useLoaderData } from "react-router-dom";
import ConfirmWindow from "../components/ConfirmWindow";

export const loader = async () => {
  const { user } = await isLoggedIn();
  if (user) {
    return { user };
  }
};

function Settings() {
  const data = useLoaderData<typeof loader>();
  const user = data?.user;
  return (
    <div className="px-5 py-10 position-relative">
      <Background />
      <header className="flex justify-between items-center mb-8 text-bg_black">
        <div className="flex items-center space-x-4">
          <a href="/settings" className="text-lg text-bg_black font-semibold">
            Settings
          </a>
        </div>
        <a
          className="group bg-white hover:bg-bg_black p-2 rounded-full"
          href="/notifications"
        >
          <svg
            fill="none"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              className="group-hover:stroke-white"
              stroke="#1A1B1C"
              strokeMiterlimit="10"
              strokeWidth="1.75"
            >
              <path
                d="m12.02 2.91003c-3.31003 0-6.00003 2.69-6.00003 6v2.88997c0 .61-.26 1.54-.57 2.06l-1.15 1.91c-.71 1.18-.22 2.49 1.08 2.93 4.31 1.44 8.96003 1.44 13.27003 0 1.21-.4 1.74-1.83 1.08-2.93l-1.15-1.91c-.3-.52-.56-1.45-.56-2.06v-2.88997c0-3.3-2.7-6-6-6z"
                strokeLinecap="round"
              />
              <path
                d="m13.87 3.19994c-.31-.09-.63-.16-.96-.2-.96-.12-1.88-.05-2.74.2.29-.74 1.01-1.26 1.85-1.26s1.56.52 1.85 1.26z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="m15.02 19.0601c0 1.65-1.35 3-3 3-.82 0-1.58-.34-2.11998-.88-.54-.54-.88-1.3-.88-2.12" />
            </g>
          </svg>
        </a>
      </header>
      <div className="flex flex-col gap-5 items-center">
        <img
          className="rounded-full w-[125px] h-[125px] object-cover shadow-card"
          src="/images/profile_picture.jpeg"
          alt="Profile picture"
        />
        <div>
          <p className="text-center">{user?.name}</p>
          <small className="text-center text-xs text-gray font-light">
            {user?.email}
          </small>
        </div>
        <EditBtn />
      </div>
      <div className="flex mt-6 flex-col bg-white rounded-[15px] shadow-card w-full">
        <div className="flex items-center gap-4 mx-4 py-4 border-b border-light_gray">
          <div className="bg-[#F2F2F2] w-fit p-2 rounded-[15px]">
            <svg
              fill="none"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g stroke="#171717" strokeMiterlimit="10" stroke-width="1.75">
                <path
                  d="m12.02 2.91003c-3.31003 0-6.00003 2.69-6.00003 6v2.88997c0 .61-.26 1.54-.57 2.06l-1.15 1.91c-.71 1.18-.22 2.49 1.08 2.93 4.31 1.44 8.96003 1.44 13.27003 0 1.21-.4 1.74-1.83 1.08-2.93l-1.15-1.91c-.3-.52-.56-1.45-.56-2.06v-2.88997c0-3.3-2.7-6-6-6z"
                  stroke-linecap="round"
                />
                <path
                  d="m13.87 3.19994c-.31-.09-.63-.16-.96-.2-.96-.12-1.88-.05-2.74.2.29-.74 1.01-1.26 1.85-1.26s1.56.52 1.85 1.26z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path d="m15.02 19.0601c0 1.65-1.35 3-3 3-.82 0-1.58-.34-2.11998-.88-.54-.54-.88-1.3-.88-2.12" />
              </g>
            </svg>
          </div>
          <p className="text-bg_black text-base h-fit mr-auto">Notification</p>
          <Switch />
        </div>
        <a
          href="#"
          className="flex items-center gap-4 mx-4 py-4 border-b border-light_gray"
        >
          <div className="bg-[#F2F2F2] w-fit p-2 rounded-[15px]">
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.0156 19.05H13.0156L8.56561 22.01C7.90561 22.45 7.01562 21.98 7.01562 21.18V19.05C4.01562 19.05 2.01562 17.05 2.01562 14.05V8.04993C2.01562 5.04993 4.01562 3.04993 7.01562 3.04993H17.0156C20.0156 3.04993 22.0156 5.04993 22.0156 8.04993V14.05C22.0156 17.05 20.0156 19.05 17.0156 19.05Z"
                stroke="#171717"
                stroke-width="1.5"
                strokeMiterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.0154 11.98V11.77C12.0154 11.09 12.4355 10.73 12.8555 10.44C13.2655 10.16 13.6754 9.80001 13.6754 9.14001C13.6754 8.22001 12.9354 7.47998 12.0154 7.47998C11.0954 7.47998 10.3555 8.22001 10.3555 9.14001"
                stroke="#171717"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.0107 14.37H12.0197"
                stroke="#171717"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <p className="text-bg_black text-base h-fit mr-auto">Feedback</p>
          <svg
            width="25"
            height="22"
            viewBox="0 0 19 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.6872 7.61997C10.6872 9.61299 8.65259 11.2237 6.13509 11.2237C3.61759 11.2237 1.58301 9.61299 1.58301 7.61997C1.58301 5.62695 3.61759 4.01624 6.13509 4.01624"
              stroke="#171717"
              stroke-width="1.75"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.91699 7.61991C7.91699 5.54542 10.0466 3.8595 12.667 3.8595C15.2874 3.8595 17.417 5.54542 17.417 7.61991C17.417 9.69441 15.2874 11.3803 12.667 11.3803"
              stroke="#171717"
              stroke-width="1.75"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
        <DeleteProfileBtn />
        <LogoutBtn />
      </div>
      <AddMenu />
    </div>
  );
}

export default Settings;
