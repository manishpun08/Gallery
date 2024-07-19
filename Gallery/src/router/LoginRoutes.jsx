import MainLayout from "../layouts/MainLayouts";
import AddImage from "../pages/AddImage";
import Home from "../pages/Home";

const LoginRoute = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/addImage",
        element: <AddImage />,
      },
    ],
  },
];

export default LoginRoute;
