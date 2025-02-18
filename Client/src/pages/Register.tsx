import { useId } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ActionFunctionArgs, redirect, useFetcher } from "react-router";
import { NavLink } from "react-router-dom";
import Background from "../components/Background";
import Input from "../components/Input";
import { register } from "../utils/api";
import PasswordRequirements from "../components/PasswordRequirements";

type FieldValues = {
  name: string;
  email: string;
  password: string;
  phone: string;
  confirmPassword: string;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  try {
    const response = await register(formData);
    if (response.status === 200) {
      return redirect("../login");
    } else {
      return response.data.message;
    }
  } catch (error) {
    console.log("error", error);
    return { error: "An error occurred" };
  }
};

const Register = () => {
  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const confirmPasswordId = useId();

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const password = watch("password");

  const fetcher = useFetcher<typeof action>();

  const onValid: SubmitHandler<FieldValues> = (_, event) => {
    fetcher.submit(event?.target, {
      method: "POST",
    });
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
              Create an Account
            </h1>
            <p className="text-gray-600 text-sm">
              Join MoneyMap to start managing your finances
            </p>
          </div>

          {fetcher.data && typeof fetcher.data === "string" ? (
            <div className="bg-red/10 border border-red/20 rounded-xl p-4 text-center">
              <span className="text-red text-sm">{fetcher.data}</span>
            </div>
          ) : null}
          <div className="flex flex-col gap-4">
            <Input
              type="text"
              id={nameId}
              placeholder="name*"
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
              type="email"
              id={emailId}
              placeholder="email*"
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
              placeholder="password*"
              handler={register("password", {
                required: { value: true, message: "Password is required" },
                minLength: {
                  value: 6,
                  message: "Password is too short (min. 6 characters)",
                },
                maxLength: {
                  value: 250,
                  message: "Password is too long (max. 250 characters)",
                },
                pattern: {
                  value: /^(?=.*\d)/,
                  message: "Password must contain at least one number",
                },
              })}
              errorMsg={errors.password?.message}
            />
            <div className="space-y-2">
              <Input
                type="password"
                id={confirmPasswordId}
                handler={register("confirmPassword", {
                  required: {
                    value: true,
                    message: "Confirm your password",
                  },
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                errorMsg={errors.confirmPassword?.message}
                placeholder="confirm password*"
              />
              {password && <PasswordRequirements password={password} />}
            </div>
          </div>
          <div className="space-y-4">
            <button
              type="submit"
              className="bg-bg_black hover:bg-white w-full border-2 border-bg_black text-white hover:text-bg_black rounded-[15px] p-4 font-medium transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Create Account
            </button>

            <div className="text-center">
              <NavLink
                className="text-gray-600 hover:text-bg_black text-sm transition-colors inline-flex items-center gap-1"
                to="../login"
              >
                Already have an account?{" "}
                <span className="font-medium text-bg_black hover:text-turkois">
                  Login →
                </span>
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
