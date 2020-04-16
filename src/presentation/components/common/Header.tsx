import React from 'react';
import { Typography, Box, makeStyles } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    textDecoration: 'none',
  },
  logo: {
    width: '5rem',
  },
  text: {
    marginLeft: '1rem',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'FinkHeavy',
    textShadow: '1px 0px 0px #a67332, 0px 1px 0px #a67332, -1px 0px 0px #a67332, 0px -1px 0px #a67332',
    lineHeight: 1,
  },
  nook: {},
  exchange: {
    paddingLeft: '2rem',
  },
});

const Header = () => {
  const styles = useStyles();

  return (
    <Typography>
      <Box color="#f5dd42" component={RouterLink} to="/" className={styles.link}>
        <h1 className={styles.root}>
          <img
            src="/assets/ac_leaf.png"
            className={styles.logo}
          />
          <div className={styles.text}>
            <span className={styles.nook}>Nook</span>
            <span className={styles.exchange}>Exchange</span>
          </div>
        </h1>
      </Box>
    </Typography>
  );
};

export default Header;
