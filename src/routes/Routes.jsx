import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import AboutUs from "../pages/About/AboutUs";
import ErrorPage from "../pages/Error/ErrorPage";

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
    ],
  },
]);
