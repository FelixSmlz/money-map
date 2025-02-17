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
    <div className="px-5 max-w-[1024px] mx-auto py-10 position-relative">
      <Background />
      <header className="flex justify-between items-center mb-8 text-bg_black">
        <BackArrow />
        <NotificationDropdown />
      </header>
      <div className="flex flex-col items-center gap-6">
        <p className="text-bg_black text-[2.5rem] text-center">
          {category.name}
        </p>
        <div className="flex gap-3 items-center">
          <CategoryIcon category_id={category.id} />
          <DeleteBtn onDelete={handleDelete} />
        </div>
        <div className="flex flex-col gap-6 max-w-[500px] mx-auto bg-white w-full p-4 rounded-[15px] shadow-sm">
          <DataRow label="name" value={category.name} />
          <DataRow label="icon" value={category.icon_name} />
          <DataRow label="color" value={renderColor()} />
        </div>
        <UpdateModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          type="category"
          data={category}
        />
        <button
          onClick={() => setIsUpdateModalOpen(true)}
          className="bg-bg_black text-white p-4 shadow-md rounded-full"
        >
          <img src={editIcon} alt="edit" />
        </button>
      </div>
    </div>
  );
};

export default Category;
