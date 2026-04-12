import { useNavigate } from 'react-router-dom';
import type { Order } from '../types/order.types';
import OrderStatusBadge from './OrderStatusBadge';
import { formatDate } from '../../../helpers/datetime';

interface Props {
  order: Order;
}

export default function OrderRow({ order }: Props) {
  const navigate = useNavigate();

  return (
    <tr
      onClick={() => navigate(`/orders/${order.id}`)}
      className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
    >
      <td className="px-4 py-3 text-sm font-mono text-gray-600">{order.id}</td>
      <td className="px-4 py-3 text-sm text-gray-700">{order.fromAddress}</td>
      <td className="px-4 py-3 text-sm text-gray-700">{order.toAddress}</td>
      <td className="px-4 py-3">
        <OrderStatusBadge status={order.status} />
      </td>
      <td className="px-4 py-3 text-sm text-gray-500">{formatDate(order.expectedDelivery)}</td>
      <td className="px-4 py-3 text-sm text-gray-400">{formatDate(order.createdAt)}</td>
    </tr>
  );
}