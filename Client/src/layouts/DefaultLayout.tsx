import {
  ActionFunctionArgs,
  Outlet,
  useLoaderData,
  redirect,
} from "react-router-dom";

import Nav from "../components/Nav";
import { isLoggedIn } from "../utils/api";

export const loader = async () => {
  const { isLoggedIn: loggedIn } = await isLoggedIn();
  if (!loggedIn) {
    return redirect("/guest/welcome");
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
