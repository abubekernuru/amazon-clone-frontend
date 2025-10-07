import React, { createContext, useReducer, useEffect } from 'react';
import { auth } from "../../Utility/firebase";

export const DataContext = createContext();

// Initial state
export const initialState = {
  basket: [],
  user: null,
};

// Reducer function
export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    
    case "ADD_TO_BASKET":
      const existingItemIndex = state.basket.findIndex(
        item => item.id === action.item.id
      );
      
      if (existingItemIndex >= 0) {
        const updatedBasket = [...state.basket];
        updatedBasket[existingItemIndex].qty += action.item.qty || 1;
        return {
          ...state,
          basket: updatedBasket,
        };
      } else {
        return {
          ...state,
          basket: [...state.basket, { ...action.item, qty: action.item.qty || 1 }],
        };
      }
    
    case "REMOVE_FROM_BASKET":
      const filteredBasket = state.basket.filter(item => item.id !== action.id);
      return {
        ...state,
        basket: filteredBasket,
      };
    
    case "UPDATE_QUANTITY":
      const updatedBasket = state.basket.map(item =>
        item.id === action.id
          ? { ...item, qty: Math.max(0, action.qty) }
          : item
      ).filter(item => item.qty > 0);
      
      return {
        ...state,
        basket: updatedBasket,
      };
    
    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };
    
    default:
      return state;
  }
};

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    // Initialize state from localStorage
    try {
      const savedBasket = localStorage.getItem('amazon_clone_basket');
      const savedUser = localStorage.getItem('amazon_clone_user');
      
      return {
        basket: savedBasket ? JSON.parse(savedBasket) : [],
        user: savedUser ? JSON.parse(savedUser) : null,
      };
    } catch (error) {
      console.error('Error loading saved state:', error);
      return initialState;
    }
  });

  // Save basket to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('amazon_clone_basket', JSON.stringify(state.basket));
    } catch (error) {
      console.error('Error saving basket to localStorage:', error);
    }
  }, [state.basket]);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    try {
      if (state.user) {
        localStorage.setItem('amazon_clone_user', JSON.stringify(state.user));
      } else {
        localStorage.removeItem('amazon_clone_user');
      }
    } catch (error) {
      console.error('Error saving user to localStorage:', error);
    }
  }, [state.user]);

  // Auth state listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in
        const userData = {
          uid: authUser.uid,
          email: authUser.email,
          displayName: authUser.displayName,
          emailVerified: authUser.emailVerified,
        };
        
        dispatch({
          type: "SET_USER",
          user: userData,
        });
      } else {
        // User is signed out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  return (
    <DataContext.Provider value={[state, dispatch]}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;