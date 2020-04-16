import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import {
  Switch,
  Route,
} from 'react-router';
import { CssBaseline, makeStyles } from '@material-ui/core';
import { Provider as DialogProvider } from '../hooks/useDialog';
import PageLoader from './common/PageLoader';
import Net from './common/Net';
import Home from './home/Home';

const BuyRoutes = lazy(() => import('./buy/Routes'));
const SellRoutes = lazy(() => import('./sell/Routes'));
const LoginRoutes = lazy(() => import('./login/Routes'));
const Dodo = lazy(() => import('./order/Dodo'));
const PageNotFound = lazy(() => import('./common/PageNotFound'));

const useStyles = makeStyles({
  root: {
    backgroundImage: 'url(/assets/grass.png)',
    backgroundSize: '4%',
    
  },
  rootOverlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

const App = () => {
  const styles = useStyles();

  return (
    <CssBaseline>
      <DialogProvider>
        <Router>
          <div className={`${styles.root} high`}>
            <div className={`${styles.rootOverlay} high`}>
              <Net>
                <Suspense fallback={<PageLoader/>}>
                  <Switch>
                    <Route
                      path="/"
                      exact={true}
                    >
                      <Home/>
                    </Route>
                    <Route path="/order/:order">
                      <Dodo/>
                    </Route>
                    <Route path="/buy">
                      <BuyRoutes/>
                    </Route>
                    <Route path="/sell">
                      <SellRoutes/>
                    </Route>
                    <Route path="/login">
                      <LoginRoutes/>
                    </Route>
                    <Route path="/">
                      <PageNotFound/>
                    </Route>
                  </Switch>
                </Suspense>
              </Net>
            </div>
          </div>
        </Router>
      </DialogProvider>
    </CssBaseline>
  );
};

export default App;
