import React from 'react';
import Item from './Item';
import { getItem } from 'domain/selectors/item';
import { Entry } from 'core/entries';

interface Props {
  entry: Entry,
}

const EntryItem = ({ entry }: Props) => {
  const item = getItem(entry.item).data;

  if (item == null) {
    return null;
  }

  return (
    <Item item={item} entry={entry}/>
  );
};

export default EntryItem;
