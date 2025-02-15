import { createBrowserRouter } from "react-router-dom";
import DefaultLayout, {
  loader as defaultLoader,
} from "./layouts/DefaultLayout";
import GuestLayout, { loader as guestLoader } from "./layouts/GuestLayout";
import Budget, {
  action as budgetAction,
  loader as budgetLoader,
} from "./pages/Budget";
import Category, { loader as categoryLoader } from "./pages/Category";
import ChangePassword, {
  action as changePasswordAction,
} from "./pages/ChangePassword";
import Dashboard, { loader as dashboardLoader } from "./pages/Dashboard";
import Goal, { action as goalAction, loader as goalLoader } from "./pages/Goal";
import History from "./pages/History";
import Loading from "./pages/Loading";
import Login, { action as loginAction } from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile, { loader as profileLoader } from "./pages/Profile";
import Register, { action as registerAction } from "./pages/Register";
import Settings, {
  action as settingsAction,
  loader as settingsLoader,
} from "./pages/Settings";
import Transaction, {
  action as transactionAction,
  loader as transactionLoader,
} from "./pages/Transaction";
import Welcome from "./pages/Welcome";

export const routes = [
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
        loader: dashboardLoader,
      },
      {
        path: "settings",
        element: <Settings />,
        action: settingsAction,
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
        path: "goals/:id",
        element: <Goal />,
        loader: goalLoader,
        action: goalAction,
      },
      {
        path: "categories/:id",
        element: <Category />,
        loader: categoryLoader,
      },
      {
        path: "change-password",
        element: <ChangePassword />,
        action: changePasswordAction,
        loader: dashboardLoader,
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
        path: "welcome",
        element: <Welcome />,
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
    ],
  },
];

const router = createBrowserRouter(routes, {
  basename: "/money-map",
});

export default router;
