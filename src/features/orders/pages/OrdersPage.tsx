import { useMemo } from "react";
import { useOrdersStore } from "../state/ordersStore";
import type { Order } from "../types/order.types";

function OrdersPage() {
  const byID = useOrdersStore(s => s.byID);
  const allIDs = useOrdersStore(s => s.allIDs);

  // Memoise orders, so that re-renders are only triggered on elements that have changed
  const allOrders = useMemo(() => allIDs.map(id => byID[id]), [allIDs, byID]);

  return (
    <div>
      {allOrders.map((order: Order) => (
        <div key={order.id}><strong>{order.id}</strong> - {order.status}</div>
      ))}
    </div>
  )
}

export default OrdersPage;