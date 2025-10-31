import React from "react";
import { useParams, Link } from "react-router-dom";
import { useOrders } from "../context/orderContext";
import { FaCalendarAlt, FaBox } from "react-icons/fa";

const OrderDetail = () => {
  const { id } = useParams();
  const { state } = useOrders();

  const order = state.orders.find((o) => o.id.toString() === id);

  if (!order)
    return (
      <div className="text-center mt-24">
        <p className="text-gray-500 text-lg">Order not found.</p>
        <Link to="/orders" className="text-blue-500 underline mt-4 inline-block">
          Go back
        </Link>
      </div>
    );

  const totalPrice = order.items
    .reduce((sum, item) => sum + item.quantity * item.price, 0)
    .toFixed(2);

  return (
    <section className="container mx-auto max-w-4xl mt-20 px-4">
      <Link
        to="/order"
        className="text-blue-500 underline mb-6 inline-block"
      >
        &larr; Back to Orders
      </Link>

      <h1 className="text-3xl font-bold mb-6 text-gray-900">Order Details</h1>

      {/* Order Summary */}
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-6 gap-2 text-gray-700">
        <span className="flex items-center gap-2">
          <FaCalendarAlt className="text-gray-400" /> {new Date(order.date).toLocaleString()}
        </span>
        <span className="flex items-center gap-2">
          <FaBox className="text-gray-400" /> Total Items: {order.items.length}
        </span>
      </div>

      {/* Items List */}
      <div className="bg-white shadow-lg rounded-lg divide-y">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-4">
            {item.images?.[0] && (
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-md"
              />
            )}
            <div className="flex-1">
              <h2 className="font-semibold text-gray-800 text-lg">{item.title}</h2>
              <p className="text-gray-600 mt-1">
                Quantity: <span className="font-medium">{item.quantity}</span>
              </p>
              <p className="text-gray-600 mt-1">
                Price: ${item.price.toFixed(2)}
              </p>
            </div>
            <div className="text-right font-semibold text-gray-800">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}

        {/* Total */}
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-b-lg font-bold text-lg">
          <span>Total:</span>
          <span>${totalPrice}</span>
        </div>
      </div>
    </section>
  );
};

export default OrderDetail;
