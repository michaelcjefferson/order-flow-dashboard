import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { useOrdersStore } from '../state/ordersStore';
import { OrderStatus, type Order } from '../types/order.types';
import OrderTable from '../components/OrderTable';

type StatusFilter = OrderStatus | 'all';

const statusOptions: StatusFilter[] = [
  'all',
  OrderStatus.Pending,
  OrderStatus.Processing,
  OrderStatus.Shipped,
  OrderStatus.Delivered,
  OrderStatus.Cancelled,
];

// Capitalise status text for filter label display
function filterLabel(status: StatusFilter): string {
  return status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1);
}

export default function OrdersPage() {
  const byID      = useOrdersStore(s => s.byID);
  const allIDs    = useOrdersStore(s => s.allIDs);
  const isLoading = useOrdersStore(s => s.isLoading);
  const error     = useOrdersStore(s => s.error);

  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  // Memoise allOrders to prevent unchanged orders from re-rendering when update is triggered
  const allOrders = useMemo<Order[]>(
    () => allIDs.map(id => byID[id]),
    [allIDs, byID]
  );

  const filteredOrders = useMemo<Order[]>(() => {
    const unsortedOrders = statusFilter === 'all'
      ? allOrders
      : allOrders.filter(o => o.status === statusFilter);

    // TODO: move to store selectors
    //? In production, where total number of orders is likely large, sorting, filtering, and pagination will generally be performed server-side. Front-end logic like the following presents potential for performance issues
    return [...unsortedOrders].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [allOrders, statusFilter]);

  if (isLoading) return <p className="text-sm text-gray-400">Loading...</p>;
  if (error) return <p className="text-sm text-red-500">{error}</p>;

  return (
    <div className="space-y-4">
      {/* Status filter buttons */}
      {/* Only set display flex on larger screens - filter buttons centred on small (wrapped) screens */}
      <div className="flex-wrap gap-1 border-b border-gray-200 sm:flex">
        {statusOptions.map(status => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={
              clsx('px-3 py-2 text-sm font-medium transition-colors border-b-2 -mb-px cursor-pointer',
                {
                  'border-blue-500 text-blue-600': statusFilter === status,
                  'border-transparent text-gray-400 hover:text-gray-200': statusFilter !== status,
                }
              )
            }
          >
            {filterLabel(status)}
          </button>
        ))}
        <span className="ml-auto text-sm text-gray-400">{filteredOrders.length} orders</span>
      </div>

      <OrderTable orders={filteredOrders} />
    </div>
  );
}