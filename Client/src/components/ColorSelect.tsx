import { useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";

type ColorSelectProps = {
  id: string;
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  errorMsg?: string;
  className?: string;
  handler?: any;
  windowPosition?: string;
  placeholder?: string;
};

const ColorSelect = ({
  value = "#000000",
  onChange,
  id,
  label,
  errorMsg,
  className,
  windowPosition = "bottom",
  handler,
  placeholder,
}: ColorSelectProps) => {
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

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm mb-2 text-my_gray">{label}</label>
      )}
      <div ref={dropdownRef} className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-between w-full p-3 border border-my_gray rounded-[15px] ${
            errorMsg ? "border-red" : ""
          } ${className}`}
          {...handler}
        >
          <div className="flex items-center gap-2">
            {value ? (
              <>
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: value }}
                />
                <span>{value}</span>
              </>
            ) : (
              <span className="text-my_gray">{placeholder}</span>
            )}
          </div>
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
          <div
            className={`absolute ${
              windowPosition === "top" ? "bottom-full mb-2" : "top-full mt-2"
            } left-0 z-50 w-full bg-white rounded-[15px] shadow-lg p-4`}
            style={{
              transformOrigin: windowPosition === "top" ? "bottom" : "top",
            }}
          >
            <HexColorPicker
              color={value}
              onChange={onChange}
              style={{ width: "100%", height: "150px" }}
            />
          </div>
        )}
      </div>
      {errorMsg && <span className="text-red text-sm mt-1">{errorMsg}</span>}
    </div>
  );
};

export default ColorSelect;
