import { OrderStatus, type Order } from "../types/order.types";
import { useOrdersStore } from "../state/ordersStore";

// -- Config

const INITIAL_BURST_COUNT = 5;
const INITIAL_BURST_INTERVAL_MS = 4000;       // 4s between burst orders
const STEADY_STATE_MIN_MS = 5 * 60 * 1000;    // 5 min
const STEADY_STATE_MAX_MS = 15 * 60 * 1000;   // 15 min
const MAX_ACTIVE_ORDERS = 45;
const STATUS_UPDATE_INTERVAL_MS = 30 * 1000;  // check for status updates every 30s

// -- Data pools

const CITIES: { city: string; code: string }[] = [
  { city: "London",     code: "GB" }, { city: "New York",   code: "US" },
  { city: "Tokyo",      code: "JP" }, { city: "Singapore",  code: "SG" },
  { city: "Dubai",      code: "AE" }, { city: "Sydney",     code: "AU" },
  { city: "Frankfurt",  code: "DE" }, { city: "São Paulo",  code: "BR" },
  { city: "Mumbai",     code: "IN" }, { city: "Toronto",    code: "CA" },
  { city: "Amsterdam",  code: "NL" }, { city: "Seoul",      code: "KR" },
  { city: "Nairobi",    code: "KE" }, { city: "Cairo",      code: "EG" },
  { city: "Bangkok",    code: "TH" }, { city: "Lisbon",     code: "PT" },
  { city: "Chicago",    code: "US" }, { city: "Osaka",      code: "JP" },
  { city: "Zürich",     code: "CH" }, { city: "Cape Town",  code: "ZA" },
];

// -- Helpers

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateOrderID(): string {
  const existing = Object.keys(useOrdersStore.getState().byID);
  let id: string;
  do {
    id = `OID-${randomInt(10000, 99999)}`;
  } while (existing.includes(id));
  return id;
}

function generateAddressPair(): { from: string; to: string } {
  const from = randomFrom(CITIES);
  let to = randomFrom(CITIES);
  while (to.city === from.city) to = randomFrom(CITIES);
  return {
    from: `${from.city}, ${from.code}`,
    to:   `${to.city}, ${to.code}`,
  };
}

function generateUserID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

// Expected delivery is half a day to 3 days from creation
function generateExpectedDelivery(createdAt: Date): Date {
  return new Date(createdAt.getTime() + randomInt(0.5, 3) * 86400000);
}

// -- Order creation

function createOrder(): Order {
  const now = new Date();
  const { from, to } = generateAddressPair();

  return {
    id:               generateOrderID(),
    userID:           generateUserID(),
    status:           OrderStatus.Pending,
    fromAddress:      from,
    toAddress:        to,
    expectedDelivery: generateExpectedDelivery(now),
    actualDelivery:   null,
    createdAt:        now,
    updatedAt:        now,
  };
}

// -- Status progression

const STATUS_PROGRESSION: Record<string, OrderStatus | null> = {
  [OrderStatus.Pending]:    OrderStatus.Processing,
  [OrderStatus.Processing]: OrderStatus.Shipped,
  [OrderStatus.Shipped]:    OrderStatus.Delivered,
  [OrderStatus.Delivered]:  null,
  [OrderStatus.Cancelled]:  null,
};

// Minimum time in current status before progressing (in ms)
const STATUS_MIN_DURATION_MS: Record<string, number> = {
  [OrderStatus.Pending]:    2 * 60 * 1000,    // 2 min
  [OrderStatus.Processing]: 3 * 60 * 1000,    // 3 min
  [OrderStatus.Shipped]:    5 * 60 * 1000,    // 5 min
};

function shouldCancelOrder(order: Order): boolean {
  if (
    order.status === OrderStatus.Delivered ||
    order.status === OrderStatus.Cancelled
  ) return false;

  // ~5% base cancellation chance, higher if overdue
  const now = new Date();
  const isOverdue =
    order.expectedDelivery &&
    now > order.expectedDelivery;
    // now > new Date(order.expectedDelivery);

  return Math.random() < (isOverdue ? 0.25 : 0.00005);
}

function runStatusUpdates(): void {
  const { byID, allIDs, updateOrderStatus } = useOrdersStore.getState();
  const now = new Date();

  for (const id of allIDs) {
    const order = byID[id];
    if (!order) continue;
    if (
      order.status === OrderStatus.Delivered ||
      order.status === OrderStatus.Cancelled
    ) continue;

    const timeSinceUpdate = now.getTime() - order.updatedAt.getTime();
    // const timeSinceUpdate = now.getTime() - new Date(order.updatedAt).getTime();
    const minDuration = STATUS_MIN_DURATION_MS[order.status] ?? Infinity;

    if (timeSinceUpdate < minDuration) continue;

    if (shouldCancelOrder(order)) {
      console.log("cancelling order:");
      console.log(order);
      updateOrderStatus(id, OrderStatus.Cancelled);
      continue;
    }

    const next = STATUS_PROGRESSION[order.status];
    if (!next) continue;

    // For shipped → delivered, respect expectedDelivery if set
    if (
      order.status === OrderStatus.Shipped &&
      order.expectedDelivery &&
      now < order.expectedDelivery
    ) continue;

    updateOrderStatus(id, next);
  }
}

// -- Active order count (excludes terminal states)

function getActiveOrderCount(): number {
  const { byID, allIDs } = useOrdersStore.getState();
  return allIDs.filter((id) => {
    const status = byID[id]?.status;
    return status !== OrderStatus.Delivered && status !== OrderStatus.Cancelled;
  }).length;
}

// -- Scheduling

function scheduleNextOrder(burstRemaining: number): void {
  if (burstRemaining > 0) {
    setTimeout(() => {
      maybeAddOrder();
      scheduleNextOrder(burstRemaining - 1);
    }, INITIAL_BURST_INTERVAL_MS);
  } else {
    const delay = randomInt(STEADY_STATE_MIN_MS, STEADY_STATE_MAX_MS);
    setTimeout(() => {
      maybeAddOrder();
      scheduleNextOrder(0);
    }, delay);
  }
}

function maybeAddOrder(): void {
  if (getActiveOrderCount() >= MAX_ACTIVE_ORDERS) return;
  const { addOrder } = useOrdersStore.getState();
  addOrder(createOrder());
}

// -- Entry point

export function startOrderGenerator(): void {
  // Initial burst — first order fires immediately, rest are staggered
  maybeAddOrder();
  scheduleNextOrder(INITIAL_BURST_COUNT - 1);

  // Status update loop runs independently
  setInterval(runStatusUpdates, STATUS_UPDATE_INTERVAL_MS);
}