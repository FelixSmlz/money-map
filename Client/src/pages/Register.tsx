import { useState } from "react";
import axios from "axios";
import Background from "../components/Background";
import NavMember from "../components/NavMember";
import Input from "../components/Input";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
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
        "http://localhost:8000/api/register",
        formData
      );
      window.location.href = "/verify-email";
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
          <h1 className="text-bg_black font-medium text-lg">Register</h1>
          <div className="flex flex-col gap-6">
            <Input
              type="text"
              id="name"
              placeholder="name"
              myOnChange={handleChange}
              errorMsg={validationErrors.name ?? ""}
            />
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
            <Input
              type="password"
              id="confirm_password"
              placeholder="confirm password"
              myOnChange={handleChange}
              errorMsg={validationErrors.confirm_password ?? ""}
            />
          </div>
          <button
            type="submit"
            className="bg-bg_black hover:bg-white hover:text-bg_black text-white rounded-[15px] p-3 w-full"
          >
            Register
          </button>
          <a
            href="/login"
            className="text-bg_black font-medium hover:text-gray text-sm underline"
          >
            Already registered?
          </a>
        </form>
      </div>
      <NavMember />
    </div>
  );
}

export default Register;
