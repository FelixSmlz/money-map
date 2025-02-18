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
    <div className="min-h-dvh bg-bg_gray/5 px-5 max-w-[1024px] mx-auto py-10 relative">
      <Background />
      <header className="flex justify-between items-center mb-12 text-bg_black">
        <div className="flex items-center space-x-10">
          <BackArrow />
          <h1 className="text-lg text-bg_black font-semibold">My Profile</h1>
        </div>
        <NotificationDropdown />
      </header>

      <div className="flex flex-col items-center gap-8 animate-fadeIn">
        {/* Profile Header Card */}
        <div className="bg-white/95 backdrop-blur-sm p-8 rounded-[25px] w-full max-w-[500px] shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5">
          <div className="flex flex-col items-center gap-4">
            <Avatar
              color={user?.profile_color}
              size="xl"
              className="mx-auto"
              name={user?.name}
            />
            <p className="text-my_gray text-sm uppercase tracking-wider">
              Profile
            </p>
            <p className="text-2xl font-semibold text-bg_black">{user?.name}</p>
          </div>
        </div>

        {/* Details Card */}
        <div className="flex flex-col w-full max-w-[500px] bg-white/95 backdrop-blur-sm p-8 rounded-[25px] shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[1.75rem] font-semibold text-bg_black">
              Details
            </h2>
            <button
              onClick={() => setIsUpdateModalOpen(true)}
              className="bg-bg_black hover:bg-white text-white hover:text-bg_black p-3 rounded-full shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-bg_black group"
            >
              <img
                src={editIcon}
                alt="edit"
                className="w-5 h-5 transition-all duration-300 group-hover:scale-110 group-hover:invert"
              />
            </button>
          </div>

          <div className="space-y-6">
            <DataRow label="name" value={user?.name} />
            <DataRow label="email" value={user?.email} />
            <DataRow label="phone" value={user?.phone} />
            <DataRow label="profile color" value={renderColor()} />
          </div>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-6 right-6">
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
