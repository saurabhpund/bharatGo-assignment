import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useProducts } from "../context/productContext";
import ProductList from "./ProductList";

const Home = () => {
  const { slug } = useParams();
  const { dispatch } = useProducts();
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState({}); // {slug: id}

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://api.escuelajs.co/api/v1/categories"
        );
        const data = response.data;

        // Limit to first 4 categories
        const limited = data.slice(0, 4);

        // Map slug -> id
        const catMap = {};
        limited.forEach((cat) => {
          catMap[cat.slug.toLowerCase()] = cat.id;
        });

        setCategories(catMap);
      } catch (err) {
        console.error("Failed to fetch categories:", err.message);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products based on slug
  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        let url = "https://api.escuelajs.co/api/v1/products";

        if (slug && categories[slug]) {
          url = `https://api.escuelajs.co/api/v1/categories/${categories[slug]}/products`;
        }

        const response = await axios.get(url);
        dispatch({ type: "FETCH_SUCCESS", payload: response.data });
      } catch (err) {
        dispatch({ type: "FETCH_ERROR", payload: err.message });
      }
    };

    fetchProducts();
  }, [slug, categories, dispatch]);

  return (
    <section className="container mx-auto max-w-6xl mt-24 px-4">
      <div className="flex flex-col items-center mb-10">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6">
          {slug
            ? slug.charAt(0).toUpperCase() + slug.slice(1)
            : "All Products"}
        </h1>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search a Product"
          className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 p-3 md:p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      <ProductList search={search} />
    </section>
  );
};

export default Home;
