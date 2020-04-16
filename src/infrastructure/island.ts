import ioc from 'domain/ioc';
import * as data from '../data';
import { FetchIsland, FetchDodoCode, FetchOnlineStatus, FetchMyIsland } from 'core/island';
import { FetchMyOrders } from 'core/order';
import { FetchEntries } from 'core/entries';
import { OrderStatus } from 'domain/constants';

ioc.factory<FetchIsland>(() => (id) => new Promise((resolve, reject) => {
  setTimeout(() => {
    const island = data.islands.find((island) => island.id === id);

    if (!island) {
      return reject(new Error('island does not exist'));
    }

    resolve(island);
  }, 1000);
}));

ioc.factory<FetchMyIsland>((fetchIsland: FetchIsland) => () => {
  return fetchIsland('breman');
});

ioc.factory<FetchOnlineStatus>((fetchIsland: FetchIsland) => async(id) => {
  const island = await fetchIsland(id);

  return island.online;
});

ioc.factory<FetchDodoCode>((
  fetchOrders: FetchMyOrders,
  fetchIsland: FetchIsland,
  fetchEntires: FetchEntries,
) => async(orderId) => {
  const orders = await fetchOrders();
  const order = orders.find((order) => order.id === orderId);
  if (!order) {
    throw new Error('not found');
  }
  const island = await fetchIsland(order?.island ?? '');
  const entry = (await fetchEntires({
    islandId: order?.island,
    itemId: order?.item,
  }))[0];

  if (!island || !entry) {
    throw new Error('not found');
  }
  if (order.status !== OrderStatus.READY) {
    throw new Error('order is not ready');
  }
  if (!island.online) {
    throw new Error('island is not online');
  }

  return `${island.id}-94756`;
});
