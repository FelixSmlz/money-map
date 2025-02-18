import { UseFormRegisterReturn } from "react-hook-form";
import { useState } from "react";

type Props = {
  type: string;
  id: string;
  value?: string;
  placeholder?: string;
  className?: string;
  errorMsg?: string | undefined;
  handler?: UseFormRegisterReturn;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
  type,
  id,
  className,
  value,
  placeholder,
  handler,
  errorMsg,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const hasValue = value || handler !== undefined;

  return (
    <div className="flex w-full flex-col gap-1.5">
      <div className="relative">
        <input
          type={isPassword && showPassword ? "text" : type}
          id={id}
          placeholder=" "
          step={type === "number" ? "0.01" : undefined}
          autoComplete="off"
          value={value}
          {...handler}
          className={`peer w-full focus:outline-bg_black p-3 border border-my_gray ${
            errorMsg ? "border-red" : ""
          } rounded-[15px] ${isPassword ? "pr-12" : ""} ${className}`}
        />
        <label
          className={`absolute left-4 text-my_gray transform pointer-events-none rounded-[15px] transition-all duration-150 ${
            hasValue
              ? "-translate-y-3 scale-[0.8] bg-white px-1"
              : "translate-y-3 scale-100"
          } peer-placeholder-shown:translate-y-3 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-[0.8] peer-focus:px-1 peer-focus:bg-white peer-focus:text-bg_black`}
          htmlFor={id}
        >
          {placeholder}
        </label>

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-my_gray hover:text-bg_black transition-colors"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
          </button>
        )}
      </div>
      {errorMsg && <small className="text-red">{errorMsg}</small>}
    </div>
  );
};

export default Input;
