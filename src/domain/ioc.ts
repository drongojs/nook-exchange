import jpex, { JpexInstance } from 'jpex';
import { createContext, useContext } from 'react';

const ioc = jpex.extend();

const context = createContext<JpexInstance>(ioc);

export const Provider = context.Provider;

export const useIoc = () => useContext(context);

export default ioc;
