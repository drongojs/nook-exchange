import React from 'react';
import {
  Grid,
} from '@material-ui/core';
import { Entry as EntryType } from 'core/entries';
import { Item as ItemType } from 'core/item';
import { searchItems } from 'domain/selectors/item';
import { getEntries } from 'domain/selectors/entries';
import { getMyIsland } from 'domain/selectors/island';
import Item from './Item';
import EntryItem from './EntryItem';
import { Alert } from '@material-ui/lab';

interface Props {
  search: string,
}

declare const entry: EntryType;
declare const record: {
  item: ItemType,
  entry: EntryType | undefined,
};

const Items = ({ search }: Props) => {
  const island = getMyIsland();
  const entries = getEntries({ islandId: island.data?.id }).data ?? [];
  const items = searchItems(search).data ?? [];
  const records = items.map((item) => {
    const entry = entries.find((entry) => entry.item === item.id);
    return {
      item,
      entry,
    };
  });

  if (!search && !entries.length) {
    return (
      <div>
        <Alert severity="info">
          Search for furniture to add to your catalogue
        </Alert>
      </div>
    );
  }

  if (!records.length) {
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
        <Choose>
          <When condition={Boolean(search)}>
            <For each="record" of={records}>
              <Item key={record.item.id} item={record.item} entry={record.entry}/>
            </For>
          </When>
          <Otherwise>
            <For each="entry" of={entries}>
              <EntryItem key={entry.id} entry={entry}/>
            </For>
          </Otherwise>
        </Choose>
      </Grid>
    </div>
  );
};

export default Items;
