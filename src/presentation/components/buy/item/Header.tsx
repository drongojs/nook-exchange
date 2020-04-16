import React from 'react';
import {
  Typography,
  makeStyles,
  Divider,
  Grid,
} from '@material-ui/core';
import { Item } from 'core/item';
import Price from '../../common/Price';
import { Currency } from 'domain/constants';

interface Props {
  item: Item,
}

const useStyles = makeStyles({
  image: {
    width: '5rem',
  },
  divider: {
    marginTop: '1rem',
    marginBottom: '2rem',
  },
  left: {
    paddingRight: '1rem',
  },
  right: {
    textAlign: 'left',
    paddingLeft: '1rem',
  },
});

const View = ({
  item: {
    name,
    image,
    price,
    set,
  },
}: Props) => {
  const styles = useStyles();

  return (
    <>
      <Grid container alignItems="center" justify="space-evenly">
        <Grid item>
          <img src={image} className={styles.image}/>
        </Grid>
        <Grid item>
          <Typography variant="h4">
            {name}
          </Typography>
        </Grid>
        <Grid item>

        </Grid>
        <Grid item>
          <Typography variant="caption" color="textSecondary">
            <Grid container>
              <Grid item xs={6}>Set:</Grid>
              <Grid item xs={6}>{set}</Grid>
              <Grid item xs={6}>Price:</Grid>
              <Grid item xs={6}>
                <Price
                  currency={Currency.BELLS}
                  amount={price}
                />
              </Grid>
            </Grid>
          </Typography>
        </Grid>
      </Grid>
      <Divider className={styles.divider}/>
    </>
  );
};

export default View;
