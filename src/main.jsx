import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ProductsProvider } from "./context/productContext.jsx";
import { CartProvider } from "./context/cartContext.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import { OrdersProvider } from "./context/orderContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <OrdersProvider>
        <CartProvider>
          <ProductsProvider>
            <App />
            <ToastContainer
              position="top-right"
              autoClose={3000} 
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </ProductsProvider>
        </CartProvider>
      </OrdersProvider>
    </AuthProvider>
  </StrictMode>
);
