import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Currency as CurrencyEnum } from 'domain/constants';

const useStyles = makeStyles({
  root: {
    width: '3em',
    margin: '-1em',
    paddingRight: '0.25em',
    paddingLeft: '0.25em',
  },
});

interface Props {
  currency: CurrencyEnum,
}

const Currency = (props: Props) => {
  const styles = useStyles();

  switch (props.currency) {
  case CurrencyEnum.BELLS:
    return (
      <img
        src="/assets/bells.png"
        className={styles.root}
      />
    );
  default:
    return null;
  }
};

export default Currency;
