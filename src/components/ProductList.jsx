import React from "react";
import { useProducts } from "../context/productContext";
import { useCart } from "../context/cartContext";
import { FaPlus, FaCheck } from "react-icons/fa";

const ProductList = ({ search }) => {
  const { state: productState } = useProducts();
  const { state: cartState, dispatch } = useCart();

  const addToCart = (product) => {
    const existing = cartState.items.find((p) => p.id === product.id);
    if (existing) {
      // increase quantity
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { id: product.id, quantity: existing.quantity + 1 },
      });
    } else {
      dispatch({
        type: "ADD_TO_CART",
        payload: { ...product, quantity: 1 },
      });
    }
  };

  const filteredProducts = productState?.products?.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  if (productState.loading)
    return <p className="text-center text-gray-500 mt-10">Loading products...</p>;

  if (productState.error)
    return <p className="text-center text-red-500 mt-10">Error: {productState.error}</p>;

  if (!filteredProducts?.length)
    return <p className="text-center text-gray-500 mt-10">No products found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      {filteredProducts.map((item) => (
        <ProductItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          isInCart={!!cartState.items.find((p) => p.id === item.id)}
        />
      ))}
    </div>
  );
};

// ✅ Product Card Component
const ProductItem = ({ item, addToCart, isInCart }) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
    <div className="relative w-full h-56">
      <img
        src={item?.images?.[0]}
        alt={item?.title}
        className="object-cover w-full h-full"
      />
      <button
        className={`absolute top-2 right-2 p-2 rounded-full shadow transition
          ${isInCart ? "bg-green-500 text-white" : "bg-white hover:bg-gray-100 text-gray-700"}
        `}
        onClick={() => addToCart(item)}
        aria-label="Add to Cart"
      >
        {isInCart ? <FaCheck /> : <FaPlus />}
      </button>
    </div>
    <div className="p-4 flex flex-col">
      <span className="text-xs text-gray-500 uppercase tracking-wide">
        {item?.category?.name}
      </span>
      <h2 className="mt-1 font-semibold text-gray-900 text-lg truncate">
        {item?.title}
      </h2>
      <p className="mt-2 font-medium text-gray-800">${item?.price}</p>
    </div>
  </div>
);

export default ProductList;
