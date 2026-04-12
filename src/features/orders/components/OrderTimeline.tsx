import clsx from "clsx";
import type { OrderStatus } from "../types/order.types";
import { formatDate } from "../../../helpers/datetime";

type Props = {
  history: {
    status: OrderStatus;
    startedAt: Date;
  }[];
  fromAddress: string;
  toAddress: string;
}

function OrderTimeline({ history, fromAddress, toAddress }: Props) {
  return (
    <div className="flex w-full items-center justify-between">
      <p>{fromAddress}</p>
      {history.map(h => (
        <div className="">
          <p>{h.status}</p>
          <p>{formatDate(h.startedAt)}</p>
        </div>
      ))}
      <p>{toAddress}</p>
    </div>
  )
}

export default OrderTimeline;