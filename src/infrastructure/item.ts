import ioc from 'domain/ioc';
import * as data from '../data';
import { FetchItem, SearchItems } from 'core/item';

ioc.factory<SearchItems>(() => (q) => new Promise((resolve) => {
  setTimeout(() => {
    const query = q.toLowerCase();
    const x = data.items.filter((item) => {
      if (!query) {
        return true;
      }
      if (item.name.toLowerCase().includes(query)) {
        return true;
      }
      if (item.set.toLowerCase().includes(query)) {
        return true;
      }
    });
    resolve(x);
  }, 1000);
}));

ioc.factory<FetchItem>(() => (id) => new Promise((resolve) => {
  setTimeout(() => {
    const x = data.items.find((item) => item.id === id);
    resolve(x);
  }, 1000);
}));
