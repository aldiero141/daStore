import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";

import "./index.css";
import Home from "./app/home/index.tsx";
import Products from "./app/home/products.tsx";
import Dashboard from "./app/dashboard/index.tsx";

import DashboardUsers from "./components/Dashboard/Users";
import DashboardCategories from "./components/Dashboard/Categories";
import DashboardProducts from "./components/Dashboard/Products";

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
      { index: true, element: <Navigate to="/dashboard/users" replace /> },
      {
        path: "/dashboard/users",
        element: <DashboardUsers />,
      },
      {
        path: "/dashboard/categories",
        element: <DashboardCategories />,
      },
      {
        path: "/dashboard/products",
        element: <DashboardProducts />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
