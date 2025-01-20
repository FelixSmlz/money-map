import editIcon from "../assets/icons/edit.svg";

type Props = {
  label: string;
  value: string | number;
};

const DataRow = ({ label, value }: Props) => {
  return (
    <div className="flex group justify-between items-center pt-5 pb-3 px-2 border-b border-light_gray relative first:mt-2 last:border-b-0 last:pb-0">
      <span className="absolute text-xs text-gray -top-2">{label}</span>
      <p>{value}</p>
      <img
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        src={editIcon}
        alt="Edit"
      />
    </div>
  );
};

export default DataRow;
