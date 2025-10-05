import { Type } from './action.type';

export const initialState = {
  basket: [],
  user: null,
  isAuthenticated: false
};

export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET:
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      );

      if (existingItem) {
        return {
          ...state,
          basket: state.basket.map((item) =>
            item.id === action.item.id
              ? { ...item, qty: (item.qty || 1) + 1 }
              : item
          )
        };
      } else {
        return {
          ...state,
          basket: [...state.basket, { ...action.item, qty: 1 }]
        };
      }

    case Type.DECREASE_QTY:
      return {
        ...state,
        basket: state.basket.map((item) =>
          item.id === action.id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
      };

    case Type.REMOVE_FROM_BASKET:
      return {
        ...state,
        basket: state.basket.filter((item) => item.id !== action.id)
      };

      case Type.SET_USER:
        return {
          ...state,
          user: action.user,
          isAuthenticated: !!action.user
        }

    default:
      return state;
  }
};
