import { OrderStatus, type Order } from "../types/order.types";

const now = new Date();

// Seed data to populate orders store with on app start
export const seedOrders: Order[] = [
  {
    id: "OID-10583",
    userID: "3144e3db-dac0-4dd1-9048-7014282ea14b",
    username: "Leila Haddad",
    status: OrderStatus.Pending,
    statusHistory: [{
      status: OrderStatus.Pending,
      startedAt: now,
    }],
    fromAddress: "Nagoya, JP",
    toAddress: "HCMC, VN",
    expectedDelivery: new Date(now.getTime() + 2 * 86400000),
    actualDelivery: null,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "OID-10584",
    userID: "4f7c9414-4fe7-44c3-97bb-9cccfec068b0",
    username: "Aya Nakamura",
    status: OrderStatus.Shipped,
    statusHistory: [{
      status: OrderStatus.Pending,
      startedAt: new Date(now.getTime() - 3.7 * 86400000),
    },
    {
      status: OrderStatus.Processing,
      startedAt: new Date(now.getTime() - 2.89 * 86400000),
    },{
      status: OrderStatus.Shipped,
      startedAt: new Date(now.getTime() - 1.2 * 86400000),
    }],
    fromAddress: "Hanoi VN",
    toAddress: "Osaka, JP",
    expectedDelivery: new Date(now.getTime() + 86400000),
    actualDelivery: null,
    createdAt: new Date(now.getTime() - 3.7 * 86400000),
    updatedAt: new Date(now.getTime() - 1.2 * 86400000),
  },
  {
    id: "OID-10586",
    userID: "3144e3db-dac0-4dd1-9048-7014282ea14b",
    username: "Nguyễn Minh Anh",
    status: OrderStatus.Delivered,
    statusHistory: [{
      status: OrderStatus.Pending,
      startedAt: new Date(now.getTime() - 1.5 * 86400000),
    },
    {
      status: OrderStatus.Processing,
      startedAt: new Date(now.getTime() - 1.23 * 86400000),
    },{
      status: OrderStatus.Shipped,
      startedAt: new Date(now.getTime() - 0.9 * 86400000),
    },{
      status: OrderStatus.Delivered,
      startedAt: new Date(now.getTime() - 3600000),
    }],
    fromAddress: "Nagoya, JP",
    toAddress: "Singapore, SG",
    expectedDelivery: new Date(now.getTime() - 86400000),
    actualDelivery: new Date(now.getTime() - 3600000),
    createdAt: new Date(now.getTime() - 1.5 * 86400000),
    updatedAt: new Date(now.getTime() - 3600000),
  },
];