import { useId } from "react";
import Background from "../components/Background";
import Input from "../components/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  ActionFunctionArgs,
  useFetcher,
  redirect,
  NavLink,
} from "react-router-dom";
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
    <div className="flex items-center justify-center h-dvh px-5 py-10 position-relative">
      <Background />
      <div className="bg-white w-full rounded-[15px] shadow-md p-10">
        <form
          noValidate
          onSubmit={handleSubmit(onValid)}
          className="flex flex-col gap-6"
        >
          <h1 className="text-bg_black font-medium text-lg">Login</h1>
          {fetcher.data && typeof fetcher.data === "string" ? (
            <h3 className="text-center text-red">{fetcher.data}</h3>
          ) : null}
          <div className="flex flex-col gap-4">
            <Input
              type="email"
              id={emailId}
              value=""
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
              value=""
              placeholder="password"
              handler={register("password", {
                required: { value: true, message: "Password is required" },
              })}
              errorMsg={errors.password?.message}
            />
          </div>
          <button
            type="submit"
            className="bg-bg_black hover:bg-white border-2 border-bg_black hover:text-bg_black text-white rounded-[15px] p-3 w-full"
          >
            Login
          </button>
          <NavLink
            className="text-bg_black font-medium hover:text-gray text-sm underline"
            to="../register"
          >
            Not registered yet?
          </NavLink>
        </form>
      </div>
    </div>
  );
}

export default Login;
