import React, { useContext, useState } from "react";
import sp from "../assets/sp.png";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../usercontext";
import axios from "axios";

function Navbar() {
  const { user, ready, setUser } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    await axios.post(
      "https://inventory-management-backend-xdly.onrender.com/user/logout",
      {},
      { withCredentials: true }
    );
    setUser(null);
    setMenuOpen(false);
    setDropdownOpen(false);
    navigate("/login");
  };

  if (!ready) return null;

  return (
    <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center p-3 relative bg-white shadow-md z-50">
      {/* Logo Section */}
      <div
        onClick={() => navigate(user ? "/" : "/login")}
        className="cursor-pointer border p-2 flex items-center rounded-full shadow-lg"
      >
        <img className="w-12 md:w-16 animate-spin" src={sp} alt="Logo" />
        <div className="ml-2 text-lg font-serif text-red-600">
          Sapra Packers
        </div>
      </div>

      {/* Hamburger Icon - Mobile Only */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-red-600 absolute top-4 right-4"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Nav Links + User Menu */}
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } w-full md:w-auto md:flex md:flex-row md:items-center md:gap-6 md:static absolute top-full left-0 bg-white border-t md:border-0 mt-3 md:mt-0 py-2 md:py-0 px-4 md:px-0 z-40`}
      >
        {/* Nav Links (Authenticated Users) */}
        {user && (
          <>
            <Link
              to="/products"
              className="block py-2 md:py-0 text-red-600 hover:underline"
              onClick={() => setMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/customers"
              className="block py-2 md:py-0 text-red-600 hover:underline"
              onClick={() => setMenuOpen(false)}
            >
              Customers
            </Link>
            <Link
              to="/daybook"
              className="block py-2 md:py-0 text-red-600 hover:underline"
              onClick={() => setMenuOpen(false)}
            >
              DayBook
            </Link>
            <Link
              to="/Jobs"
              className="block py-2 md:py-0 text-red-600 hover:underline"
              onClick={() => setMenuOpen(false)}
            >
              To-Do Jobs
            </Link>
          </>
        )}

        {/* User Menu */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center mt-2 md:mt-0 text-red-600 border rounded-full shadow-lg p-2 w-full md:w-auto"
            >
              <span className="text-lg font-semibold">{user.name}</span>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
                <button
                  onClick={() => setDropdownOpen(false)}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full md:w-auto">
            <Link
              to="/login"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;