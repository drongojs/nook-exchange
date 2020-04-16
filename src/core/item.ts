export interface Item {
  id: string,
  name: string,
  set: string,
  image: string,
  price: number,
}

export type SearchItems = (query: string) => Promise<Item[]>;

export type FetchItem = (id: string) => Promise<Item>;
