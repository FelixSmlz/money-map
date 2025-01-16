export type Transaction = {
  name: string;
  amount: number;
  type: string;
  date: string;
  categoryId: number;
};

const TransactionRow = ({
  name,
  amount,
  type,
  date,
  categoryId,
}: Transaction) => {
  return (
    <a
      href="/transaction"
      className="group flex w-full items-center bg-white hover:bg-bg_black rounded-[15px] p-4 gap-5"
    >
      <div className="bg-[rgba(231,231,231,0.3)] h-fit p-4 rounded-[15px]">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001"
            stroke="#1A1B1C"
            stroke-width="1.75"
            strokeMiterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="group-hover:stroke-white"
          />
          <path
            d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z"
            stroke="#1A1B1C"
            stroke-width="1.75"
            strokeMiterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="group-hover:stroke-white"
          />
          <path
            d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z"
            stroke="#1A1B1C"
            stroke-width="1.75"
            strokeMiterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="group-hover:stroke-white"
          />
          <path
            d="M9 8H21"
            stroke="#1A1B1C"
            stroke-width="1.75"
            strokeMiterlimit="10"
            stroke-linecap="round"
            className="group-hover:stroke-white"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div className="flex justify-between w-full items-center">
        <div className="flex flex-col gap-2">
          <p className="text-bg_black group-hover:text-white text-base">
            {name}
          </p>
          <p className="text-light_gray group-hover:text-white text-xs">
            One-off
          </p>
        </div>
        <div className="flex flex-col gap-2">
          {type === "income" ? (
            <p className="text-bg_black group-hover:text-white text-right">
              {amount}€
            </p>
          ) : (
            <p className="text-red group-hover:text-white text-right">
              - {amount}€
            </p>
          )}
          <p className="text-light_gray group-hover:text-white text-xs text-right">
            {date}
          </p>
        </div>
      </div>
    </a>
  );
};

export default TransactionRow;
