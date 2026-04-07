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

  address: string;
  expectedDelivery: Date;

  createdAt: Date;
  updatedAt: Date;

  // to prevent db conflicts - used by backend only
  version?: number;
}