  import  { createContext, useContext, useReducer, useEffect } from "react";
  import { API_URL } from "../constant";
  import { useParams } from "react-router-dom";

  // Initial state
  const initialState = {
    loading: false,
    error: null,
    products: [], 
  };

  const ProductsContext = createContext(initialState);

  const productsReducer = (state, action) => {
    switch (action.type) {
      case "FETCH_START":
        return { ...state, loading: true, error: null };
      case "FETCH_SUCCESS":
        return { ...state, loading: false, products: action.payload };
      case "FETCH_ERROR":
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const ProductsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(productsReducer, initialState);
    const params = useParams();
    
    useEffect(() => {
      const fetchProducts = async () => {
        dispatch({ type: "FETCH_START" });
        try {
          const response = await fetch(API_URL);
          const data = await response.json();
          dispatch({ type: "FETCH_SUCCESS", payload: data });
        } catch (err) {
          dispatch({ type: "FETCH_ERROR", payload: err.message });
          console.log(err)
        }
      };

      fetchProducts();
    }, []);

    return (
      <ProductsContext.Provider value={{ state, dispatch }}>
        {children}
      </ProductsContext.Provider>
    );
  };

  export const useProducts = () => useContext(ProductsContext);
