export interface Entry {
  id: string,
  island: string,
  item: string,
  active: boolean,
  price?: number,
  currency?: string,
}

export type FetchEntries = (opts: {
  id?: string,
  islandId?: string,
  itemId?: string,
}) => Promise<Entry[]>;

export type SaveEntry = (opts: {
  entry: Partial<Entry>,
}) => Promise<void>;

export type DeleteEntry = (opts: { id: string }) => Promise<void>;
