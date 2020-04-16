import { OrderStatus } from 'domain/constants';

export interface Order {
  id: string,
  item: string,
  island: string,
  status: OrderStatus,
}

export type FetchMyOrders = () => Promise<Order[]>;

export type PlaceOrder = (opts: {
  entryId: string,
}) => Promise<void>;

export type CancelOrder = (opts: {
  orderId: string,
}) => Promise<void>;
