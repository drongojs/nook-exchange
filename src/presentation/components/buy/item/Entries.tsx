import React from 'react';
import { getEntries } from 'domain/selectors/entries';
import {
  Item,
} from 'core/item';
import {
  List,
} from '@material-ui/core';
import {
  Alert,
} from '@material-ui/lab';
import { Entry as EntryType } from 'core/entries';
import Entry from './Entry';
import RequestDialog from './RequestDialog';

declare const entry: EntryType;

const Entries = ({ item }: { item: Item }) => {
  const entries = getEntries({ itemId: item.id }).data ?? [];

  if (!entries.length) {
    return (
      <div>
        <Alert severity="warning">
          Looks like we don't have this item available
        </Alert>
      </div>
    );
  }

  return (
    <>
      <List>
        <For
          each="entry"
          of={entries}
        >
          <Entry
            key={entry.island}
            entry={entry}
            item={item}
          />
        </For>
      </List>
      <RequestDialog/>
    </>
  );
};

export default Entries;
