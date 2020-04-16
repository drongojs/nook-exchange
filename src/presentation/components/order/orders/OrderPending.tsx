import React from 'react';
import {
  Paper,
  ListItem,
} from '@material-ui/core';
import {
  Skeleton,
} from '@material-ui/lab';

const Order = () => {
  return (
    <Paper>
      <ListItem disableGutters component={Skeleton}/>
    </Paper>
  );
};

export default Order;
