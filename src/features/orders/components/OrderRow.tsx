import { useNavigate } from 'react-router-dom';
import type { Order } from '../types/order.types';
import OrderStatusBadge from './OrderStatusBadge';

interface Props {
  order: Order;
}

// Format Date into human-readable string or "-"
function formatDate(date: Date | null | undefined): string {
  if (!date) return '-';
  //? use the below to get locale from browser rather than always using Japanese date formatting
  // return new Date(date).toLocaleDateString(Intl.DateTimeFormat().resolvedOptions().locale, {
  return new Date(date).toLocaleDateString('ja-JP', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
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