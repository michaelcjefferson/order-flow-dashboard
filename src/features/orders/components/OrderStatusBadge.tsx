import clsx from "clsx";
import { OrderStatus } from "../types/order.types";

interface Props {
  status: OrderStatus;
}

export default function OrderStatusBadge({ status }: Props) {
  return (
    <span className={
      clsx('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        {
          'bg-amber-100 text-amber-800': status === OrderStatus.Pending,
          'bg-blue-100 text-blue-800': status === OrderStatus.Processing,
          'bg-purple-100 text-purple-800': status === OrderStatus.Shipped,
          'bg-green-100 text-green-800': status === OrderStatus.Delivered,
          'bg-red-100 text-red-800': status === OrderStatus.Cancelled,
        }
      )}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}