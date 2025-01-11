import { Outlet, useLoaderData } from "react-router-dom";
import Nav from "../components/Nav";
import { isLoggedIn } from "../utils/api";

export const loader = async () => {
  const loggedIn = await isLoggedIn();
  return loggedIn;
};

function DefaultLayout() {
  const isLoggedIn = useLoaderData<typeof loader>();
  return (
    <>
      <Outlet />
      <Nav />
    </>
  );
}

export default DefaultLayout;
