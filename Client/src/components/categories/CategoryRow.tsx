import { Link } from "react-router-dom";
import { CategoryType } from "../../pages/Category";
import CategoryIcon from "../CategoryIcon";

const CategoryRow = ({ id, name }: CategoryType) => {
  return (
    <Link
      to={`/categories/${id}`}
      className="group flex items-center bg-white hover:bg-bg_black p-2 rounded-[15px] gap-4 shadow-sm"
    >
      <CategoryIcon category_id={id} />
      <p className="text-bg_black text-center group-hover:text-white text-base font-medium">
        {name}
      </p>
    </Link>
  );
};

export default CategoryRow;
