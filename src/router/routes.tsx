// Authentication pages
import Signin from "@/pages/Authentication/Signin";

// Application pages
import Detail from "@/pages/Gatitos/Detail";
import Home from "../pages/Gatitos/Home";
import Profile from "@/pages/Gatitos/Profile";

const routes = [
  // signin
  {
    path: "/",
    element: <Signin />,
  },
  // application pages
  {
    path: "/gatitos",
    element: <Home />,
  },
  {
    path: "/gatitos/detail/:id",
    element: <Detail />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
];

export { routes };
