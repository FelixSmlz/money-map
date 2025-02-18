import editIcon from "../assets/icons/edit.svg";

type Props = {
  label: string;
  value: string | number | JSX.Element;
};

const DataRow = ({ label, value }: Props) => {
  return (
    <div className="group relative px-4 py-6 hover:bg-bg_gray/5 rounded-[15px] transition-all duration-200 ease-out">
      <span className="absolute -top-1 left-4 text-xs font-medium tracking-wider text-my_gray/80 uppercase transition-all group-hover:text-turkois">
        {label}
      </span>

      <div className="flex items-center justify-between">
        <p className="text-bg_black font-medium pt-2">{value}</p>

        <div className="flex items-center">
          <div className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 ease-out">
            <img
              className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform duration-200"
              src={editIcon}
              alt="Edit"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-light_gray/30 to-transparent group-hover:via-turkois/30 transition-all duration-300" />
    </div>
  );
};

export default DataRow;
