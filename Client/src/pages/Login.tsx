import { useId } from "react";
import Background from "../components/Background";
import Input from "../components/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { ActionFunctionArgs, useFetcher, redirect } from "react-router-dom";
import { login } from "../utils/api";

type FieldValues = {
  email: string;
  password: string;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  console.log(request);
  const formData = await request.formData();
  try {
    await login(formData);
    return redirect("/");
  } catch (error) {
    console.log("error", error);
    return redirect("/login");
  }
};

function Login() {
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // });

  // const [validationErrors, setValidationErrors] = useState<{
  //   [key: string]: string[];
  // }>({});

  // function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   setFormData({ ...formData, [e.target.id]: e.target.value });
  // }

  // async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8000/api/login",
  //       formData
  //     );
  //     window.location.href = "/";
  //   } catch (error: any) {
  //     if (error.response && error.response.data) {
  //       setValidationErrors(error.response.data.errors);
  //     }
  //   }
  // }

  const emailId = useId();
  const passwordId = useId();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const fetcher = useFetcher();

  const onValid: SubmitHandler<FieldValues> = (_, event) => {
    fetcher.submit(event?.target, { method: "POST" });
  };

  return (
    <div className="flex items-center justify-center h-dvh px-5 py-10 position-relative">
      <Background />
      <div className="bg-white w-full rounded-[15px] shadow-card p-10">
        <form
          noValidate
          onSubmit={handleSubmit(onValid)}
          className="flex flex-col gap-8"
        >
          <h1 className="text-bg_black font-medium text-lg">Login</h1>
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
          <button
            type="submit"
            className="bg-bg_black hover:bg-white border-2 border-bg_black hover:text-bg_black text-white rounded-[15px] p-3 w-full"
          >
            Login
          </button>
          <a
            href="/register"
            className="text-bg_black font-medium hover:text-gray text-sm underline"
          >
            Not registered yet?
          </a>
        </form>
      </div>
    </div>
  );
}

export default Login;
