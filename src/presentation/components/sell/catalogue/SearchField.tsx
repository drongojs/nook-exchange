import React from 'react';
import { Grid, TextField, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

const SearchField = ({
  value,
  onChange,
}: {
  value: string,
  onChange: (e: any) => void,
}) => (
  <form onSubmit={(e) => e.preventDefault()}>
    <Grid container justify="center">
      <Grid item xs={12} md={8} lg={6}>
        <TextField
          id="search"
          label="Search"
          value={value}
          onChange={onChange}
          className={useStyles().root}
        />
      </Grid>
    </Grid>
  </form>
);

export default SearchField;
