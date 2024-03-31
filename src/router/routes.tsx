// Authentication pages
import Signin from "@/pages/Authentication/Signin";

// Application pages
import Detail from "@/pages/Gatitos/Detail";
import Home from "../pages/Gatitos/Home";

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
    path: "/gatitos/detail",
    element: <Detail />,
  },
];

export { routes };
