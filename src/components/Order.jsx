import React from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaShoppingBag } from "react-icons/fa";
import EmptyBox from "../assets/box.png";
import { useOrders } from "../context/orderContext";

const Order = () => {
  const { state } = useOrders();

  if (!state.orders?.length)
    return (
      <div className="wrapper mt-15 flex flex-col items-center max-w-4xl mx-auto">
        <picture className="w-1/3">
          <img src={EmptyBox} className="w-full" alt="Empty Orders" />
        </picture>
        <h4 className="mt-4 text-gray-700 text-center">
          Nothing yet, add some products and check them out :)
        </h4>
      </div>
    );

  return (
    <section className="container mx-auto max-w-6xl mt-24 px-4">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
        Your Orders
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {state.orders.map((order) => {
          const totalItems = order.items.reduce(
            (sum, item) => sum + item.quantity,
            0
          );
          const totalPrice = order.items
            .reduce((sum, item) => sum + item.quantity * item.price, 0)
            .toFixed(2);

          return (
            <Link
              key={order.id}
              to={`/order/${order.id}`}
              className="bg-white shadow-md rounded-lg overflow-hidden p-4 hover:shadow-xl transition flex flex-col gap-2"
            >
              <p className="text-gray-500 text-sm flex items-center gap-1">
                <FaCalendarAlt className="text-gray-400" />{" "}
                {new Date(order.date).toLocaleString()}
              </p>
              <p className="text-gray-600 flex items-center gap-1">
                <FaShoppingBag className="text-gray-400" /> Items: {totalItems}
              </p>
              <p className="font-medium mt-1">Total: ${totalPrice}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Order;
