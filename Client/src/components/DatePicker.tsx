import { useState, useRef, useEffect } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type DatePickerProps = {
  id: string;
  value?: string;
  placeholder?: string;
  className?: string;
  errorMsg?: string;
  handler?: UseFormRegisterReturn;
  onChange?: (date: string) => void;
};

const DatePicker = ({
  id,
  className = "",
  value,
  placeholder,
  handler,
  errorMsg,
  onChange,
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value) : null
  );
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());
  const pickerRef = useRef<HTMLDivElement>(null);

  const formatDateString = (date: Date): string => {
    const d = new Date(date);
    d.setHours(12);
    return d.toISOString().split("T")[0];
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const renderDays = () => {
    const days = [];
    const daysArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Render day headers
    daysArray.forEach((day) => {
      days.push(
        <div key={day} className="text-center text-sm text-my_gray p-2">
          {day}
        </div>
      );
    });

    // Empty cells before first day
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} />);
    }

    // Render month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day,
        12
      );
      const isSelected = selectedDate?.toDateString() === date.toDateString();

      days.push(
        <button
          key={day}
          type="button"
          onClick={() => {
            const formattedDate = formatDateString(date);
            setSelectedDate(date);
            setInputValue(formattedDate);
            setIsOpen(false);
            if (onChange) onChange(formattedDate);
            if (handler?.onChange) {
              handler.onChange({
                target: { value: formattedDate },
              } as any);
            }
          }}
          className={`p-2 rounded-full hover:bg-gray-100 ${
            isSelected ? "bg-turkois text-white hover:bg-turkois" : ""
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="flex flex-col gap-1.5" ref={pickerRef}>
      <div className="relative">
        <input
          type="text"
          id={id}
          placeholder=" "
          readOnly
          value={inputValue}
          onClick={() => setIsOpen(!isOpen)}
          className={`${className} peer w-full focus:outline-bg_black p-3 border border-my_gray rounded-[15px] cursor-pointer`}
        />
        <label
          className={`absolute left-4 text-my_gray transform pointer-events-none rounded-[15px] transition-all duration-150 ${
            inputValue
              ? "-translate-y-3 scale-[0.8] bg-white px-1"
              : `translate-y-3 scale-100`
          } peer-placeholder-shown:translate-y-3 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-[0.8] peer-focus:px-1 peer-focus:bg-white peer-focus:text-bg_black`}
          htmlFor={id}
        >
          {placeholder}
        </label>

        {isOpen && (
          <div className="absolute bottom-full z-10 mb-2 p-4 bg-white rounded-[15px] shadow-lg w-[280px]">
            <div className="flex justify-between items-center mb-4">
              <button
                type="button"
                onClick={() =>
                  setCurrentMonth(
                    new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth() - 1
                    )
                  )
                }
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                ←
              </button>
              <span className="font-medium">
                {currentMonth.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <button
                type="button"
                onClick={() =>
                  setCurrentMonth(
                    new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth() + 1
                    )
                  )
                }
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                →
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1">{renderDays()}</div>
          </div>
        )}
      </div>
      {errorMsg && <small className="text-red">{errorMsg}</small>}
    </div>
  );
};

export default DatePicker;
