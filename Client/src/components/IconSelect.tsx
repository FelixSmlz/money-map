import { useEffect, useRef, useState } from "react";
import { IconMap, selectableIcons } from "../utils/IconMap";

type IconSelectType = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  errorMsg?: string;
  className?: string;
  handler?: any;
};

const IconDropdown = ({
  value,
  onChange,
  label,
  errorMsg,
  className,
  handler,
}: IconSelectType) => {
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
          {value ? (
            <div className="flex items-center gap-2">
              <img src={IconMap[value]} alt={value} className="w-6 h-6" />
              <span className="capitalize">{value.split("_").join(" ")}</span>
            </div>
          ) : (
            <span className="text-my_gray">Select Icon</span>
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
          <div className="absolute z-10 w-full mt-2 bg-white rounded-[15px] shadow-lg p-2">
            <div className="max-h-[200px] overflow-y-auto">
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(selectableIcons).map(([key, icon]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      onChange(key);
                      setIsOpen(false);
                    }}
                    className={`flex flex-col items-center justify-center p-3 rounded-[15px] hover:bg-my_gray/5 ${
                      value === key ? "text-turkois" : "text-bg_black"
                    }`}
                  >
                    <img src={icon} alt={key} className="w-6 h-6" />
                    <span className="text-xs mt-1 capitalize">
                      {key.split("_").join(" ")}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {errorMsg && <p className="mt-1 text-sm text-red">{errorMsg}</p>}
    </div>
  );
};

export default IconDropdown;
