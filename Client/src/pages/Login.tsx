import { useState } from "react";
import axios from "axios";
import Background from "../components/Background";
import Input from "../components/Input";
import NavMember from "../components/NavMember";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string[];
  }>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        formData
      );
      window.location.href = "/";
    } catch (error: any) {
      if (error.response && error.response.data) {
        setValidationErrors(error.response.data.errors);
      }
    }
  }

  return (
    <div className="flex items-center justify-center h-dvh px-5 py-10 position-relative">
      <Background />
      <div className="bg-white w-full rounded-[15px] shadow-card p-10">
        <form
          noValidate
          action="POST"
          onSubmit={handleSubmit}
          className="flex flex-col gap-8"
        >
          <h1 className="text-bg_black font-medium text-lg">Login</h1>
          <div className="flex flex-col gap-6">
            <Input
              type="email"
              id="email"
              placeholder="email"
              myOnChange={handleChange}
              errorMsg={validationErrors.email ?? ""}
            />
            <Input
              type="password"
              id="password"
              placeholder="password"
              myOnChange={handleChange}
              errorMsg={validationErrors.password ?? ""}
            />
          </div>
          <button
            type="submit"
            className="bg-bg_black hover:bg-white hover:text-bg_black text-white rounded-[15px] p-3 w-full"
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
      <NavMember />
    </div>
  );
}

export default Login;
