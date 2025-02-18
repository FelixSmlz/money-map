import { useEffect } from "react";

type Props = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmWindow = ({ message, onCancel, onConfirm }: Props) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 bg-bg_black/40 backdrop-blur-[2px] flex justify-center items-center z-50 px-5 "
      onClick={onCancel}
    >
      <div
        className="flex flex-col items-center gap-8 bg-white/95 backdrop-blur-sm max-w-[500px] w-full rounded-[25px] p-10 shadow-2xl animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex flex-col gap-2 items-center">
          <svg
            className="w-12 h-12 text-red animate-warning"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p className="text-center font-medium text-lg text-bg_black leading-relaxed">
            {message}
          </p>
        </div>

        <div className="flex w-full justify-between gap-4 items-center">
          <button
            onClick={onCancel}
            className="group bg-white hover:bg-bg_black py-3.5 px-6 w-1/2 
              border-2 border-bg_black rounded-[15px] 
              text-bg_black hover:text-white font-medium transition-all 
              duration-300 ease-out transform hover:scale-[1.02] shadow-sm 
              hover:shadow-md focus:outline-none focus:ring-2 focus:ring-bg_black/20"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="group bg-white hover:bg-red py-3.5 px-6 w-1/2 
              border-2 border-red rounded-[15px] 
              text-red hover:text-white font-medium transition-all 
              duration-300 ease-out transform hover:scale-[1.02] shadow-sm 
              hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red/20"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmWindow;
