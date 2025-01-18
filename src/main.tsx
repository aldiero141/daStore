import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import "./index.css";
import Home from "./app/home/index.tsx";
import Products from "./app/home/products.tsx";
import Dashboard from "./app/dashboard/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/users",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/categories",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/products",
        element: <Dashboard />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
