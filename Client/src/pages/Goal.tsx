import { getGoal, updateGoal, deleteGoal, isLoggedIn } from "../utils/api";
import {
  ActionFunctionArgs,
  useNavigate,
  useFetcher,
  useLoaderData,
} from "react-router";
import DataRow from "../components/DataRow";
import CategoryIcon from "../components/CategoryIcon";
import DeleteBtn from "../components/DeleteBtn";
import Background from "../components/Background";
import GoalIndicator from "../components/goals/GoalIndicator";
import NotificationDropdown from "../components/NotificationMenu";

export type GoalType = {
  id: string;
  name: string;
  target_amount: number;
  current_amount: number;
  start_date: string;
  category_id: number;
};

export const loader = async ({ params }: any) => {
  const [goalResponse, { user }] = await Promise.all([
    getGoal(params.id),
    isLoggedIn(),
  ]);

  return {
    goal: goalResponse.goal,
    user,
  };
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const response = await updateGoal(params.id as string, formData);
  if (!response || !response.data) {
    return { error: "Failed to update goal" };
  }
  return { goal: response.data.goal };
};

const Goal = () => {
  const navigate = useNavigate();
  const fetcher = useFetcher<typeof action>();
  const { goal } = useLoaderData() as { goal: GoalType };

  const handleDelete = async () => {
    const response = await deleteGoal(goal.id);
    if (response.status === 200) {
      navigate("/history");
    }
  };

  return (
    <div className="px-5 py-10 position-relative">
      <Background />
      <header className="flex justify-between items-center mb-8 text-bg_black">
        <div onClick={() => navigate(-1)}>
          <svg
            fill="none"
            stroke="black"
            strokeWidth="1"
            height="30"
            viewBox="0 0 24 24"
            width="30"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="m10.7071 12 4.6464-4.64645c.1953-.19526.1953-.51184 0-.7071s-.5118-.19529-.7071 0l-5.3536 5.35355c-.1953.19526-.1953.51184 0 .7071l5.3536 5.3536c.1953.1953.5118.1953.7071 0s.1953-.5118 0-.7071l-4.6464-4.6464h12.2929c.2828 0 .5-.2239.5-.5s-.2232-.5-.5-.5z"
              fillRule="evenodd"
            />
          </svg>
        </div>
        <NotificationDropdown />
      </header>
      <div className="flex flex-col items-center gap-6 relative">
        <GoalIndicator
          targetAmount={goal.target_amount}
          currentAmount={goal.current_amount}
          size={125}
          strokeWidth={15}
        />
        <div className="flex gap-3 items-center">
          <CategoryIcon />
          <DeleteBtn onDelete={handleDelete} />
        </div>
        <div className="flex flex-col gap-6 bg-white w-full p-4 rounded-[15px] shadow-sm">
          <DataRow label="name" value={goal.name} />
          <DataRow label="current amount" value={goal.current_amount} />
          <DataRow label="target amount" value={goal.target_amount} />
          <DataRow label="start date" value={goal.start_date} />
          <DataRow label="category" value={goal.category_id} />
        </div>
      </div>
    </div>
  );
};

export default Goal;
