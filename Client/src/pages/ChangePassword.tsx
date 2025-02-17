import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { ActionFunctionArgs, useFetcher } from "react-router";
import Background from "../components/Background";
import { changePassword } from "../utils/api";
import DesktopNav from "../components/DesktopNav";
import { useState } from "react";
import { useLoaderData } from "react-router";
import { loader } from "./Dashboard";
import BackArrow from "../components/BackArrow";

type PasswordFormInputs = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    const response = await changePassword(formData);

    if (response.status === 200) {
      return "Password changed successfully";
    }

    return response.data?.error || "Failed to change password";
  } catch (error: any) {
    console.error("Action error:", error);
    return error.response?.data?.error || "Failed to change password";
  }
};

const ChangePassword = () => {
  const fetcher = useFetcher<typeof action>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordFormInputs>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const loaderData = useLoaderData<typeof loader>();
  const user = loaderData?.user;

  const onSubmit = (data: PasswordFormInputs) => {
    const formData = new FormData();

    formData.append("oldPassword", data.oldPassword);
    formData.append("newPassword", data.newPassword);

    fetcher.submit(formData, {
      method: "POST",
      action: "/change-password",
    });
  };

  return (
    <>
      <div className="flex justify-between py-10 px-5 max-w-[1024px] mx-auto items-center w-full text-bg_black">
        <BackArrow />
      </div>
      <div className="flex items-center max-w-[500px] mx-auto justify-center h-dvh px-5 py-10 position-relative">
        <Background />
        <div className="bg-white w-full rounded-[15px] shadow-md p-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-6"
          >
            <h1 className="text-bg_black text-center font-medium text-lg">
              Change your Password
            </h1>

            {fetcher.data && (
              <h3
                className={`text-center ${
                  fetcher.data === "Password changed successfully"
                    ? "text-green"
                    : "text-red"
                }`}
              >
                {fetcher.data}
              </h3>
            )}

            <div className="flex flex-col gap-4">
              <Input
                type="password"
                id="oldPassword"
                placeholder="Current Password"
                handler={register("oldPassword", {
                  required: {
                    value: true,
                    message: "Current password is required",
                  },
                })}
                errorMsg={errors.oldPassword?.message}
              />

              <Input
                type="password"
                id="newPassword"
                placeholder="New Password"
                handler={register("newPassword", {
                  required: {
                    value: true,
                    message: "New password is required",
                  },
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                errorMsg={errors.newPassword?.message}
              />

              <Input
                type="password"
                id="confirmPassword"
                placeholder="Confirm New Password"
                handler={register("confirmPassword", {
                  required: {
                    value: true,
                    message: "Please confirm your password",
                  },
                  validate: (value) =>
                    value === watch("newPassword") || "Passwords do not match",
                })}
                errorMsg={errors.confirmPassword?.message}
              />
            </div>

            <button
              type="submit"
              className="bg-bg_black hover:bg-white border border-bg_black hover:text-bg_black text-white rounded-[15px] p-3 w-full transition-colors"
            >
              Change Password
            </button>
          </form>
        </div>
        <DesktopNav
          onClose={() => setIsSidebarOpen(false)}
          isOpen={isSidebarOpen}
          user={user?.name}
          userFirstName={user?.name.split(" ")[0]}
        />
      </div>
    </>
  );
};

export default ChangePassword;
