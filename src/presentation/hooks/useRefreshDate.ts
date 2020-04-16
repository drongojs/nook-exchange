import { useState, useEffect, useMemo } from 'react';

const useRefreshDate = (offset: number = 0) => {
  const [ now, setNow ] = useState(Date.now());

  useEffect(() => {
    const handle = setInterval(() => {
      setNow(Date.now());
    }, 30000);

    return () => {
      clearInterval(handle);
    };
  }, []);

  const date = useMemo(() => new Date(now + offset), [ now, offset ]);

  return date;
};

export default useRefreshDate;
