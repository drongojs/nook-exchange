import { useIoc } from 'domain/ioc';
import { useMutation, queryCache } from 'react-query';
import { PlaceOrder, CancelOrder } from 'core/order';
import { GET_ORDERS } from 'domain/selectors/order';

export const usePlaceOrder = () => {
  const ioc = useIoc();
  return useMutation(
    (entryId: string) => {
      const service = ioc.resolve<PlaceOrder>();
      return service({ entryId });
    },
    {
      onSuccess: () => {
        queryCache.refetchQueries(GET_ORDERS, { force: true });
      },
    },
  );
};

export const useCancelOrder = () => {
  const ioc = useIoc();
  
  return useMutation(
    (orderId: string) => {
      const service = ioc.resolve<CancelOrder>();
      return service({ orderId });
    },
    {
      onSuccess: () => {
        queryCache.refetchQueries(GET_ORDERS, { force: true });
      },
    }
  );
};
