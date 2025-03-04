import { useId } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ActionFunctionArgs,
  NavLink,
  redirect,
  useFetcher,
} from "react-router-dom";
import Background from "../components/Background";
import Input from "../components/Input";
import { login } from "../utils/api";

type FieldValues = {
  email: string;
  password: string;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  try {
    const response = await login(formData);
    if (response.status === 200) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      return redirect("/dashboard");
    } else {
      return response.data.message;
    }
  } catch (error) {
    console.log("error", error);
    return { error: "An error occurred during login" };
  }
};

function Login() {
  const emailId = useId();
  const passwordId = useId();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const fetcher = useFetcher<typeof action>();

  const onValid: SubmitHandler<FieldValues> = (_, event) => {
    fetcher.submit(event?.target, { method: "POST" });
  };

  return (
    <div className="flex items-center justify-center min-h-dvh px-5 py-10 relative">
      <Background />
      <div className="bg-white/95 backdrop-blur-sm w-full max-w-[450px] rounded-[25px] shadow-xl lg:p-14 p-10 animate-fadeIn">
        <form
          noValidate
          onSubmit={handleSubmit(onValid)}
          className="flex flex-col gap-8"
        >
          <div className="space-y-2 text-center">
            <h1 className="text-bg_black font-semibold text-2xl">
              Welcome Back
            </h1>
            <p className="text-gray-600 text-sm">
              Sign in to continue managing your finances
            </p>
          </div>

          {fetcher.data && typeof fetcher.data === "string" ? (
            <div className="bg-red/10 border border-red/20 rounded-xl p-4 text-center">
              <span className="text-red text-sm">{fetcher.data}</span>
            </div>
          ) : null}

          <div className="flex flex-col gap-4">
            <Input
              type="email"
              id={emailId}
              placeholder="email"
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
            <Input
              type="password"
              id={passwordId}
              placeholder="password"
              handler={register("password", {
                required: { value: true, message: "Password is required" },
              })}
              errorMsg={errors.password?.message}
            />
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              className="bg-bg_black hover:bg-white w-full border-2 border-bg_black text-white hover:text-bg_black rounded-[15px] p-4 font-medium transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Login
            </button>

            <div className="text-center">
              <NavLink
                className="text-gray-600 hover:text-bg_black text-sm transition-colors inline-flex items-center gap-1"
                to="../register"
              >
                Don't have an account?{" "}
                <span className="font-medium text-bg_black hover:text-turkois">
                  Register →
                </span>
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
