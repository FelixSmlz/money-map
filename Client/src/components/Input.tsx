import { useId, useState } from "react";

interface InputProps {
  type: string;
  id: string;
  placeholder: string;
  className?: string;
  myOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMsg?: string[];
}

const Input = ({ type, id, placeholder, myOnChange, errorMsg }: InputProps) => {
  const [value, setValue] = useState("");
  const inputId = useId();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    if (typeof myOnChange === "function") {
      myOnChange(e);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <input
          name={inputId}
          type={type}
          id={id}
          placeholder=" "
          autoComplete="off"
          value={value}
          onChange={handleChange}
          className="peer w-full focus:outline-bg_black focus:outline p-4 border border-light_gray rounded-[15px]"
        />
        <label
          className={`absolute left-4 text-gray transform pointer-events-none transition-all duration-150 ${
            value
              ? "-translate-y-3 scale-[0.8] bg-white px-1"
              : "translate-y-4 scale-100"
          } peer-placeholder-shown:translate-y-4 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-[0.8] peer-focus:px-1 peer-focus:bg-white peer-focus:text-bg_black`}
          htmlFor={inputId}
        >
          {placeholder}
        </label>
      </div>
      {errorMsg &&
        errorMsg.map((msg, index) => (
          <small key={index} className="text-red">
            {msg}
          </small>
        ))}
    </div>
  );
};

export default Input;
