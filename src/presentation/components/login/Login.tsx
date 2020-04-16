import React from 'react';
import {
  CardHeader,
  Card,
  CardContent,
  Grid,
  TextField,
  CardActions,
  Button,
  makeStyles,
} from '@material-ui/core';
import {
  Link as RouterLink, useLocation, useHistory,
} from 'react-router-dom';
import PageTemplate from '../common/PageTemplate';
import { getQueryParam } from 'domain/selectors/common';

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  content: {
    paddingLeft: '5rem',
    paddingRight: '5rem',
  },
  actions: {
    justifyContent: 'center',
  },
  login: {
    minWidth: '25%',
  },
}));

const Login = () => {
  const styles = useStyles();
  const { search } = useLocation();
  const history = useHistory();
  const path = getQueryParam('path') ?? '/';
  const handleLogin = () => {
    debugger;
    window.localStorage.setItem('logged-in', 'true');
    history.push(path);
  };

  return (
    <PageTemplate background={false}>
      <Grid container justify="center">
        <Grid item xs={6}>
          <Card>
            <CardHeader title="Log in" className={styles.header}/>
            <CardContent className={styles.content}>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    id="username"
                    label="Username"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="password"
                    label="Password"
                    type="password"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions className={styles.actions}>
              <Button
                variant="contained"
                className={styles.login}
                onClick={handleLogin}
              >
                Log in
              </Button>
              <Button
                variant="text"
                component={RouterLink}
                to={`/login/register${search}`}
              >
                Create an account
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </PageTemplate>
  );
};

export default Login;
