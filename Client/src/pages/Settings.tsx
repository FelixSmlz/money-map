import Background from "../components/Background";
import EditBtn from "../components/EditBtn";
import AddMenu from "../components/AddMenu";
import DeleteProfileBtn from "../components/DeleteProfileBtn";
import LogoutBtn from "../components/LogoutBtn";
import { isLoggedIn, toggleNotifications } from "../utils/api";
import { useLoaderData } from "react-router-dom";
import Avatar from "../components/Avatar";
import NotificationMenu from "../components/NotificationMenu";
import { ActionFunctionArgs, useFetcher } from "react-router";
import { logout, deleteProfile } from "../utils/api";
import { redirect } from "react-router-dom";
import NotificationSwitch from "../components/NotificationSwitch";
import ChangePasswordBtn from "../components/ChangePasswordBtn";
import FeedbackBtn from "../components/FeedbackBtn";

export const loader = async () => {
  const { user } = await isLoggedIn();
  if (user) {
    return { user };
  }
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = formData.get("intent");

  switch (intent) {
    case "logout":
      const logoutResponse = await logout();
      if (logoutResponse.status === 200) {
        return redirect("/guest/login");
      }
      break;

    case "deleteProfile":
      const deleteResponse = await deleteProfile();
      if (deleteResponse.status === 200) {
        return redirect("/guest/login");
      }
      break;

    case "toggleNotifications":
      const toggleResponse = await toggleNotifications();
      if (toggleResponse.status === 200) {
        return redirect("/settings");
      }
      break;

    default:
      return { error: "Invalid intent" };
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
        <NotificationMenu />
      </header>
      <div className="flex flex-col gap-5 items-center">
        <div className="flex items-center gap-5 mb-6">
          <Avatar name={user?.name} size="lg" />
          <div className="flex flex-col gap-2">
            <p className="text-lg">{user?.name}</p>
            <small className="text-base text-gray font-light">
              {user?.email}
            </small>
          </div>
        </div>
      </div>
      <div className="flex mt-6 flex-col p-3 bg-white rounded-[15px] shadow-md w-full">
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
          <NotificationSwitch enabled={user?.notifications_enabled} />
        </div>
        <FeedbackBtn />
        <ChangePasswordBtn />
        <DeleteProfileBtn />
        <LogoutBtn />
      </div>
      <AddMenu />
    </div>
  );
}

export default Settings;
