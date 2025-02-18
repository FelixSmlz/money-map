import { useState } from "react";
import { useForm } from "react-hook-form";
import crossIcon from "../assets/icons/cross.svg";
import {
  createBudget,
  createCategory,
  createGoal,
  createTransaction,
} from "../utils/api";
import CategoryDropdown from "./CategoryDropdown";
import ColorSelect from "./ColorSelect";
import DatePicker from "./DatePicker";
import Dropdown from "./Dropdown";
import IconSelect from "./IconSelect";
import Input from "./Input";
import { useNavigate } from "react-router-dom";

type FormType = "transaction" | "budget" | "goal" | "category";

type AddModalProps = {
  isOpen: boolean;
  onClose: () => void;
  type: FormType;
};

const AddModal = ({ isOpen, onClose, type }: AddModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");
  const [customDays, setCustomDays] = useState<string>("");
  const [selectedIcon, setSelectedIcon] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");

  const daysOptions = Array.from({ length: 31 }, (_, i) => ({
    value: String(i + 1),
    label: `${i + 1} ${i === 0 ? "day" : "days"}`,
  }));
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setError(null);

    const formData = new FormData();

    try {
      let response;

      switch (type) {
        case "transaction":
          formData.append("name", data.name);
          formData.append("amount", data.amount);
          formData.append("category_id", selectedCategory);
          formData.append("type", selectedType);
          formData.append("date", selectedDate);
          response = await createTransaction(formData);
          break;

        case "budget":
          formData.append("name", data.name);
          formData.append("limit", data.limit);
          formData.append("start_date", selectedDate);
          formData.append("period", selectedPeriod);
          formData.append("category_id", selectedCategory);
          response = await createBudget(formData);
          break;

        case "goal":
          formData.append("name", data.name);
          formData.append("target_amount", data.target_amount);
          formData.append("start_date", selectedDate);
          formData.append("category_id", selectedCategory);
          response = await createGoal(formData);
          break;

        case "category":
          formData.append("name", data.name);
          formData.append("icon_name", selectedIcon);
          formData.append("color_code", selectedColor);
          response = await createCategory(formData);
          break;
      }

      if (response?.status === 201) {
        reset();
        onClose();
        switch (type) {
          case "transaction":
            navigate(`/transactions/${response.data["transaction:"].id}`);
            break;
          case "budget":
            navigate(`/budgets/${response.data["budget:"].id}`);
            break;
          case "goal":
            navigate(`/goals/${response.data["goal:"].id}`);
            break;
          case "category":
            navigate(`/categories/${response.data["category:"].id}`);
            break;
        }
      } else {
        console.error("Response Error: ", response);
        setError("Failed to create " + type);
      }
    } catch (err) {
      console.error("Error: ", err);
      setError("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const renderForm = () => {
    switch (type) {
      case "transaction":
        return (
          <>
            <CategoryDropdown
              value={selectedCategory}
              handler={register("category_id", {
                required: "Category is required",
                value: selectedCategory,
              })}
              onChange={(category) => {
                setSelectedCategory(category);
                setValue("category_id", category);
              }}
              errorMsg={errors.category_id?.message as string}
            />
            <div className="flex items-center w-full gap-4">
              <Input
                type="text"
                className="flex-1"
                id="name"
                placeholder="name"
                handler={register("name", { required: "Name is required" })}
                errorMsg={errors.name?.message as string}
              />
              <Input
                type="number"
                className="flex-1"
                id="amount"
                placeholder="amount"
                handler={register("amount", {
                  required: "Amount is required",
                  min: {
                    value: 0,
                    message: "Amount must be positive",
                  },
                  max: {
                    value: 999999.99,
                    message: "Amount exceeds maximum value",
                  },
                })}
                errorMsg={errors.amount?.message as string}
              />
            </div>

            <Dropdown
              id="type"
              options={[
                { value: "expense", label: "Expense" },
                { value: "income", label: "Income" },
              ]}
              placeholder="Select type"
              value={selectedType}
              handler={register("type", {
                required: "Type is required",
                value: selectedType,
              })}
              onChange={(type) => {
                setSelectedType(type);
                setValue("type", type);
              }}
              errorMsg={errors.type?.message as string}
            />
            <DatePicker
              value={selectedDate}
              id="date"
              handler={register("date", {
                required: "Date is required",
                value: selectedDate,
              })}
              onChange={(date) => {
                setSelectedDate(date);
                setValue("date", date);
              }}
              errorMsg={errors.date?.message as string}
              placeholder="Select date"
            />
          </>
        );
      case "budget":
        return (
          <>
            <CategoryDropdown
              value={selectedCategory}
              placeholder="Select category"
              handler={register("category_id", {
                required: "Category is required",
                value: selectedCategory,
              })}
              onChange={(category) => {
                setSelectedCategory(category);
                setValue("category_id", category);
              }}
              errorMsg={errors.category_id?.message as string}
            />
            <Dropdown
              id="period"
              options={[
                { value: "daily", label: "Daily" },
                { value: "weekly", label: "Weekly" },
                { value: "monthly", label: "Monthly" },
                { value: "custom", label: "Custom" },
              ]}
              placeholder="Select period"
              handler={register("period", {
                required: "Period is required",
                value: selectedPeriod,
              })}
              onChange={(period) => {
                setSelectedType(period);
                setValue("period", period);
                setSelectedPeriod(period);
                if (period !== "custom") {
                  setCustomDays("");
                }
              }}
              value={selectedPeriod}
              errorMsg={errors.type?.message as string}
            />
            {selectedPeriod === "custom" && (
              <Dropdown
                id="period"
                options={daysOptions}
                placeholder="Select number of days"
                onChange={setCustomDays}
                value={customDays}
                handler={register("period", {
                  required: "Period is required",
                })}
                errorMsg={errors.period?.message as string}
              />
            )}
            <div className="flex items-center gap-4">
              <Input
                type="text"
                id="name"
                placeholder="name"
                handler={register("name", { required: "Name is required" })}
                errorMsg={errors.name?.message as string}
              />
              <Input
                type="number"
                id="limit"
                placeholder="limit"
                handler={register("limit", {
                  required: "Limit is required",
                  min: {
                    value: 0,
                    message: "Limit must be positive",
                  },
                  max: {
                    value: 999999.99,
                    message: "Amount exceeds maximum value",
                  },
                })}
                errorMsg={errors.limit?.message as string}
              />
            </div>
            <DatePicker
              placeholder="Select start date"
              value={selectedDate}
              id="start_date"
              handler={register("start_date", {
                required: "Start date is required",
                value: selectedDate,
              })}
              onChange={(start_date) => {
                setSelectedDate(start_date);
                setValue("start_date", start_date);
              }}
              errorMsg={errors.start_date?.message as string}
            />
          </>
        );
      case "goal":
        return (
          <>
            <CategoryDropdown
              value={selectedCategory}
              placeholder="Select category"
              handler={register("category_id", {
                required: "Category is required",
                value: selectedCategory,
              })}
              onChange={(category) => {
                setSelectedCategory(category);
                setValue("category_id", category);
              }}
              errorMsg={errors.category_id?.message as string}
            />
            <div className="flex items-center gap-4">
              <Input
                type="text"
                id="name"
                placeholder="name"
                handler={register("name", { required: "Name is required" })}
                errorMsg={errors.name?.message as string}
              />
              <Input
                type="number"
                id="target_amount"
                placeholder="target amount"
                handler={register("target_amount", {
                  required: "Target amount is required",
                  min: {
                    value: 0,
                    message: "Target amount must be positive",
                  },
                  max: {
                    value: 999999.99,
                    message: "Amount exceeds maximum value",
                  },
                })}
                errorMsg={errors.target_amount?.message as string}
              />
            </div>
            <DatePicker
              value={selectedDate}
              id="start_date"
              placeholder="Select start date"
              handler={register("start_date", {
                required: "Start date is required",
                value: selectedDate,
              })}
              onChange={(start_date) => {
                setSelectedDate(start_date);
                setValue("start_date", start_date);
              }}
              errorMsg={errors.start_date?.message as string}
            />
          </>
        );
      case "category":
        return (
          <>
            <ColorSelect
              value={selectedColor}
              placeholder="Select color"
              id="color_code"
              handler={register("color_code", {
                required: "Color is required",
                value: selectedColor,
                pattern: {
                  value: /^#[0-9A-Fa-f]{6}$/,
                  message: "Invalid color code",
                },
              })}
              onChange={(color) => {
                setSelectedColor(color);
                setValue("color_code", color);
              }}
              errorMsg={errors.color_code?.message as string}
            />
            <IconSelect
              id="icon_name"
              value={selectedIcon}
              handler={register("icon_name", {
                required: "Icon is required",
                value: selectedIcon,
              })}
              onChange={(icon) => {
                setSelectedIcon(icon);
                setValue("icon_name", icon);
              }}
              errorMsg={errors.icon_name?.message as string}
            />

            <Input
              type="text"
              id="name"
              placeholder="name"
              handler={register("name", { required: "Name is required" })}
              errorMsg={errors.name?.message as string}
            />
          </>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-bg_black/40 backdrop-blur-[2px] z-50 
      flex items-end lg:items-center justify-center"
      onClick={onClose}
    >
      <div
        className="w-full lg:w-[600px] bg-white/95 backdrop-blur-sm 
        rounded-t-[25px] lg:rounded-[25px] p-8 lg:p-10 shadow-2xl 
        animate-slideUp lg:animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Enhanced Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <h2 className="text-[1.75rem] font-semibold text-bg_black">
              New {type}
            </h2>
            {isLoading && (
              <div
                className="w-5 h-5 border-2 border-turkois/20 border-t-turkois 
              rounded-full animate-spin"
              />
            )}
          </div>
          <button
            onClick={onClose}
            className="group p-2 hover:bg-gray-100 rounded-full transition-all 
            duration-300 hover:rotate-90"
          >
            <img src={crossIcon} alt="Close" className="w-5 h-5" />
          </button>
        </div>

        {/* Enhanced Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {error && (
            <div
              className="bg-red/10 text-red px-4 py-3 rounded-[15px] 
            text-sm font-medium animate-shake"
            >
              {error}
            </div>
          )}

          {renderForm()}

          {/* Enhanced Submit Button */}
          <button
            disabled={isLoading}
            type="submit"
            className="w-full mt-4 bg-bg_black hover:bg-white text-white 
            hover:text-bg_black py-3.5 px-6 rounded-[15px] font-medium 
            transition-all duration-300 transform hover:scale-[1.02] 
            shadow-sm hover:shadow-md border-2 border-transparent 
            hover:border-bg_black disabled:opacity-50 
            disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating..." : `Add ${type}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
