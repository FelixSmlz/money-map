import { createBrowserRouter } from "react-router-dom";
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
import { loader as profileLoader } from "./pages/Profile";
import EmailVerification from "./pages/EmailVerification";
import {
  loader as defaultLoader,
  action as defaultAction,
} from "./layouts/DefaultLayout";
import GuestLayout from "./layouts/GuestLayout";
import { loader as guestLoader } from "./layouts/GuestLayout";
import NotFound from "./pages/NotFound";
import Loading from "./pages/Loading";
import { loader as settingsLoader } from "./pages/Settings";
import Transaction from "./pages/Transaction";
import { loader as transactionLoader } from "./pages/Transaction";
import { action as transactionAction } from "./pages/Transaction";
import Budget from "./pages/Budget";
import { loader as budgetLoader } from "./pages/Budget";
import { action as budgetAction } from "./pages/Budget";

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
        element: <Dashboard />,
        loader: dashboardLoader,
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
        loader: settingsLoader,
      },
      {
        path: "profile",
        element: <Profile />,
        loader: profileLoader,
      },
      {
        path: "transactions/:id",
        element: <Transaction />,
        loader: transactionLoader,
        action: transactionAction,
      },
      {
        path: "budgets/:id",
        element: <Budget />,
        loader: budgetLoader,
        action: budgetAction,
      },
      {
        path: "verify-email",
        element: <EmailVerification />,
      },
    ],
  },
  {
    path: "guest",
    element: <GuestLayout />,
    loader: guestLoader,
    hydrateFallbackElement: <Loading />,
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
