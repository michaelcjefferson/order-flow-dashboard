// -- Domain Constants
export enum OrderStatus {
  Pending = "pending",
  Processing = "processing",
  Shipped = "shipped",
  Delivered = "delivered",
  Cancelled = "cancelled"
}

// -- Main Order Entity
export interface Order {
  id: string;
  userID: string;

  status: OrderStatus;

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