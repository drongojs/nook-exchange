import { useState, useCallback, useEffect } from 'react';

const useInput = <T>(initial: T, opts: {
  managed?: boolean,
  parse?: (v: string) => T,
} = {}): [ T, (e: any) => void ] => {
  const [ value, setValue ] = useState(initial);
  const onChange = useCallback((e: any) => {
    setValue(e.target.value);
  }, [ setValue ]);

  if (opts.managed) {
    useEffect(() => {
      if (value !== initial) {
        setValue(initial);
      }
    }, [ initial ]);
  }

  return [ value, onChange ];
};

export default useInput;
