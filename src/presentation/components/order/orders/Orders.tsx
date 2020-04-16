import React, { Suspense } from 'react';
import {
  Typography,
  List,
} from '@material-ui/core';
import Order from './Order';
import { getOpenOrders } from 'domain/selectors/order';
import OrderPending from './OrderPending';
import CancelDialog from './CancelDialog';

declare const id: string;

const Orders = () => {
  const ids = (getOpenOrders().data ?? []).map((order) => order.id);

  return (
    <div>
      <Typography variant="h5" style={{ marginTop: '2em', marginBottom: '1em' }}>
        Purchases
      </Typography>
      <List>
        <For each="id" of={ids}>
          <Suspense key={id} fallback={<OrderPending/>}>
            <Order id={id}/>
          </Suspense>
        </For>
      </List>
      <CancelDialog/>
    </div>
  );
};

export default Orders;
