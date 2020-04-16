import React, { lazy } from 'react';
import { Grid } from '@material-ui/core';
import PageTemplate from '../common/PageTemplate';
import { getOpenOrders } from 'domain/selectors/order';
import Search from './Search';

const Orders = lazy(() => import('../order/orders/Orders'));

const Home = () => {
  const hasOrders = (getOpenOrders().data ?? []).length > 0;
  const justify = hasOrders ? 'flex-start' : 'space-around';

  return (
    <PageTemplate>
      <Grid
        container
        className="high"
        direction="column"
        justify={justify}
      >
        <Grid item>
          <Search/>
        </Grid>
        <If condition={hasOrders}>
          <Grid item>
            <Orders/>
          </Grid>
        </If>
      </Grid>
    </PageTemplate>
  );
};

export default Home;
