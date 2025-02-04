import { useState, useEffect } from "react";
import { IconMap } from "../utils/IconMap";
import { getCategory } from "../utils/api";

type CategoryIconProps = {
  category_id: string | null;
  className?: string;
};

const CategoryIcon = ({ category_id, className }: CategoryIconProps) => {
  const defaultCategory = {
    icon_name: "undefined" as keyof typeof IconMap,
    color_code: "#E5E7EB",
  };

  const [category, setCategory] = useState<{
    icon_name: keyof typeof IconMap;
    color_code: string;
  } | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      if (category_id) {
        const data = await getCategory(category_id);
        setCategory(data);
      } else {
        setCategory(defaultCategory);
      }
    };
    fetchCategory();
  }, [category_id]);

  if (!category) {
    return null;
  }

  return (
    <div className="bg-white rounded-[15px]">
      <div
        style={{ backgroundColor: `${category.color_code}25` }}
        className={`rounded-[15px] p-3 flex items-center justify-center bg-[${category.color_code}] bg-opacity-25 ${className}`}
      >
        <img
          className="max-w-20"
          src={IconMap[category.icon_name]}
          alt={String(category.icon_name)}
        />
      </div>
    </div>
  );
};

export default CategoryIcon;
