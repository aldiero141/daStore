import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import Home from "./app/home/index.tsx";
import Products from "./app/home/products.tsx";
import Dashboard from "./app/dashboard/index.tsx";

import DashboardUsers from "./components/Dashboard/Users/index.tsx";
import DashboardCategories from "./components/Dashboard/Categories/index.tsx";
import DashboardProducts from "./components/Dashboard/Products/index.tsx";
import ErrorPage404 from "./404.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage404 />,
  },
  {
    path: "/products",
    element: <Products />,
    errorElement: <ErrorPage404 />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <ErrorPage404 />,
    children: [
      { index: true, element: <Navigate to="/dashboard/users" replace /> },
      {
        path: "/dashboard/users",
        element: <DashboardUsers />,
        errorElement: <ErrorPage404 />,
      },
      {
        path: "/dashboard/categories",
        element: <DashboardCategories />,
        errorElement: <ErrorPage404 />,
      },
      {
        path: "/dashboard/products",
        element: <DashboardProducts />,
        errorElement: <ErrorPage404 />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
