import { useIoc } from 'domain/ioc';
import { useQuery } from 'react-query';
import { FetchIsland, FetchDodoCode, FetchOnlineStatus, FetchMyIsland } from 'core/island';

const TTL = 1000 * 60;

export const GET_ISLAND = 'getIsland';

export const getIsland = (islandId: string) => {
  const ioc = useIoc();
  const fetch = ioc.resolve<FetchIsland>();

  return useQuery(
    [ GET_ISLAND, islandId ],
    () => fetch(islandId),
    {
      suspense: true,
      staleTime: TTL,
    }
  );
};

export const GET_MY_ISLAND = 'getMyIsland';
export const getMyIsland = () => {
  const ioc = useIoc();
  const fetch = ioc.resolve<FetchMyIsland>();

  return useQuery(
    [ GET_MY_ISLAND ],
    () => fetch(),
    {
      suspense: true,
      staleTime: TTL,
    }
  );
};

export const GET_ISLAND_STATUS = 'getIslandStatus';
export const isIslandOnline = (islandId: string) => {
  const ioc = useIoc();
  const fetch = ioc.resolve<FetchOnlineStatus>();

  return useQuery(
    [ GET_ISLAND_STATUS, islandId ],
    () => fetch(islandId),
    {
      staleTime: 0,
      refetchInterval: 1000 * 30,
      suspense: true,
    },
  ).data ?? false;
};

export const GET_DODO_CODE = 'getDodoCode';
export const getDodoCode = (orderId: string) => {
  const ioc = useIoc();
  const fetch = ioc.resolve<FetchDodoCode>();

  return useQuery(
    [ GET_DODO_CODE, orderId ],
    () => fetch(orderId),
    {
      suspense: true,
      staleTime: 0,
      cacheTime: 0,
      refetchInterval: 10000,
    },
  );
};
