import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import editIcon from "../assets/icons/edit.svg";
import AddMenu from "../components/AddMenu";
import Avatar from "../components/Avatar";
import BackArrow from "../components/BackArrow";
import Background from "../components/Background";
import DataRow from "../components/DataRow";
import NotificationDropdown from "../components/NotificationMenu";
import UpdateModal from "../components/UpdateModal";
import { isLoggedIn } from "../utils/api";

export type UserType = {
  id: string;
  name: string;
  email: string;
  phone: string;
  profile_color: string;
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
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const renderColor = () => {
    return (
      <div className="flex gap-2 items-center">
        <div
          className="w-8 h-8 rounded-full"
          style={{ backgroundColor: user?.profile_color }}
        ></div>
      </div>
    );
  };

  return (
    <div className="px-5 max-w-[1024px] mx-auto py-10 position-relative">
      <Background />
      <header className="flex justify-between items-center mb-8 text-bg_black">
        <div className="flex items-center space-x-10">
          <BackArrow />
          <h1 className="text-lg text-bg_black font-semibold">My Profile</h1>
        </div>
        <NotificationDropdown />
      </header>
      <Avatar
        color={user?.profile_color}
        size="xl"
        className="mx-auto mb-6"
        name={user?.name}
      />
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col max-w-[500px] mx-auto gap-4 bg-white w-full p-5 rounded-[15px] shadow-sm">
          <DataRow label="Name" value={user?.name} />
          <DataRow label="Email" value={user?.email} />
          <DataRow label="Phone" value={user?.phone} />
          <DataRow label="Profile Color" value={renderColor()} />
        </div>
        <button
          onClick={() => setIsUpdateModalOpen(true)}
          className="bg-bg_black text-white p-4 shadow-md rounded-full"
        >
          <img src={editIcon} alt="edit" />
        </button>
      </div>
      <div className="lg:hidden">
        <AddMenu />
      </div>

      <UpdateModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        type="user"
        data={user}
      />
    </div>
  );
}

export default Profile;
