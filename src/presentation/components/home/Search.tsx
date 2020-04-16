import React, { useState, useCallback } from 'react';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import {
  TextField,
  InputAdornment,
  Button,
  Grid,
  Typography,
  Link,
  makeStyles,
} from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

interface Props {
  value: string,
  onChange: (evt: any) => void,
  onSubmit: (evt: any) => void,
}

const useStyles = makeStyles({
  input: {
    width: '100%',
  },
});

const PureSearch = ({
  value,
  onChange,
  onSubmit,
}: Props) => (
  <form onSubmit={onSubmit}>
    <Grid container justify="center">
      <Grid item xs={12} md={8} lg={6}>
        <TextField
          id="search"
          label="Search for furniture"
          value={value}
          onChange={onChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button type="submit">
                  <SearchIcon/>
                </Button>
              </InputAdornment>
            ),
          }}
          className={useStyles().input}
        />
        <Typography component="p" color="textSecondary">
          Search for an item or <Link component={RouterLink} to="/sell">list your own</Link>!
        </Typography>
      </Grid>
    </Grid>
  </form>
);

const enhance = (C: React.FunctionComponent<Props>) => () => {
  const [ value, setValue ] = useState('');
  const history = useHistory();

  const onSubmit = useCallback((evt: any) => {
    evt.preventDefault();
    history.push(`/buy?q=${encodeURIComponent(value)}`);
  }, [ value ]);

  const onChange = useCallback((evt: any) => {
    setValue(evt.target.value);
  }, [ setValue ]);

  const props = {
    value,
    onChange,
    onSubmit,
  };

  return C(props);
};

const Search = enhance(PureSearch);

export default Search;
