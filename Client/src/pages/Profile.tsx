import Background from "../components/Background";
import Nav from "../components/Nav";
import AddMenu from "../components/AddMenu";
import Input from "../components/Input";
import { useId } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ActionFunctionArgs, redirect, useFetcher } from "react-router";
import { useLoaderData } from "react-router-dom";
import { isLoggedIn, updateProfile } from "../utils/api";

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
  const passwordId = useId();

  const data = useLoaderData<typeof loader>();
  const user = data?.user;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const fetcher = useFetcher<typeof action>();

  const onValid: SubmitHandler<FieldValues> = (_, event) => {
    fetcher.submit(event?.target, {
      method: "PUT",
    });
  };

  return (
    <div className="px-5 py-10 position-relative">
      <Background />
      <header className="flex justify-between items-center mb-8 text-bg_black">
        <div className="flex items-center space-x-4">
          <a href="/profile" className="text-lg text-bg_black font-semibold">
            Profile
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
      </div>
      <form
        noValidate
        onSubmit={handleSubmit(onValid)}
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
