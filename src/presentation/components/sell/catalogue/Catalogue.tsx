import React, { useEffect, Suspense } from 'react';
import { useHistory } from 'react-router';
import { useDebounce } from 'use-debounce';
import { Grid, makeStyles } from '@material-ui/core';
import PageTemplate from '../../common/PageTemplate';
import useInput from 'presentation/hooks/useInput';
import { getQueryParam } from 'domain/selectors/common';
import Items from './Items';
import Loader from '../../common/Loader';
import SearchField from './SearchField';

const useSearch = () => {
  const history = useHistory();
  const q = getQueryParam('q') ?? '';
  const [ value, onChange ] = useInput(q, { managed: true });
  const [ debounced ] = useDebounce(value, 250);

  useEffect(() => {
    if (debounced !== q) {
      history.replace(`/sell/catalogue?q=${encodeURIComponent(value)}`);
    }
  }, [ debounced ]);

  return [ value, onChange, debounced ] as [ string, typeof onChange, string ];
};

const useStyles = makeStyles({
  searchContainer: {
    marginBottom: '2rem',

  },
});

const Catalogue = () => {
  const [ value, onChange, debounced ] = useSearch();
  const styles = useStyles();

  return (
    <PageTemplate>
      <Grid
        container
        className="high"
        direction="column"
      >
        <Grid item className={styles.searchContainer}>
          <SearchField
            value={value}
            onChange={onChange}
          />          
        </Grid>
        <Grid item>
          <Suspense fallback={<Loader/>}>
            <Items search={debounced}/>
          </Suspense>
        </Grid>
      </Grid>
    </PageTemplate>
  );
};

export default Catalogue;
