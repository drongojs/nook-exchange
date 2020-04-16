export interface Island {
  id: string,
  name: string,
  user: string,
  comment: string,
  utcTimeOffset: number,
  online: boolean,
}

export type FetchIsland = (id: string) => Promise<Island>;

export type FetchMyIsland = () => Promise<Island>;

export type FetchOnlineStatus = (id: string) => Promise<boolean>;

export type FetchDodoCode = (orderId: string) => Promise<string>;
