import React from 'react';
import { useRouteMatch } from 'react-router';
import { getItem } from 'domain/selectors/item';
import PageTemplate from '../../common/PageTemplate';
import Entries from './Entries';
import Header from './Header';

const View = () => {
  const itemId = useRouteMatch<{ item: string }>().params.item;
  const item = getItem(itemId).data;

  if (item == null) {
    return null;
  }

  return (
    <PageTemplate>
      <Header item={item}/>
      <Entries item={item}/>
    </PageTemplate>
  );
};

export default View;
