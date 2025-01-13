import {
  ActionFunctionArgs,
  Outlet,
  useLoaderData,
  redirect,
} from "react-router-dom";
import { logout } from "../utils/api";
import Nav from "../components/Nav";
import { isLoggedIn } from "../utils/api";

export const loader = async () => {
  const { isLoggedIn: loggedIn } = await isLoggedIn();
  if (!loggedIn) {
    return redirect("/auth/login");
  }
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = formData.get("intent");
  if (intent === "logout") {
    try {
      const response = await logout();
      if (response.status === 200) {
        return redirect("/auth/login");
      } else {
        return response.data.message;
      }
    } catch (error) {
      console.log("error", error);
    }
  }
};

function DefaultLayout() {
  useLoaderData<typeof loader>();
  return (
    <>
      <Outlet />
      <Nav />
    </>
  );
}

export default DefaultLayout;
