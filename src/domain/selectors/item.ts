import { useIoc } from 'domain/ioc';
import { useQuery } from 'react-query';
import { FetchItem, SearchItems } from 'core/item';

const TTL = Infinity;

export const SEARCH_ITEMS = 'searchItems';

export const searchItems = (q: string) => {
  const ioc = useIoc();
  const search = ioc.resolve<SearchItems>();

  return useQuery(
    [ SEARCH_ITEMS, q ],
    () => search(q),
    {
      suspense: true,
      staleTime: TTL,
      cacheTime: Infinity,
    },
  );
};

export const GET_ITEM = 'getItem';
export const getItem = (itemId: string) => {
  const ioc = useIoc();
  const fetch = ioc.resolve<FetchItem>();

  return useQuery(
    [ GET_ITEM, itemId ],
    () => fetch(itemId),
    {
      suspense: true,
      staleTime: TTL,
      cacheTime: Infinity,
    },
  );
};
