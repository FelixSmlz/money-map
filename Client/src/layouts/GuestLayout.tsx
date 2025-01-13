import { isLoggedIn } from "../utils/api";
import { Outlet, redirect, useLoaderData } from "react-router";

export const loader = async () => {
  const loggedIn = await isLoggedIn();
  if (loggedIn) {
    return redirect("/dashboard");
  }
  return null;
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
