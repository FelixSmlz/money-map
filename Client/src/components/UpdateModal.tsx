import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import crossIcon from "../assets/icons/cross.svg";
import { BudgetType } from "../pages/Budget";
import { CategoryType } from "../pages/Category";
import { GoalType } from "../pages/Goal";
import { UserType } from "../pages/Profile";
import { TransactionType } from "../pages/Transaction";
import {
  updateBudget,
  updateCategory,
  updateGoal,
  updateProfile,
  updateTransaction,
} from "../utils/api";
import CategoryDropdown from "./CategoryDropdown";
import ColorSelect from "./ColorSelect";
import DatePicker from "./DatePicker";
import Dropdown from "./Dropdown";
import IconSelect from "./IconSelect";
import Input from "./Input";

type FormType = "transaction" | "budget" | "goal" | "category" | "user";

type UpdateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  type: FormType;
  data: TransactionType | BudgetType | GoalType | CategoryType | UserType;
};

const UpdateModal = ({ isOpen, onClose, type, data }: UpdateModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customDays, setCustomDays] = useState<string>("");
  const daysOptions = Array.from({ length: 90 }, (_, i) => ({
    value: (i + 1).toString(),
    label: `${i + 1} days`,
  }));

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedType, setSelectedType] = useState<"income" | "expense">();
  const [selectedPeriod, setSelectedPeriod] = useState<
    "daily" | "weekly" | "monthly" | "custom"
  >();
  const [selectedIcon, setSelectedIcon] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedEmail, setSelectedEmail] = useState<string>("");
  const [selectedPhone, setSelectedPhone] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: data.name,
      ...(type === "transaction" && {
        amount: (data as TransactionType).amount,
        category_id: (data as TransactionType).category_id,
        type: (data as TransactionType).type,
        date: (data as TransactionType).date,
      }),
      ...(type === "budget" && {
        limit: (data as BudgetType).limit,
        period: (data as BudgetType).period,
        start_date: (data as BudgetType).start_date,
        category_id: (data as BudgetType).category_id,
      }),
      ...(type === "goal" && {
        target_amount: (data as GoalType).target_amount,
        start_date: (data as GoalType).start_date,
        category_id: (data as GoalType).category_id,
      }),
      ...(type === "category" && {
        name: (data as CategoryType).name,
        color_code: (data as CategoryType).color_code,
        icon_name: (data as CategoryType).icon_name,
      }),
      ...(type === "user" && {
        email: (data as UserType).email,
        phone: (data as UserType).phone,
        profile_color: (data as UserType).profile_color,
      }),
    },
  });

  const watchedValues = watch();

  useEffect(() => {
    if (data) {
      switch (type) {
        case "transaction":
          const transaction = data as TransactionType;
          setSelectedCategory(transaction.category_id);
          setSelectedType(transaction.type);
          setSelectedDate(transaction.date);
          break;
        case "budget":
          const budget = data as BudgetType;
          setSelectedCategory(budget.category_id);
          setSelectedPeriod(budget.period);
          setSelectedDate(budget.start_date);
          break;
        case "goal":
          const goal = data as GoalType;
          setSelectedCategory(goal.category_id);
          setSelectedDate(goal.start_date);
          break;
        case "category":
          const category = data as CategoryType;
          setSelectedColor(category.color_code);
          setSelectedIcon(category.icon_name);
          break;

        case "user":
          const user = data as UserType;
          setSelectedColor(user.profile_color);
          setSelectedEmail(user.email);
          setSelectedPhone(user.phone);
          break;
      }
    }
  }, [data, type]);

  const onSubmit = async (formData: any) => {
    setIsLoading(true);
    setError(null);

    try {
      let response;
      const updateData = new FormData();

      switch (type) {
        case "transaction":
          updateData.append("name", formData.name);
          updateData.append("amount", formData.amount);
          updateData.append("category_id", selectedCategory);
          if (selectedType) {
            updateData.append("type", selectedType);
          }
          updateData.append("date", selectedDate);
          response = await updateTransaction(data.id, updateData);
          break;

        case "budget":
          updateData.append("name", formData.name);
          updateData.append("limit", formData.limit);
          updateData.append("category_id", selectedCategory);
          if (selectedPeriod) {
            updateData.append("period", selectedPeriod);
          }
          updateData.append("start_date", selectedDate);
          response = await updateBudget(data.id, updateData);
          break;

        case "goal":
          updateData.append("name", formData.name);
          updateData.append("target_amount", formData.target_amount);
          updateData.append("category_id", selectedCategory);
          updateData.append("start_date", selectedDate);
          response = await updateGoal(data.id, updateData);
          break;

        case "category":
          updateData.append("name", formData.name);
          updateData.append("color_code", selectedColor);
          updateData.append("icon_name", selectedIcon);
          response = await updateCategory(data.id, updateData);
          break;

        case "user":
          updateData.append("name", formData.name);
          updateData.append("email", selectedEmail);
          if (formData.phone) updateData.append("phone", selectedPhone);
          if (selectedColor) updateData.append("profile_color", selectedColor);
          response = await updateProfile(data.id, updateData);
          break;
      }

      if (response?.status === 200) {
        onClose();
        window.location.reload();
      }
    } catch (err) {
      setError("Failed to update " + type);
    }
    setIsLoading(false);
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
            <div className="flex items-center gap-4">
              <Input
                type="text"
                id="name"
                value={watchedValues.name}
                placeholder="name"
                handler={register("name", { required: "Name is required" })}
                errorMsg={errors.name?.message as string}
              />
              <Input
                type="number"
                id="amount"
                value={watchedValues.amount?.toString()}
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
                const transactionType = type as "income" | "expense";
                setSelectedType(transactionType);
                setValue("type", transactionType);
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
                setValue(
                  "period",
                  period as "daily" | "weekly" | "monthly" | "custom"
                );
                setSelectedPeriod(
                  period as "daily" | "weekly" | "monthly" | "custom"
                );
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
                value={watchedValues.name}
                placeholder="name"
                handler={register("name", { required: "Name is required" })}
                errorMsg={errors.name?.message as string}
              />
              <Input
                type="number"
                id="limit"
                value={watchedValues.limit?.toString()}
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
                value={watchedValues.name}
                placeholder="name"
                handler={register("name", { required: "Name is required" })}
                errorMsg={errors.name?.message as string}
              />
              <Input
                type="number"
                id="target_amount"
                value={watchedValues.target_amount?.toString()}
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
              value={watchedValues.name}
              handler={register("name", { required: "Name is required" })}
              errorMsg={errors.name?.message as string}
            />
          </>
        );
      case "user":
        return (
          <>
            <Input
              type="text"
              id="name"
              value={watchedValues.name}
              placeholder="name"
              handler={register("name", { required: "Name is required" })}
              errorMsg={errors.name?.message as string}
            />
            <Input
              type="email"
              id="email"
              value={watchedValues.email}
              placeholder="email"
              handler={register("email", { required: "Email is required" })}
              errorMsg={errors.email?.message as string}
            />
            <ColorSelect
              value={selectedColor}
              placeholder="Profile Color"
              id="profile_color"
              windowPosition="top"
              handler={register("profile_color")}
              onChange={(color) => {
                setSelectedColor(color);
                setValue("profile_color", color);
              }}
              errorMsg={errors.profile_color?.message as string}
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
              {type === "user" ? "Edit Profile" : `Edit ${type}`}
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
            {isLoading
              ? "Updating..."
              : type === "user"
              ? "Update Profile"
              : `Update ${type}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
