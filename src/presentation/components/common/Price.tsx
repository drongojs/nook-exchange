import React from 'react';
import Currency from './Currency';

interface Props {
  amount: number,
  currency: string,
}

const Price = (props: Props) => {
  const currency = <Currency currency={props.currency}/>;
  const amount = props.amount.toLocaleString();
  return (
    <>
      {currency} {amount}
    </>
  );
};

export default Price;
