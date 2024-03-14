import { createBrowserRouter } from "react-router-dom";
import SignUp from "../layouts/SignUp";
import Dashbord from "../layouts/Dashborad";
import Login from "../layouts/Login";
import AddCategory from "../layouts/AddCategory";
import AddProduct from "../layouts/AddProducts";

export const router = createBrowserRouter([
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashbord",
    element: <Dashbord />,
  },
  {
    path: "/addProduct",
    element: <AddProduct />,
  },
  {
    path: "/addCategory",
    element: <AddCategory />,
  },
  {
    path: "*",
    element: <p>not Found</p>,
  },
]);
