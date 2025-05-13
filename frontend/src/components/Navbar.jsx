import React, { useContext, useState } from "react";
import sp from "../assets/sp.png";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../usercontext";
import axios from "axios";

function Navbar() {
  const { user, ready, setUser } = useContext(UserContext);
  const [isToggle, setIsToggle] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    await axios.post(
      "http://localhost:5000/user/logout",
      {},
      { withCredentials: true }
    );
    setUser(null);
    navigate("/login");
    setIsToggle(false);
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
        onClick={() => setIsToggle(!isToggle)}
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
      {(user || !user) && (
        <div
          className={`${
            isToggle ? "block" : "hidden"
          } w-full md:w-auto md:flex md:flex-row md:items-center md:gap-6 md:static absolute top-full left-0 bg-white border-t md:border-0 mt-3 md:mt-0 py-2 md:py-0 px-4 md:px-0 z-40`}
        >
          {/* Nav Links (Authenticated Users) */}
          {user && (
            <>
              <Link
                to="/products"
                className="block py-2 md:py-0 text-red-600 hover:underline"
              >
                Products
              </Link>
              <Link
                to="/customers"
                className="block py-2 md:py-0 text-red-600 hover:underline"
              >
                Customers
              </Link>
              <Link
                to="/daybook"
                className="block py-2 md:py-0 text-red-600 hover:underline"
              >
                DayBook
              </Link>
              <Link
                to="/Jobs"
                className="block py-2 md:py-0 text-red-600 hover:underline"
              >
                To-Do Jobs
              </Link>
            </>
          )}

          {/* User Button / Dropdown */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsToggle(!isToggle)}
                className="flex items-center mt-2 md:mt-0 text-red-600 border rounded-full shadow-lg p-2 w-full md:w-auto"
              >
                <span className="text-lg font-semibold">{user.name}</span>
              </button>
              {isToggle && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                  <button
                    onClick={() => setIsToggle(false)}
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
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
