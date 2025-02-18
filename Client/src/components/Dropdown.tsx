import { useState, useRef, useEffect } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import "../assets/css/scrollbar.css";

type DropdownProps = {
  id: string;
  value?: string;
  options: {
    value: string;
    label: string | React.ReactNode;
  }[];
  onChange: (value: string) => void;
  handler?: UseFormRegisterReturn;
  placeholder?: string;
  errorMsg?: string;
  label?: string;
};

const Dropdown = ({
  value,
  options,
  onChange,
  placeholder = "Select...",
  handler,
  errorMsg,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="flex flex-col gap-1.5">
      <div ref={dropdownRef} className="relative w-full">
        <button
          type="button"
          {...handler}
          onClick={() => setIsOpen(!isOpen)}
          className={`peer flex border border-my_gray ${
            errorMsg ? "border-red" : ""
          } items-center justify-between bg-transparent w-full px-4 py-3 rounded-[15px] transition-colors ${
            isOpen ? "outline-bg_black" : ""
          }`}
        >
          {selectedOption ? (
            <span className="text-bg_black">{selectedOption.label}</span>
          ) : (
            <span className="text-my_gray">{placeholder}</span>
          )}
          <svg
            width="13"
            height="8"
            viewBox="0 0 13 8"
            fill="none"
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          >
            <path
              d="M1.99968 2L5.67421 5.67454C6.10816 6.10849 6.81827 6.10849 7.25222 5.67454L10.9268 2"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-[15px] shadow-lg p-2 z-10">
            <div className="max-h-[200px] overflow-y-scroll dropdown-scrollbar">
              {options.map((option) => (
                <div
                  key={option.value}
                  className={`px-4 py-3 cursor-pointer rounded-[15px] hover:bg-my_gray/5 ${
                    value === option.value ? "text-turkois" : "text-bg_black"
                  }`}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                >
                  {option.label}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {errorMsg && <small className="text-red">{errorMsg}</small>}
    </div>
  );
};

export default Dropdown;
