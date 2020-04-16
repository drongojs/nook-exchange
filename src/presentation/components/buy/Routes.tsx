import React, { lazy } from 'react';
import {
  Switch,
  Route,
} from 'react-router';

const Search = lazy(() => import('./search/Search'));
const ItemView = lazy(() => import('./item/View'));
const PageNotFound = lazy(() => import('../common/PageNotFound'));

const BuyRoutes = () => (
  <Switch>
    <Route
      path="/buy"
      exact={true}
    >
      <Search/>
    </Route>
    <Route
      path="/buy/item/:item"
      exact={true}
    >
      <ItemView/>
    </Route>
    <Route path="/">
      <PageNotFound/>
    </Route>
  </Switch>
);

export default BuyRoutes;
