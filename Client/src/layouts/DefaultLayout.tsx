import { Outlet, redirect, useLoaderData } from "react-router-dom";
import { ActionFunctionArgs } from "react-router";
import { logout } from "../utils/api";

import Nav from "../components/Nav";
import { isLoggedIn } from "../utils/api";

export const loader = async () => {
  const { isLoggedIn: loggedIn } = await isLoggedIn();
  if (!loggedIn) {
    return redirect("/guest/welcome");
  }
  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  if (formData.get("intent") === "logout") {
    try {
      await logout();
      return redirect("/guest/welcome");
    } catch (error) {
      console.error("Logout failed:", error);
      throw new Error("Logout failed");
    }
  }
  return null;
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
