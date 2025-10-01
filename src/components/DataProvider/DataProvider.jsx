import React, { createContext, useReducer, useEffect } from 'react';
import { initialState, reducer } from "../../Utility/reducer";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, init => {
    try {
      const raw = localStorage.getItem('basket');
      return raw ? { ...init, basket: JSON.parse(raw) } : init;
    } catch {
      return init;
    }
  });

  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(state.basket));
  }, [state.basket]);

  return <DataContext.Provider value={[state, dispatch]}>{children}</DataContext.Provider>;
};

export default DataProvider;
