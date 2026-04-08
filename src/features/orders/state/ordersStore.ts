import { create } from "zustand";
import { OrderStatus, type Order } from "../types/order.types";

// Orders Store structure
interface OrdersState {
  // byID to allow easy JSON serialisation, and get order by id
  byID: Record<string, Order>;
  allIDs: string[];
  // TODO: consider sorting strategies

  // In case of actual API use + latency, communicate loading state
  isLoading: boolean;
  error: string | null;

  setOrders: (orders: Order[]) => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  getAllOrders: () => Order[];
  getOrderByID: (id: string) => Order | undefined;
}

// Process raw orders into store structures
const normaliseOrders = (orders: Order[]) => {
  const byID: Record<string, Order> = {};
  const allIDs: string[] = [];

  for (const order of orders) {
    byID[order.id] = order;
    allIDs.push(order.id);
  }

  return { byID, allIDs };
};

// Orders Store - use zustand conventions plus defined interfaces and types
export const useOrdersStore = create<OrdersState>((set, get) => ({
  byID: {},
  allIDs: [],

  isLoading: false,
  error: null,

  // Call on store init - for now populate with seedOrders, in future populate with API call
  setOrders: (orders) => {
    const normalised = normaliseOrders(orders);
    set(normalised);
  },

  addOrder: (order) => {
    set((state) => ({
      byID: { ...state.byID, [order.id]: order },
      allIDs: [...state.allIDs, order.id],
    }));
  },

  // TODO: prevent invalid changes to OrderStatus
  updateOrderStatus: (id, status) => {
    set((state) => {
      const order = state.byID[id];
      if (!order) return state;

      //? POST update to API, await success before proceeding

      return {
        byID: {
          ...state.byID,
          [id]: {
            ...order,
            status,
            updatedAt: new Date(),
          },
        },
      };
    });
  },

  // TODO: consider order summaries rather than full detail for each order (not currently necessary as orders are lean)
  // For OrdersPage: build array of all orders in store
  getAllOrders: () => {
    const { byID, allIDs } = get();
    return allIDs.map((id) => byID[id]);
  },

  // For OrderDetailPage: get one order by ID
  getOrderByID: (id) => {
    return get().byID[id];
  },
}));