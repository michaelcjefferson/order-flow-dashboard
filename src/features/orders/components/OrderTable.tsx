import type { Order } from '../types/order.types';
import OrderRow from './OrderRow';

interface Props {
  orders: Order[];
}

const columns = ['Order ID', 'From', 'To', 'Status', 'Expected', 'Created'];

export default function OrderTable({ orders }: Props) {
  if (!orders.length) {
    return <p className="text-sm text-gray-400 py-8 text-center">No orders found.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map(col => (
              <th
                key={col}
                className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {orders.map(order => (
            <OrderRow key={order.id} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
}