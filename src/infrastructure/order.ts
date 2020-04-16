import ioc from 'domain/ioc';
import {
  FetchMyOrders,
  PlaceOrder,
  CancelOrder,
} from 'core/order';
import * as data from '../data';
import { OrderStatus } from 'domain/constants';

ioc.factory<FetchMyOrders>(() => () => new Promise((resolve) => {
  setTimeout(() => {
    let orders = localStorage.getItem('orders');
    if (!orders) {
      orders = JSON.stringify(data.orders);
      localStorage.setItem('orders', orders);
    }
    resolve(JSON.parse(orders));
  }, 1000);
}));

ioc.factory<PlaceOrder>((fetchOrders: FetchMyOrders) => async({ entryId }) => {
  const orders = await fetchOrders();
  const entry = data.entries.find((entry) => entry.id === entryId);
  if (entry == null) {
    throw new Error('Not found');
  }
  orders.push({
    id: `${entry.id}-${Math.random() * 1000}`,
    island: entry.island,
    item: entry.item,
    status: OrderStatus.REQUESTED,
  });

  localStorage.setItem('orders', JSON.stringify(orders));
});

ioc.factory<CancelOrder>((fetchOrders: FetchMyOrders) => async({ orderId }) => {
  const orders = await fetchOrders();
  const order = orders.find((order) => order.id === orderId);
  if (order == null) {
    throw new Error('not found');
  }

  order.status = OrderStatus.CANCELLED;

  localStorage.setItem('orders', JSON.stringify(orders));
});
