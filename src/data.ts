import { Entry } from 'core/entries';
import { Island } from 'core/island';
import { Item } from 'core/item';
import { Order } from 'core/order';

export const orders: Order[] = [];

export const items: Item[] = [
  {
    id: 'table',
    name: 'Table',
    price: 1000,
    image: 'https://orcz.com/images/8/86/AnimalCrossingNewHorizonsWoodenMiniTable.jpg',
    set: 'wooden',
  },
  {
    id: 'chair',
    name: 'Chair',
    price: 1000,
    image: 'https://orcz.com/images/8/86/AnimalCrossingNewHorizonsWoodenMiniTable.jpg',
    set: 'wooden',
  },
];

export const islands: Island[] = [
  {
    id: 'breman',
    name: 'Breman',
    user: 'filbert',
    comment: 'Please tip generously',
    online: true,
    utcTimeOffset: 0,
  },
];

export const entries: Entry[] = [];
