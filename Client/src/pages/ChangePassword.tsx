import { useForm } from "react-hook-form";
import { ActionFunctionArgs, useFetcher } from "react-router";
import BackArrow from "../components/BackArrow";
import Background from "../components/Background";
import Input from "../components/Input";
import PasswordRequirements from "../components/PasswordRequirements";
import { changePassword } from "../utils/api";

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
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const loaderData = useLoaderData<typeof loader>();
  // const user = loaderData?.user;

  const newPassword = watch("newPassword");

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
    <div className="min-h-dvh bg-bg_gray/5 flex flex-col">
      <div className="h-[72px] flex justify-between px-5 max-w-[1024px] mx-auto items-center w-full text-bg_black">
        <BackArrow />
      </div>

      <div className="flex-1 flex items-center max-w-[500px] mx-auto justify-center px-5 relative -mt-[36px]">
        <Background />
        <div className="bg-white/95 backdrop-blur-sm w-full rounded-[25px] shadow-xl p-10 animate-fadeIn">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-8"
          >
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-semibold text-bg_black">
                Change Password
              </h1>
              <p className="text-gray-600 text-sm">
                Please enter your current password and choose a new one
              </p>
            </div>

            {fetcher.data && (
              <div
                className={`p-4 rounded-xl text-center text-sm font-medium ${
                  fetcher.data === "Password changed successfully"
                    ? "bg-green/10 text-green border border-green/20"
                    : "bg-red/10 text-red border border-red/20"
                } animate-fadeIn`}
              >
                {fetcher.data}
              </div>
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

              <div className="border-t border-gray-100 my-2" />

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

              <div className="space-y-2">
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
                      value === watch("newPassword") ||
                      "Passwords do not match",
                  })}
                  errorMsg={errors.confirmPassword?.message}
                />
                <PasswordRequirements password={newPassword || ""} />
              </div>
            </div>

            <button
              type="submit"
              className="bg-bg_black hover:bg-white w-full border-2 border-bg_black text-white hover:text-bg_black rounded-[15px] p-4 font-medium transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
