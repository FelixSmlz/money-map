import { useState } from "react";
import { useLoaderData } from "react-router";
import { useNavigate } from "react-router-dom";
import editIcon from "../assets/icons/edit.svg";
import BackArrow from "../components/BackArrow";
import Background from "../components/Background";
import CategoryIcon from "../components/CategoryIcon";
import DataRow from "../components/DataRow";
import DeleteBtn from "../components/DeleteBtn";
import NotificationDropdown from "../components/NotificationMenu";
import UpdateModal from "../components/UpdateModal";
import { deleteCategory, getCategory, isLoggedIn } from "../utils/api";

export type CategoryType = {
  id: string;
  name: string;
  color_code: string;
  icon_name: string;
};

export const loader = async ({ params }: any) => {
  const [categoryResponse, { user }] = await Promise.all([
    getCategory(params.id),
    isLoggedIn(),
  ]);

  return {
    category: categoryResponse,
    user,
  };
};

const Category = () => {
  const navigate = useNavigate();
  const { category } = useLoaderData() as {
    category: CategoryType;
    user: any;
  };
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const handleDelete = async () => {
    const response = await deleteCategory(category.id);
    if (response.status === 200) {
      navigate("/history");
    }
  };

  const renderColor = () => {
    return (
      <div className="flex gap-2 items-center">
        <div
          className="w-8 h-8 rounded-full"
          style={{ backgroundColor: category.color_code }}
        ></div>
      </div>
    );
  };

  return (
    <div className="min-h-dvh bg-bg_gray/5 px-5 max-w-[1024px] mx-auto py-10 relative">
      <Background />
      <header className="flex justify-between items-center mb-12 text-bg_black">
        <BackArrow />
        <NotificationDropdown />
      </header>

      <div className="flex flex-col items-center gap-8 animate-fadeIn">
        {/* Category Header Card */}
        <div className="bg-white/95 backdrop-blur-sm p-8 rounded-[25px] w-full max-w-[250px] shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5">
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <p className="text-my_gray text-sm uppercase tracking-wider">
                Category
              </p>

              <p className="text-2xl font-semibold text-bg_black mt-2">
                {category.name}
              </p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-3 items-center">
          <CategoryIcon category_id={category.id} />
          <DeleteBtn onDelete={handleDelete} />
        </div>

        {/* Details Card */}
        <div className="flex flex-col w-full max-w-[500px] bg-white/95 backdrop-blur-sm p-8 rounded-[25px] shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[1.75rem] font-semibold text-bg_black">
              Details
            </h2>
            <button
              onClick={() => setIsUpdateModalOpen(true)}
              className="bg-bg_black hover:bg-white text-white hover:text-bg_black p-3 rounded-full shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-bg_black group"
            >
              <img
                src={editIcon}
                alt="edit"
                className="w-5 h-5 transition-all duration-300 group-hover:scale-110 group-hover:invert"
              />
            </button>
          </div>

          <div className="space-y-6">
            <DataRow label="name" value={category.name} />
            <DataRow label="icon type" value={category.icon_name} />
            <DataRow
              label="color"
              value={
                <div className="flex gap-2 items-center">
                  <div
                    className="w-8 h-8 rounded-full shadow-sm"
                    style={{ backgroundColor: category.color_code }}
                  />
                  <span className="text-my_gray">{category.color_code}</span>
                </div>
              }
            />
          </div>
        </div>
      </div>

      <UpdateModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        type="category"
        data={category}
      />
    </div>
  );
};

export default Category;
