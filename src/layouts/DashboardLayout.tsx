import { Outlet, useMatches } from "react-router-dom";
import Header from "../components/Header";
import { seedOrders } from "../features/orders/state/ordersSeedData";
import { useOrdersStore } from "../features/orders/state/ordersStore";
import { startOrderGenerator } from "../features/orders/services/orderGenerator";
import { useEffect } from "react";

export default function DashboardLayout() {
  // Set up orders store with seed values to be used by inner components
  const setOrders = useOrdersStore(store => store.setOrders);

  // Only run setOrders once (on mount)
  useEffect(() => {
    setOrders(seedOrders);
    startOrderGenerator();
  }, []);

  const matches = useMatches();

  // Find last route match that has a "title" property in its handle
  const currentMatch = matches[matches.length - 1];

  const title = currentMatch.handle?.title ?? "Dashboard";

  return (
    // Container
    <div className="min-h-screen flex flex-col items-center p-6">
      <Header title={title}></Header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}