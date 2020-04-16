import {
  useState,
  createElement,
  useCallback,
  createContext,
  useContext,
  ReactNode,
} from 'react';

interface ContextType {
  route: string,
  payload: any,
  setRoute: (key: string) => void,
  setPayload: (payload: any) => void,
}

const context = createContext<ContextType>({
  route: '',
  payload: void 0,
  setRoute: () => {},
  setPayload: () => {},
});

export const Provider = (props: { children?: ReactNode }) => {
  const [ route, setRoute ] = useState('');
  const [ payload, setPayload ] = useState('');
  
  return createElement(
    context.Provider,
    {
      value: {
        route,
        setRoute,
        payload,
        setPayload,
      },
    },
    props.children,
  );
};

const useDialog = (key: string) => {
  const {
    route,
    setRoute,
    payload,
    setPayload,
  } = useContext(context);

  const isOpen = route === key;
  const open = useCallback((payload?: any) => {
    setRoute(key);
    setPayload(payload);
  }, [ key, setRoute, setPayload ]);
  const close = useCallback(() => {
    setRoute('');
    setPayload(void 0);
  }, [ setRoute, setPayload ]);

  return {
    isOpen,
    open,
    close,
    payload,
  };
};

export default useDialog;
