// -- Domain Constants
export enum OrderStatus {
  Pending = "pending",
  Processing = "processing",
  Shipped = "shipped",
  Delivered = "delivered",
  Cancelled = "cancelled"
}

export const ORDER_STATUS_FLOW: OrderStatus[] = [
  OrderStatus.Pending,
  OrderStatus.Processing,
  OrderStatus.Shipped,
  OrderStatus.Delivered,
];

// For history of order's status changes - consider adding other properties eg. updatedBy
export interface OrderStatusEntry {
  status: OrderStatus;
  startedAt: Date;
}

// -- Main Order Entity
export interface Order {
  id: string;
  userID: string;
  username: string;

  status: OrderStatus;
  statusHistory: OrderStatusEntry[];

  // items?
  // totalCost?

  // TODO: transition from string to Address type
  fromAddress: string;
  toAddress: string;
  expectedDelivery?: Date | null;
  actualDelivery?: Date | null;

  createdAt: Date;
  updatedAt: Date;

  // to prevent db conflicts - used by backend only
  version?: number;
}