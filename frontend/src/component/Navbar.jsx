import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold">
              EventBooking
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-4">
            <Link
              to="/home"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500"
            >
              Home
            </Link>
            <Link
              to="/login"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500"
            >
              Register
            </Link>
            <Link
              to="/createevent"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500"
            >
              Create Event
            </Link>
            <Link
              to="/mybooking"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500"
            >
              My Bookings
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="bg-blue-600 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => {
                const menu = document.getElementById("mobile-menu");
                menu.classList.toggle("hidden");
              }}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Links */}
      <div className="md:hidden hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 bg-blue-700">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-600"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-600"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-600"
          >
            Register
          </Link>
          <Link
            to="/createevent"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-600"
          >
            Create Event
          </Link>
          <Link
            to="/mybooking"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-600"
          >
            My Bookings
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
