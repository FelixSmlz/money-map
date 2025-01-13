import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import DefaultLayout from "./layouts/DefaultLayout";
import Dashboard from "./pages/Dashboard";
import { loader as dashboardLoader } from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import History from "./pages/History";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import EmailVerification from "./pages/EmailVerification";
import {
  loader as defaultLoader,
  action as defaultAction,
} from "./layouts/DefaultLayout";
import GuestLayout from "./layouts/GuestLayout";
import { loader as guestLoader } from "./layouts/GuestLayout";
import NotFound from "./pages/NotFound";
import Loading from "./pages/Loading";

const router = createBrowserRouter([
  {
    path: "",
    element: <DefaultLayout />,
    errorElement: <NotFound />,
    loader: defaultLoader,
    hydrateFallbackElement: <Loading />,
    children: [
      {
        path: "",
        element: <Navigate to="dashboard" />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        loader: dashboardLoader,
      },
      {
        path: "history",
        element: <History />,
      },
      {
        path: "settings",
        element: <Settings />,
        action: defaultAction,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "verify-email",
        element: <EmailVerification />,
      },
    ],
  },
  {
    path: "",
    element: <GuestLayout />,
    loader: guestLoader,
    children: [
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
    ],
  },
]);

export default router;
