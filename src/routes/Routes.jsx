import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import AboutUs from "../pages/About/AboutUs";
import ErrorPage from "../pages/Error/ErrorPage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Rider from "../pages/Rider/Rider";
import AuthRoute from "./AuthRoute";
import Parcel from "../pages/Parcel/Parcel";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "coverage",
        element: <Coverage></Coverage>,
        loader: () => fetch("/Data/locations.json").then((res) => res.json()),
      },
      {
        path: "about-us",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "rider",
        element: (
          <PrivateRoute>
            <Rider></Rider>
          </PrivateRoute>
        ),
      },
      {
        path: "parcel",
        element: (
          <PrivateRoute>
            <Parcel></Parcel>
          </PrivateRoute>
        ),
        loader: () => fetch("/Data/locations.json").then((res) => res.json()),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        element: (
          <AuthRoute>
            <Login></Login>
          </AuthRoute>
        ),
      },
      {
        path: "register",
        element: (
          <AuthRoute>
            <Register></Register>
          </AuthRoute>
        ),
      },
    ],
  },
]);
