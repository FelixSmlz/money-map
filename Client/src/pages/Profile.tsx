import Background from "../components/Background";
import Nav from "../components/Nav";
import AddMenu from "../components/AddMenu";
import Input from "../components/Input";
import { useId } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import { isLoggedIn, updateProfile } from "../utils/api";
import NotificationDropdown from "../components/NotificationMenu";
import DataRow from "../components/DataRow";
import Avatar from "../components/Avatar";
import BackArrow from "../components/BackArrow";

type FieldValues = {
  name: string;
  email: string;
  password: string;
};

export const loader = async () => {
  const { user } = await isLoggedIn();
  if (user) {
    return { user };
  }
};

function Profile() {
  const data = useLoaderData<typeof loader>();
  const user = data?.user;

  return (
    <div className="px-5 py-10 position-relative">
      <Background />
      <header className="flex justify-between items-center mb-8 text-bg_black">
        <div className="flex items-center space-x-4">
          <BackArrow />
          <h1 className="text-lg text-bg_black font-semibold">My Profile</h1>
        </div>
        <NotificationDropdown />
      </header>
      <Avatar size="xl" className="mx-auto mb-6" name={user?.name} />
      <div className="flex flex-col gap-4 bg-white w-full p-5 rounded-[15px] shadow-sm">
        <DataRow label="Name" value={user?.name} />
        <DataRow label="Email" value={user?.email} />
      </div>
      <Nav />
      <AddMenu />
    </div>
  );
}

export default Profile;
