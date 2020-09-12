import React from 'react';

import {HudStore, AlertStore} from './stores'

const store = {
  hud: new HudStore(),
  alert: new AlertStore(),
}

const StoresContext = React.createContext(store);

export default StoresContext;

// Also write provider for older components
export const StoreProvider = ({children}) => {
  return (
    <StoresContext.Provider value={store}>{children}</StoresContext.Provider>
  );
};
