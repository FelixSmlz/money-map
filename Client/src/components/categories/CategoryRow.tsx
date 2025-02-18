import { Link } from "react-router-dom";
import { CategoryType } from "../../pages/Category";
import CategoryIcon from "../CategoryIcon";

const CategoryRow = ({ id, name, color_code, icon_name }: CategoryType) => {
  return (
    <Link
      to={`/categories/${id}`}
      className="group flex w-full items-center bg-white/95 backdrop-blur-sm 
        hover:bg-bg_black rounded-[15px] p-5 gap-4 shadow-sm hover:shadow-lg 
        transition-all duration-300 hover:scale-[1.01] border border-transparent 
        hover:border-turkois/10"
    >
      <CategoryIcon
        category_id={id}
        className="transition-transform group-hover:scale-110"
      />

      <div className="flex justify-between w-full items-center">
        <div className="flex flex-col gap-1.5">
          <p
            className="text-bg_black group-hover:text-white text-base font-medium 
            transition-colors"
          >
            {name}
          </p>
          <span
            className="text-my_gray group-hover:text-white/70 text-xs 
            tracking-wide capitalize transition-colors"
          >
            {icon_name}
          </span>
        </div>

        <div className="flex flex-col items-end gap-2.5">
          <div
            className="w-5 h-5 rounded-full transition-transform group-hover:scale-110 
              shadow-sm"
            style={{ backgroundColor: color_code }}
          />
          <span
            className="text-my_gray group-hover:text-white/70 text-xs 
            tracking-wide transition-colors"
          >
            {color_code}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CategoryRow;
