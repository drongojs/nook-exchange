import { useState, useCallback } from 'react';

const useToggle = (initialState: boolean = false) => {
  const [ active, setActive ] = useState(initialState);
  const toggle = useCallback(() => setActive(!active), [ active, setActive ]);

  return [ active, toggle ] as [ boolean, typeof toggle ];
};

export default useToggle;
