import { useId } from "react";

type Props = {
  searchFilter: string;
  setSearchFilter: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar = ({ searchFilter, setSearchFilter }: Props) => {
  const searchId = useId();
  return (
    <div className="relative w-full group">
      <input
        autoComplete="off"
        className="w-full focus:outline-none py-3 px-5 shadow-md hover:shadow-lg
        rounded-[15px] bg-white/95 backdrop-blur-sm border border-transparent
        focus:border-turkois/20 transition-all duration-300 placeholder:text-my_gray/60"
        type="search"
        id={searchId}
        name="search"
        placeholder="Search"
        value={searchFilter}
        onChange={(e) => setSearchFilter(e.target.value)}
      />
      {searchFilter === "" && (
        <svg
          className="absolute top-3 right-4 text-my_gray/60 group-hover:text-turkois
          transition-colors duration-300"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 22L20 20"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
};

export default SearchBar;
