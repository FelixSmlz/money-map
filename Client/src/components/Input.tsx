// import { useId, useState } from "react";
// import { UseFormRegisterReturn } from "react-hook-form";

// type Props = {
//   type: string;
//   id: string;
//   placeholder: string;
//   errorMsg: string[];
//   handler: UseFormRegisterReturn;
// };

// const Input = ({ type, id, placeholder, handler, errorMsg }: Props) => {
//   const [value, setValue] = useState("");
//   const inputId = useId();

//   return (
//     <div className="flex flex-col gap-3">
//       <div className="relative">
//         <input
//           type={type}
//           id={id}
//           placeholder=" "
//           autoComplete="off"
//           value={value}
//           {...handler}
//           className="peer w-full focus:outline-bg_black focus:outline p-4 border border-light_gray rounded-[15px]"
//         />
//         <label
//           className={`absolute left-4 text-gray transform pointer-events-none transition-all duration-150 ${
//             value
//               ? "-translate-y-3 scale-[0.8] bg-white px-1"
//               : "translate-y-4 scale-100"
//           } peer-placeholder-shown:translate-y-4 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-[0.8] peer-focus:px-1 peer-focus:bg-white peer-focus:text-bg_black`}
//           htmlFor={inputId}
//         >
//           {placeholder}
//         </label>
//       </div>
//       {errorMsg &&
//         errorMsg.map((msg, index) => (
//           <small key={index} className="text-red">
//             {msg}
//           </small>
//         ))}
//     </div>
//   );
// };

// export default Input;
import { useId, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  type: string;
  id: string;
  placeholder: string;
  errorMsg: string | undefined;
  handler: UseFormRegisterReturn;
};

const Input = ({ type, id, placeholder, handler, errorMsg }: Props) => {
  const [value, setValue] = useState("");
  const inputId = useId();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    if (handler.onChange) {
      handler.onChange(e);
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <div className="relative">
        <input
          type={type}
          id={id}
          placeholder=" "
          autoComplete="off"
          value={value}
          {...handler}
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
      {errorMsg && <small className="text-red">{errorMsg}</small>}
    </div>
  );
};

export default Input;
