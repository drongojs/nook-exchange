import React, { lazy } from 'react';
import {
  Switch,
  Route,
} from 'react-router';

const Login = lazy(() => import('./Login'));
const Register = lazy(() => import('./Register'));
const Logout = lazy(() => import('./Logout'));
const PageNotFound = lazy(() => import('../common/PageNotFound'));

const LoginRoutes = () => (
  <Switch>
    <Route path="/login" exact={true}>
      <Login/>
    </Route>
    <Route path="/login/register" exact={true}>
      <Register/>
    </Route>
    <Route path="/login/logout" exact={true}>
      <Logout/>
    </Route>
    <Route path="/">
      <PageNotFound/>
    </Route>
  </Switch>
);

export default LoginRoutes;
