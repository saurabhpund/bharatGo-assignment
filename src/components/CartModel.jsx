import React from "react";
import { FaTimes, FaPlus, FaMinus } from "react-icons/fa";
import { useOrders } from "../context/orderContext";
import { useCart } from "../context/cartContext";
import { toast } from "react-toastify";

const CartModal = ({ open, onClose }) => {
  const { state: cartState, dispatch: cartDispatch } = useCart();
  const { dispatch: orderDispatch } = useOrders();

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) {
      cartDispatch({ type: "REMOVE_FROM_CART", payload: id });
    } else {
      cartDispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
    }
  };

  const totalPrice = cartState.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

const handleCheckout = () => {
  if (cartState.items.length === 0) {
    toast.info("Your cart is empty!");
    return;
  }

  const newOrder = {
    id: Date.now(),
    date: new Date().toLocaleString(),
    items: cartState.items,
    total: totalPrice,
  };

  orderDispatch({ type: "ADD_ORDER", payload: newOrder });
  cartDispatch({ type: "CLEAR_CART" });
  onClose();

  toast.success("✅ Order placed successfully!");
};


  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black opacity-10 z-40"
          onClick={onClose}
        ></div>
      )}

      {/* Cart Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black">
            <FaTimes />
          </button>
        </div>

        {/* Cart Items */}
        <div className="p-4 flex flex-col gap-4 overflow-y-auto h-[calc(100%-160px)]">
          {cartState.items.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">Your cart is empty 🛒</p>
          ) : (
            cartState.items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 border-b pb-3">
                <img
                  src={item.images?.[0]}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800 truncate">{item.title}</h3>
                  <p className="text-gray-600 text-sm">${item.price}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      className="p-1 rounded bg-gray-200 hover:bg-gray-300"
                    >
                      <FaMinus size={10} />
                    </button>
                    <span className="text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      className="p-1 rounded bg-gray-200 hover:bg-gray-300"
                    >
                      <FaPlus size={10} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-4">
          <div className="flex justify-between text-gray-800 font-semibold mb-3">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={cartState.items.length === 0}
            className={`w-full py-2 rounded-md text-white transition ${
              cartState.items.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-900"
            }`}
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartModal;
