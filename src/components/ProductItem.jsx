import React from 'react'
import { FaPlus } from 'react-icons/fa';

const ProductItem = ({ item }) => {
    const addProduct = () => {}
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full h-56">
        <img
          src={item?.images[0]}
          alt={item?.title}
          className="object-cover w-full h-full"
        />

        <button className="absolute top-0 cursor-pointer right-0 rounded-full bg-white p-2" onClick={addProduct}><FaPlus /></button>

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
};

export default ProductItem