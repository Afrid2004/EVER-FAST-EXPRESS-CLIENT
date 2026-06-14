import { useState } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes/Routes";
import { ThemeProvider } from "./context/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
  );
}

export default App;
