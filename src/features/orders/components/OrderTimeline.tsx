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
  expectedDelivery?: Date;
}

const ORDER_STATUS_FLOW: OrderStatus[] = [
  OrderStatus.Pending,
  OrderStatus.Processing,
  OrderStatus.Shipped,
  OrderStatus.Delivered,
];

function OrderTimeline({ history, fromAddress, toAddress, expectedDelivery }: Props) {
  const completedStatuses = history.map(h => h.status);

  return (
    <div className="flex w-full items-center justify-between">
      <p className="font-bold">{fromAddress}</p>
      {ORDER_STATUS_FLOW.map((status, index) => {
        const isCompleted = completedStatuses.includes(status);
        const isLast = index === ORDER_STATUS_FLOW.length - 1;
        const isCurrent = index === history.length - 1;

        const entry = history.find(h => h.status === status);

        return (
          <div key={status} className={
            clsx("flex flex-col justify-center items-center px-4 py-4 w-24 h-24 border",
              {
                "bg-amber-100 text-amber-800 border-amber-400 shadow-sm shadow-amber-700/50": isCompleted && status === OrderStatus.Pending,
                // "bg-amber-100 text-amber-800 border border-amber-400 inset-shadow-sm inset-shadow-amber-700/50": h.status === OrderStatus.Pending,
                "bg-blue-100 text-blue-800 border-blue-400 shadow-sm shadow-blue-700/50": isCompleted && status === OrderStatus.Processing,
                "bg-purple-100 text-purple-800 border-purple-400 shadow-sm shadow-purple-700/50": isCompleted && status === OrderStatus.Shipped,
                "bg-green-100 text-green-800 border-green-400 shadow-sm shadow-green-700/50": isCompleted && status === OrderStatus.Delivered,
                "bg-red-100 text-red-800 border-red-400 shadow-sm shadow-red-700/50": status === OrderStatus.Cancelled,
                "bg-white border-2 border-cyan-700/50 rounded-sm border-dotted": !isCompleted,
                "rounded-full border-solid w-25 h-25": isCompleted && !isCurrent,
                "rounded-4xl border-dashed": isCurrent && !isLast,
              }
            )}>
            <p className={clsx("text-m font-medium capitalize", {
              "text-black": !isCompleted,
            })}>{status}</p>
            <p className="text-s font-light">{formatShortDate(status === OrderStatus.Delivered && expectedDelivery && !isCompleted ? expectedDelivery : entry?.startedAt)}</p>
          </div>
        )
      })}
      <p className="font-bold">{toAddress}</p>
    </div>
  )
}

export default OrderTimeline;