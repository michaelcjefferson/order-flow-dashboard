import { createBrowserRouter, Navigate } from "react-router-dom";

import OrdersPage from "../features/orders/pages/OrdersPage";
import OrderDetailPage from "../features/orders/pages/OrderDetailPage";
import DashboardLayout from "../layouts/DashboardLayout";

// -- Routes
export const router = createBrowserRouter([
  {
    // Wrap all routes in dashboard layout
    element: <DashboardLayout />,
    children: [
      {
        // As there is no full app dashboard, redirect "/" routes to OrdersPage for now
        path: "/",
        element: <Navigate to="/orders" replace />,
      },
      {
        path: "/orders",
        element: <OrdersPage />,
        handle: { title: "Orders" },
      },
      {
        path: "/orders/:id",
        element: <OrderDetailPage />,
        handle: { title: "Order Detail" },
      },
      // catch-all redirect to default page
      {
        path: "*",
        element: <Navigate to="/" replace />
      },
    ]
  }
]);