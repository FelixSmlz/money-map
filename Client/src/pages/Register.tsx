import { useId } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ActionFunctionArgs, redirect, useFetcher } from "react-router";
import Background from "../components/Background";
import Input from "../components/Input";
import { register } from "../utils/api";
import { NavLink } from "react-router-dom";

type FieldValues = {
  name: string;
  email: string;
  password: string;
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

  const fetcher = useFetcher<typeof action>();

  const onValid: SubmitHandler<FieldValues> = (_, event) => {
    fetcher.submit(event?.target, {
      method: "POST",
    });
  };

  return (
    <div className="flex items-center justify-center h-dvh px-5 py-10 position-relative">
      <Background />
      <div className="bg-white w-full rounded-[15px] shadow-md p-10">
        <form
          noValidate
          onSubmit={handleSubmit(onValid)}
          className="flex flex-col gap-6"
        >
          <h1 className="text-bg_black font-medium text-lg">Register</h1>
          {fetcher.data && typeof fetcher.data === "string" ? (
            <h3 className="text-center text-red">{fetcher.data}</h3>
          ) : null}
          <div className="flex flex-col gap-4">
            <Input
              type="text"
              id={nameId}
              placeholder="name"
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
                minLength: {
                  value: 6,
                  message: "Password is too short (min. 6 characters)",
                },
                maxLength: {
                  value: 250,
                  message: "Password is too long (max. 250 characters)",
                },
              })}
              errorMsg={errors.password?.message}
            />
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
              placeholder="confirm password"
            />
          </div>
          <button
            type="submit"
            className="bg-bg_black hover:bg-white border-2 border-bg_black hover:text-bg_black text-white rounded-[15px] p-3 w-full"
          >
            Register
          </button>
          <NavLink
            className="text-bg_black font-medium hover:text-gray text-sm underline"
            to="../login"
          >
            Already registered?
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default Register;
