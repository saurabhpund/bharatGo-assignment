import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaUser, FaClipboardList, FaSignOutAlt, FaTimes } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useAuth } from "../context/authContext";
import { useCart } from "../context/cartContext";
import CartModal from "./CartModel";
import axios from "axios";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { state: cartState } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://api.escuelajs.co/api/v1/categories");
        const data = response.data;

        // Only take the first 4 categories
        const limited = data.slice(0, 4);
        setCategories(limited);
      } catch (err) {
        console.error("Failed to fetch categories:", err.message);
      }
    };

    fetchCategories();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="bg-white border-b fixed top-0 left-0 w-full z-30 shadow-sm">
      <div className="flex justify-between items-center py-4 px-6">
        {/* LEFT SIDE: LOGO + DESKTOP NAV */}
        <div className="flex items-center gap-5">
          <div className="text-xl font-semibold cursor-pointer" onClick={() => navigate("/")}>
            Shop
          </div>
          <ul className="hidden md:flex gap-4 font-light items-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `cursor-pointer border-b-2 pb-1 transition-all duration-200 ${
                  isActive ? "border-black text-black font-medium" : "border-transparent text-gray-600 hover:text-black"
                }`
              }
            >
              All
            </NavLink>
            {categories.map((cat) => (
              <NavLink
                key={cat.id}
                to={`/category/${cat.slug}`}
                className={({ isActive }) =>
                  `cursor-pointer border-b-2 pb-1 transition-all duration-200 ${
                    isActive ? "border-black text-black font-medium" : "border-transparent text-gray-600 hover:text-black"
                  }`
                }
              >
                {cat.name}
              </NavLink>
            ))}
          </ul>
        </div>

        {/* RIGHT SIDE: DESKTOP USER LINKS */}
        <div className="hidden md:flex items-center gap-5 text-gray-700 font-light">
          {user ? (
            <>
              <p className="text-sm text-gray-800">{user.email}</p>
              <Link to="/order" className="hover:text-black">My Orders</Link>
              <Link to="/account" className="hover:text-black">My Account</Link>
              <button
                onClick={() => setCartOpen(true)}
                className="flex items-center gap-1 cursor-pointer"
              >
                <FaCartShopping className="text-lg" />
                <span className="text-sm leading-none">{cartState?.items?.length}</span>
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-1.5 rounded-md hover:bg-gray-900 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-black text-white px-4 py-1.5 rounded-md hover:bg-gray-900 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-black text-white px-4 py-1.5 rounded-md hover:bg-gray-900 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setDrawerOpen(true)} className="text-2xl" aria-label="Open drawer">
            <FaBars />
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <div className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${drawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex justify-between items-center p-4 border-b">
          <div
            className="text-lg font-semibold cursor-pointer"
            onClick={() => {
              navigate("/");
              setDrawerOpen(false);
            }}
          >
            Shop
          </div>
          <button onClick={() => setDrawerOpen(false)} aria-label="Close drawer">
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="flex flex-col p-4 space-y-4 text-gray-700">
          <NavLink
            to="/"
            onClick={() => setDrawerOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-2 rounded ${
                isActive ? "bg-gray-100 font-medium" : "hover:bg-gray-50"
              }`
            }
          >
            All
          </NavLink>

          {categories.map((cat) => (
            <NavLink
              key={cat.id}
              to={`/category/${cat.slug}`}
              onClick={() => setDrawerOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 py-2 px-2 rounded ${
                  isActive ? "bg-gray-100 font-medium" : "hover:bg-gray-50"
                }`
              }
            >
              {cat.name}
            </NavLink>
          ))}

          {user ? (
            <>
              <button
                onClick={() => {
                  setCartOpen(true);
                  setDrawerOpen(false);
                }}
                className="flex items-center gap-3 py-2 px-2 hover:bg-gray-50 rounded"
              >
                <FaCartShopping />
                My Cart ({cartState?.items?.length || 0})
              </button>

              <Link to="/order" onClick={() => setDrawerOpen(false)} className="flex items-center gap-3 py-2 px-2 hover:bg-gray-50 rounded">
                <FaClipboardList />
                My Orders
              </Link>

              <Link to="/account" onClick={() => setDrawerOpen(false)} className="flex items-center gap-3 py-2 px-2 hover:bg-gray-50 rounded">
                <FaUser />
                My Account
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setDrawerOpen(false)} className="block bg-black text-white text-center py-2 rounded-md hover:bg-gray-900 transition">
                Login
              </Link>
              <Link to="/signup" onClick={() => setDrawerOpen(false)} className="block bg-black text-white text-center py-2 rounded-md hover:bg-gray-900 transition">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {user && (
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 text-red-600 hover:text-red-700 font-medium"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        )}
      </div>

      {/* BACKDROP */}
      {drawerOpen && <div className="fixed inset-0 bg-black opacity-10 z-30" onClick={() => setDrawerOpen(false)}></div>}

      <CartModal open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
};

export default Header;
