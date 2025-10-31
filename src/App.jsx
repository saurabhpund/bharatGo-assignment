import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Order from "./components/Order";
import Login from "./components/Login";
import Signup from "./components/Signup";
import OrderDetail from "./components/OrderItem";
import Account from "./components/Account";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/category/:slug" element={<Home />} />
        <Route path="/order" element={<Order />} />
        <Route path="/order/:id" element={<OrderDetail />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
