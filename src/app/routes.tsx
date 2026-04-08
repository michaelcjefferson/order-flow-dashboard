import { createBrowserRouter, Navigate } from "react-router-dom";

import OrdersPage from "../features/orders/pages/OrdersPage";
import OrderDetailPage from "../features/orders/pages/OrderDetailPage";

// -- Routes
export const router = createBrowserRouter([
  // As there is no full app dashboard, redirect "/" routes to OrdersPage for now
  {
    path: "/",
    element: <Navigate to="/orders" replace />,
  },
  {
    path: "/orders",
    element: <OrdersPage />,
  },
  {
    path: "/orders/:id",
    element: <OrderDetailPage />,
  },
  // catch-all redirect to default page
  {
    path: "*",
    element: <Navigate to="/" replace />
  },
]);