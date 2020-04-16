import { useIoc } from 'domain/ioc';
import { useQuery } from 'react-query';
import { FetchEntries } from 'core/entries';
import { mapQuery } from 'domain/utils';

const TTL = 1000 * 60;

export const GET_ENTRIES = 'getEntries';

export const getEntries = (
  opts: {
    id?: string,
    islandId?: string,
    itemId?: string,
  }
) => {
  const ioc = useIoc();
  const fetch = ioc.resolve<FetchEntries>();

  return useQuery(
    [ GET_ENTRIES, opts ],
    () => fetch(opts),
    {
      suspense: true,
      staleTime: TTL,
    },
  );
};

export const getEntry = (
  opts: {
    id?: string,
    islandId?: string,
    itemId?: string,
  }
) => {
  const query = getEntries(opts);
  return mapQuery((data) => data[0], query);
};
