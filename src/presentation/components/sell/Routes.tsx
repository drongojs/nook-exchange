import React, { lazy } from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router';
import { useAuth } from 'application/actions/auth';

const Catalogue = lazy(() => import('./catalogue/Catalogue'));
const PageNotFound = lazy(() => import('../common/PageNotFound'));

const BuyRoutes = () => {
  debugger;
  useAuth();

  return (
    <Switch>
      <Route path="/sell" exact={true}>
        <Redirect to="/sell/catalogue"/>
      </Route>
      <Route path="/sell/catalogue" exact={true}>
        <Catalogue/>
      </Route>
      <Route path="/">
        <PageNotFound/>
      </Route>
    </Switch>
  );
};

export default BuyRoutes;
