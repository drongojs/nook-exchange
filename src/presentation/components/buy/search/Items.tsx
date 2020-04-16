import React from 'react';
import {
  Grid,
} from '@material-ui/core';
import { Item as ItemType } from 'core/item';
import { searchItems } from 'domain/selectors/item';
import Item from './Item';
import { Alert } from '@material-ui/lab';

interface Props {
  search: string,
}

declare const item: ItemType;

const Items = ({ search }: Props) => {
  const items = searchItems(search).data ?? [];

  if (!search) {
    return (
      <div>
        <Alert severity="info">
          Search for some furniture
        </Alert>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div>
        <Alert severity="warning">
          Nothing found...
        </Alert>
      </div>
    );
  }

  return (
    <div>
      <Grid container spacing={2}>
        <For
          each="item"
          of={items}
        >
          <Item key={item.id} {...item}/>
        </For>
      </Grid>
    </div>
  );
};

export default Items;
