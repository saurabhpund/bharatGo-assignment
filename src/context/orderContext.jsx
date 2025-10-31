import React, { createContext, useContext, useReducer } from "react";

// Initial state
const initialState = {
  loading: false,
  error: null,
  orders: [], // each order: { id, items: [{id, title, price, quantity}], date, total, status }
};

// Create context
const OrdersContext = createContext(initialState);

// Reducer
const ordersReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ORDER":
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };

    case "REMOVE_ORDER":
      return {
        ...state,
        orders: state.orders.filter((order) => order.id !== action.payload),
      };

    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    case "CLEAR_ORDERS":
      return { ...state, orders: [] };

    default:
      return state;
  }
};


// Provider
export const OrdersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ordersReducer, initialState);

  return (
    <OrdersContext.Provider value={{ state, dispatch }}>
      {children}
    </OrdersContext.Provider>
  );
};

// Custom hook
export const useOrders = () => useContext(OrdersContext);
