import {
  QueryResult,
} from 'react-query';

export const mapQuery = <T, R>(
  fn: (t: T) => R,
  oldQuery: QueryResult<T>,
): QueryResult<R> => {
  if (oldQuery.status !== 'success') {
    return oldQuery as unknown as QueryResult<R>;
  }
  const {
    data: oldData,
    ...query
  } = oldQuery;

  const data = fn(oldData);

  return {
    ...query,
    data,
  } as unknown as QueryResult<R>;
};
