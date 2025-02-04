type Props = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmWindow = ({ message, onCancel, onConfirm }: Props) => {
  return (
    <div className="w-dvw h-dvh bg-bg_black flex justify-center items-center absolute top-0 left-0 z-20 bg-opacity-50 px-5">
      <div className="flex flex-col items-center gap-6 bg-white w-full rounded-[15px] p-10">
        <p className="text-center font-medium max-w-[20ch] text-lg">
          {message}
        </p>
        <div className="flex w-full justify-between gap-3 items-center">
          <button
            onClick={onCancel}
            className="bg-bg_black py-3 border border-bg_black w-1/2 hover:bg-white hover:text-bg_black rounded-[15px] text-white"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="bg-red py-3 border w-1/2 border-red hover:bg-white hover:text-red rounded-[15px] text-white"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmWindow;
