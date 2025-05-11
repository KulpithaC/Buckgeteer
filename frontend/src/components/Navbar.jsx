import { Link } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(!!user);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setMenuOpen(false);
  };

  return (
    <nav className="bg-green-700 p-4 flex items-center justify-between shadow-md relative">
      {isLoggedIn ? (
        <>
          <Link to="/dashboard" className="text-2xl font-bold text-white">
            Buckgeteer
          </Link>
        </>
      ) : (
        <>
          <Link to="/" className="text-2xl font-bold text-white">
            Buckgeteer
          </Link>{" "}
        </>
      )}

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center space-x-6">
        {isLoggedIn ? (
          <>
            <li>
              <button
                onClick={handleLogout}
                className="text-white font-semibold hover:underline"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                className="text-white font-semibold hover:underline"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="bg-white text-green-700 font-bold py-2 px-4 rounded-full hover:bg-green-100"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>

      {/* Hamburger Button */}
      <button
        className="md:hidden text-white text-3xl focus:outline-none"
        onClick={toggleMenu}
      >
        ☰
      </button>

      {/* Mobile Navigation */}
      <ul
        className={`${
          menuOpen ? "flex" : "hidden"
        } absolute top-full left-0 w-full bg-green-700 flex-col items-center py-2 md:hidden z-10`}
      >
        {isLoggedIn ? (
          <>
            <li className="border-b border-white w-full text-center">
              <Link
                to="/dashboard"
                className="text-white font-semibold block py-2"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
            </li>
            <li className="border-b border-white w-full text-center">
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="text-white font-semibold block py-2 w-full"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="border-b border-white w-full text-center">
              <Link
                to="/login"
                className="text-white font-semibold block py-2"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            </li>
            <li className="border-b border-white w-full text-center">
              <Link
                to="/register"
                className="text-white font-semibold block py-2"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
