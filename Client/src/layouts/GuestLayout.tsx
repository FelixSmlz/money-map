import { isLoggedIn } from "../utils/api";
import { Outlet, redirect, useLoaderData } from "react-router";

export const loader = async () => {
  try {
    const { isLoggedIn: loggedIn, user } = await isLoggedIn();
    if (loggedIn && user) {
      return redirect("/dashboard");
    }
    return null;
  } catch (error) {
    console.error("Auth check error:", error);
    return null;
  }
};

const GuestLayout = () => {
  useLoaderData<typeof loader>();
  return (
    <>
      <Outlet />
    </>
  );
};

export default GuestLayout;
