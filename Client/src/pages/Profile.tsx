import Background from "../components/Background";
import Nav from "../components/Nav";
import AddMenu from "../components/AddMenu";
import Input from "../components/Input";
import { useId } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ActionFunctionArgs, redirect, useFetcher } from "react-router";
import { useLoaderData } from "react-router-dom";
import { isLoggedIn, updateProfile } from "../utils/api";
import NotificationDropdown from "../components/NotificationMenu";

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
  const nameId = useId();
  const emailId = useId();

  const data = useLoaderData<typeof loader>();
  const user = data?.user;

  const {
    register,
    formState: { errors },
  } = useForm<FieldValues>({});

  const onValid: SubmitHandler<FieldValues> = async (data) => {};

  return (
    <div className="px-5 py-10 position-relative">
      <Background />
      <header className="flex justify-between items-center mb-8 text-bg_black">
        <div className="flex items-center space-x-4">
          <a href="/profile" className="text-lg text-bg_black font-semibold">
            Profile
          </a>
        </div>
        <NotificationDropdown />
      </header>
      <div className="flex flex-col gap-5 items-center">
        <img
          className="rounded-full w-[125px] h-[125px] object-cover shadow-card"
          src="/images/profile_picture.jpeg"
          alt="Profile picture"
        />
      </div>
      <form
        noValidate
        className="flex flex-col gap-4 bg-white w-full px-2 py-4 rounded-[15px] shadow-sm"
      >
        <Input
          value={user?.name}
          type="text"
          id={nameId}
          placeholder="name"
          className="border-none"
          handler={register("name", {
            required: { value: true, message: "Name is required" },
            maxLength: {
              value: 250,
              message: "Name is too long (max. 250 characters)",
            },
          })}
          errorMsg={errors.name?.message}
        />
        <Input
          value={user?.email}
          type="email"
          id={emailId}
          placeholder="email"
          className="border-none"
          handler={register("email", {
            required: { value: true, message: "Email is required" },
            maxLength: {
              value: 250,
              message: "Email is too long (max. 250 characters)",
            },
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
              message: "Email is invalid",
            },
          })}
          errorMsg={errors.email?.message}
        />

        <button
          type="submit"
          className="bg-bg_black hover:bg-white border-2 border-bg_black hover:text-bg_black text-white rounded-[15px] p-3 w-full"
        >
          Save changes
        </button>
      </form>
      <Nav />
      <AddMenu />
    </div>
  );
}

export default Profile;
