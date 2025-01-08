import { useState } from "react";

interface InputProps {
  type: string;
  id: string;
  className?: string;
  placeholder: string;
}

export default function Input({ type, id, placeholder }: InputProps) {
  const [value, setValue] = useState("");
  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <input
          type={type}
          id={id}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="peer w-full focus:outline-bg_black focus:outline p-4 border border-light_gray rounded-[15px]"
        />
        <label
          className={`absolute left-4 text-gray transform pointer-events-none translate-y-4 transition-all duration-150 ${
            value
              ? "-translate-y-3 scale-[0.8] bg-white px-1"
              : "translate-y-4 scale-100"
          } peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-[0.8] peer-focus:px-1 peer-focus:bg-white peer-focus:text-bg_black`}
          htmlFor={id}
        >
          {placeholder}
        </label>
      </div>
      <small className="text-red hidden">Error message example!</small>
    </div>
  );
}
