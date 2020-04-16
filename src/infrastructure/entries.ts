import ioc from 'domain/ioc';
import { FetchEntries, SaveEntry, Entry, DeleteEntry } from 'core/entries';
import * as data from '../data';

ioc.factory<FetchEntries>(() => ({
  id,
  islandId,
  itemId,
}) => new Promise((resolve) => {
  setTimeout(() => {
    let str = localStorage.getItem('entries');
    if (!str) {
      str = JSON.stringify(data.entries);
      localStorage.setItem('entries', str);
    }
    const entries: Entry[] = JSON.parse(str);

    const x = entries.filter((entry) => {
      if (id && id !== entry.id) {
        return false;
      }
      if (islandId && islandId !== entry.island) {
        return false;
      }
      if (itemId && itemId !== entry.item) {
        return false;
      }
      return true;
    });

    resolve(x);
  }, 1000);
}));

ioc.factory<SaveEntry>((fetch: FetchEntries) => async({
  entry: values,
}) => {
  const entries = await fetch({});
  if (values.id) {
    const entry = entries.find((entry) => entry.id === values.id);
    if (!entry) {
      throw new Error('Not found');
    }
    Object.assign(entry, values);
  } else if (values.item) {
    const island = 'breman';
    const entry: Entry = {
      id: `${island}-${values.item}`,
      island,
      active: false,
      ...values,
    };
    entries.push(entry);
  } else {
    throw new Error('Invalid arguments. Either an id or an island/item should be given');
  }

  localStorage.setItem('entries', JSON.stringify(entries));
});

ioc.factory<DeleteEntry>((fetch: FetchEntries) => async({ id }) => {
  const entries = await fetch({});
  const ids = entries.map((entry) => entry.id);
  const i = ids.indexOf(id);
  if (i < 0) {
    throw new Error('Not found');
  }

  entries.splice(i, 1);

  localStorage.setItem('entries', JSON.stringify(entries));
});
