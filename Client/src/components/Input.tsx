import { UseFormRegisterReturn } from "react-hook-form";

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
  const hasValue = value || handler !== undefined;

  return (
    <div className="flex w-full flex-col gap-1.5">
      <div className="relative">
        <input
          type={type}
          id={id}
          placeholder=" "
          autoComplete="off"
          value={value}
          {...handler}
          className={`peer w-full focus:outline-bg_black p-3 border border-my_gray ${
            errorMsg ? "border-red" : ""
          } rounded-[15px] ${className}`}
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
      </div>
      {errorMsg && <small className="text-red">{errorMsg}</small>}
    </div>
  );
};

export default Input;
