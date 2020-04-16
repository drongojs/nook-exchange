import React from 'react';
import {
  ListItem,
  ListItemText,
  Paper,
} from '@material-ui/core';

const EntryPending = () => {
  return (
    <Paper>
      <ListItem dense>
        <ListItemText>Requesting...</ListItemText>
      </ListItem>
    </Paper>
  );
};

export default EntryPending;
