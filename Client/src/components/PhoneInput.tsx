import React, { useState, useRef, useEffect } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  id: string;
  value?: string;
  placeholder?: string;
  className?: string;
  errorMsg?: string;
  handler?: UseFormRegisterReturn;
  onChange?: (value: string) => void;
};

const countryCodes = [
  { code: "+41", country: "CH" },
  { code: "+49", country: "DE" },
  { code: "+43", country: "AT" },
  { code: "+33", country: "FR" },
  { code: "+44", country: "UK" },
];

const PhoneInputV2 = ({
  id,
  className,
  value,
  placeholder,
  handler,
  errorMsg,
  onChange,
}: Props) => {
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
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

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    const match = digits.match(/^(\d{0,4})(\d{0,3})(\d{0,3})$/);
    if (!match) return digits;
    return match.slice(1).filter(Boolean).join(" ");
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);

    if (handler?.onChange) {
      const fullNumber = `${selectedCountry.code} ${formatted}`;
      handler.onChange({
        ...e,
        target: { ...e.target, value: fullNumber.trim() },
      });
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <div className="relative flex">
        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="h-full px-3 border border-my_gray border-r-0 rounded-l-[15px] flex items-center bg-white hover:bg-gray-50"
          >
            {selectedCountry.code}
          </button>
          {isOpen && (
            <div className="absolute top-full left-0 mt-1 w-[120px] bg-white border border-my_gray rounded-[15px] shadow-lg z-50">
              {countryCodes.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-[15px] last:rounded-b-[15px]"
                  onClick={() => {
                    setSelectedCountry(country);
                    setIsOpen(false);
                    if (handler?.onChange) {
                      const fullNumber = `${country.code} ${phoneNumber}`;
                      handler.onChange({
                        target: { value: fullNumber.trim() },
                      } as React.ChangeEvent<HTMLInputElement>);
                    }
                  }}
                >
                  {country.code} {country.country}
                </button>
              ))}
            </div>
          )}
        </div>
        <input
          type="tel"
          id={id}
          placeholder=" "
          value={phoneNumber}
          onChange={handlePhoneChange}
          className={`${className} peer w-full focus:outline-bg_black p-3 border border-my_gray rounded-r-[15px] rounded-l-none ${
            errorMsg ? "border-red" : ""
          }`}
          maxLength={12}
        />
        <label
          className={`absolute left-16 text-my_gray transform pointer-events-none rounded-[15px] transition-all duration-150 ${
            phoneNumber
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

export default PhoneInputV2;
