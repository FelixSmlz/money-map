import Transaction from "./transactions/TransactionRow";

function Recent() {
  return (
    <div className="py-8 flex flex-col justify-between items-center gap-7">
      <div className="flex justify-between w-full">
        <h3 className="text-base font-semibold text-black">
          Recent Transaction
        </h3>
        <a
          className="flex font-semibold text-sm hover:text-gray text-black gap-0.5 justify-center items-center "
          href="/history"
        >
          See All
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.71252 8.29995L6.42919 5.58328C6.75002 5.26245 6.75002 4.73745 6.42919 4.41662L3.71252 1.69995"
              stroke="#7E7E7E"
              stroke-width="1"
              strokeMiterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
      </div>
    </div>
  );
}

export default Recent;
