import { useState } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes/Routes";

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
