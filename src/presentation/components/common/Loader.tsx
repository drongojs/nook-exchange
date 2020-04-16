import React from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Loader = () => (
  <div className={useStyles().root}>
    <CircularProgress
      color="inherit"
      size="5rem"
    />
  </div>
);

export default Loader;
