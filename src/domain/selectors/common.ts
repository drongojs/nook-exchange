import { useLocation } from 'react-router';

export const getQueryParam = (key: string) => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const value = params.get(key) as string;
  return value;
};
