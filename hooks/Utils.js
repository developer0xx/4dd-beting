import React from 'react';
import StoresContext from '../StoresContext';

const useStores = () => {
  return React.useContext(StoresContext);
};


export {useStores};
