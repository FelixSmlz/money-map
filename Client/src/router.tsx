import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import DefaultLayout from "./layouts/DefaultLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import History from "./pages/History";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import EmailVerification from "./pages/EmailVerification";
import { loader as defaultLoader } from "./layouts/DefaultLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    loader: defaultLoader,
    children: [
      {
        path: "",
        element: <Navigate to="/dashboard" />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "history",
        element: <History />,
      },
      {
        path: "settings",
        element: <Settings />,
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
    path: "register",
    element: <Register />,
    action: registerAction,
  },
  {
    path: "login",
    element: <Login />,
    action: loginAction,
  },
]);

export default router;
