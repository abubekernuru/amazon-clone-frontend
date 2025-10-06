import React, { createContext, useReducer, useEffect } from 'react';
import { initialState, reducer } from "../../Utility/reducer";
import { auth } from "../../Utility/firebase";

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

  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <DataContext.Provider value={[state, dispatch]}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
