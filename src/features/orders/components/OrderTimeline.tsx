import clsx from "clsx";
import { OrderStatus } from "../types/order.types";
import { formatShortDate } from "../../../helpers/datetime";

type Props = {
  history: {
    status: OrderStatus;
    startedAt: Date;
  }[];
  fromAddress: string;
  toAddress: string;
}

const ORDER_STATUS_FLOW: OrderStatus[] = [
  OrderStatus.Pending,
  OrderStatus.Processing,
  OrderStatus.Shipped,
  OrderStatus.Delivered,
];

function OrderTimeline({ history, fromAddress, toAddress }: Props) {
  return (
    <div className="flex w-full items-center justify-between">
      <p className="font-bold">{fromAddress}</p>
      {history.map(h => (
        // TODO: better to pass order id?
        <div key={h.status} className={
          clsx("flex flex-col justify-center items-center px-4 py-4 w-24 h-24",
            {
              "bg-amber-100 text-amber-800 border border-amber-400 shadow-sm shadow-amber-700/50": h.status === OrderStatus.Pending,
              // "bg-amber-100 text-amber-800 border border-amber-400 inset-shadow-sm inset-shadow-amber-700/50": h.status === OrderStatus.Pending,
              "bg-blue-100 text-blue-800 border border-blue-400 shadow-sm shadow-blue-700/50": h.status === OrderStatus.Processing,
              "bg-purple-100 text-purple-800 border border-purple-400 shadow-sm shadow-purple-700/50": h.status === OrderStatus.Shipped,
              "bg-green-100 text-green-800 border border-green-400 shadow-sm shadow-green-700/50": h.status === OrderStatus.Delivered,
              "bg-red-100 text-red-800 border border-red-400 shadow-sm shadow-red-700/50": h.status === OrderStatus.Cancelled,
            }
          )}>
          <p className="text-m font-medium capitalize">{h.status}</p>
          <p className="text-s font-light">{formatShortDate(h.startedAt)}</p>
        </div>
      ))}
      <p className="font-bold">{toAddress}</p>
    </div>
  )
}

export default OrderTimeline;