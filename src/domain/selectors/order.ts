import { useIoc } from 'domain/ioc';
import { useQuery } from 'react-query';
import { OrderStatus } from 'domain/constants';
import {
  FetchMyOrders,
} from 'core/order';
import { mapQuery } from 'domain/utils';

export const GET_ORDERS = 'getOrders';
const getOrders = () => {
  const ioc = useIoc();
  const fetch = ioc.resolve<FetchMyOrders>();

  return useQuery(
    GET_ORDERS,
    () => fetch(),
    {
      suspense: true,
      staleTime: 1000 * 30,
    },
  );
};

export const getOpenOrders = () => {
  return mapQuery((data) => data.filter((order) => {
    if (order.status === OrderStatus.CANCELLED) {
      return false;
    }
    if (order.status === OrderStatus.DELIVERED) {
      return false;
    }
    return true;
  }), getOrders());
};

export const getOrder = (orderId: string) => {
  return mapQuery((data) => data.find((order) => order.id === orderId), getOrders());
};

export const getOrderByExact = (itemId: string, islandId: string) => {
  return mapQuery((data) => data.find((order) => {
    return order.island === islandId && order.item === itemId;
  }), getOrders());
};

export const isOrderReady = (orderId: string) => {
  const order = getOrder(orderId).data;
  return order?.status === OrderStatus.READY;
};

export const isOrderOpen = (orderId: string) => {
  const order = getOrder(orderId).data;
  const status = order?.status;

  return status !== OrderStatus.CANCELLED && status !== OrderStatus.DELIVERED;
};
