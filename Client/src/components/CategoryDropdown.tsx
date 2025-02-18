import { useState, useRef, useEffect } from "react";
import { getCategories } from "../utils/api";
import CategoryIcon from "./CategoryIcon";
import { UseFormRegisterReturn } from "react-hook-form";

type Category = {
  id: string;
  name: string;
  icon_name: string;
  color_code: string;
};

type CategoryDropdownProps = {
  value?: string | null;
  onChange: (categoryId: string) => void;
  handler?: UseFormRegisterReturn;
  placeholder?: string;
  errorMsg?: string;
};

const CategoryDropdown = ({
  value = null,
  onChange,
  placeholder = "Select category...",
  handler,
  errorMsg,
}: CategoryDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedCategory = value
    ? categories.find((cat) => cat.id === value)
    : null;

  if (isLoading) {
    return <div className="w-full p-4 text-center">Loading categories...</div>;
  }

  return (
    <div className="flex flex-col gap-1.5">
      <div ref={dropdownRef} className="relative w-full">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          {...handler}
          className={`flex border border-my_gray items-center justify-between bg-transparent ${
            errorMsg ? "border-red" : ""
          } w-full px-4 py-3 rounded-[15px] transition-colors ${
            isOpen ? "outline-bg_black" : ""
          }`}
        >
          {selectedCategory ? (
            <div className="flex items-center gap-2">
              <CategoryIcon
                category_id={selectedCategory.id}
                className="w-8 h-8"
              />
              <span>{selectedCategory.name}</span>
            </div>
          ) : (
            <span className="text-my_gray">{placeholder}</span>
          )}
          <svg
            width="13"
            height="8"
            viewBox="0 0 13 8"
            fill="none"
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          >
            <path d="M1 1L6.5 6.5L12 1" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white rounded-[15px] shadow-lg p-2">
            <div className="max-h-[200px] overflow-y-scroll dropdown-scrollbar">
              {isLoading ? (
                <div className="p-4 text-center">Loading...</div>
              ) : categories.length === 0 ? (
                <div className="p-4 text-center">
                  No categories yet, please add a category first!
                </div>
              ) : (
                <>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => {
                        onChange(category.id);
                        setIsOpen(false);
                      }}
                      className="flex items-center gap-2 w-full px-4 py-3 rounded-[15px] hover:bg-gray-100"
                    >
                      <CategoryIcon
                        category_id={category.id}
                        className="w-8 h-8"
                      />
                      <span>{category.name}</span>
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>
        )}
      </div>
      {errorMsg && <small className="text-red">{errorMsg}</small>}
    </div>
  );
};

export default CategoryDropdown;
