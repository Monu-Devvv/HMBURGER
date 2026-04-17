import {
  ShoppingBag,
  Moon,
  Sun,
  Heart,
  Home,
  LayoutDashboard,
  Search,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { useSearch } from "../context/SearchContext";

export default function Navbar() {
  const { cart } = useCart();
  const { dark, toggleTheme } = useTheme();
  const { search, setSearch } = useSearch();
  const location = useLocation();

  const total = cart.reduce((s, i) => s + i.quantity, 0);

  // CHANGED: helper to highlight active bottom nav icon
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div className="sticky top-0 z-50
        bg-white dark:bg-gray-900
        backdrop-blur-2xl
        border-b border-orange-200 dark:border-white/10
        shadow-sm dark:shadow-[0_4px_30px_rgba(0,0,0,0.3)]">

        <div className="flex items-center justify-between px-4 md:px-8 py-3">

          {/* Brand */}
          <h1 className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            🍔 HMBurger
          </h1>

          {/* CHANGED: Desktop search — visible border + dark text in light mode */}
          <div className="hidden md:flex items-center
            bg-orange-50 dark:bg-white/10
            border border-orange-200 dark:border-white/20
            px-4 py-2 rounded-full w-1/3
            focus-within:ring-2 focus-within:ring-orange-400 transition">
            <Search size={18} className="text-orange-500 dark:text-orange-400 shrink-0" />
            <input
              type="text"
              placeholder="Search delicious food..."
              className="bg-transparent outline-none px-2 w-full text-sm
                text-gray-800 dark:text-white placeholder:text-gray-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* CHANGED: hidden on mobile — bottom nav handles these on small screens */}
          <div className="hidden md:flex items-center gap-4 md:gap-5">
            <Link to="/"
              className="hover:scale-110 transition
                text-gray-600 hover:text-orange-500
                dark:text-gray-300 dark:hover:text-orange-400">
              <Home size={22} />
            </Link>

            <Link to="/wishlist"
              className="hover:scale-110 transition
                text-gray-600 hover:text-red-500
                dark:text-gray-300 dark:hover:text-red-400">
              <Heart size={22} />
            </Link>

            <Link to="/dashboard"
              className="hover:scale-110 transition
                text-gray-600 hover:text-orange-500
                dark:text-gray-300 dark:hover:text-orange-400">
              <LayoutDashboard size={22} />
            </Link>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full
                bg-orange-50 dark:bg-white/10
                border border-orange-200 dark:border-white/20
                hover:scale-110 transition
                text-gray-700 dark:text-yellow-300">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <Link to="/cart"
              className="relative hover:scale-110 transition
                text-gray-600 hover:text-orange-500
                dark:text-gray-300 dark:hover:text-orange-400">
              <ShoppingBag size={22} />
              {total > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-orange-400
                  text-white text-xs px-1.5 rounded-full animate-bounce shadow-lg">
                  {total}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* CHANGED: Mobile search bar — solid background, visible text */}
        <div className="md:hidden px-4 pb-3">
          <div className="flex items-center
            bg-orange-50 dark:bg-white/10
            border border-orange-200 dark:border-white/20
            px-3 py-2 rounded-full
            focus-within:ring-2 focus-within:ring-orange-400 transition">
            <Search size={18} className="text-orange-500 dark:text-orange-400 shrink-0" />
            <input
              type="text"
              placeholder="Search food..."
              className="bg-transparent outline-none px-2 w-full text-sm
                text-gray-800 dark:text-white placeholder:text-gray-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* ── MOBILE BOTTOM NAV ── */}
      {/* CHANGED: Added bottom nav bar for mobile with active highlight */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden
        bg-white/90 dark:bg-gray-900/90
        backdrop-blur-2xl
        border-t border-orange-100 dark:border-white/10
        shadow-[0_-4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.4)]
        pb-safe">

        <div className="flex items-center justify-around px-2 py-2">

          {/* Home */}
          <Link to="/" className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-2xl transition
            hover:bg-orange-50 dark:hover:bg-white/10">
            <Home
              size={22}
              className={isActive("/")
                ? "text-orange-500"
                : "text-gray-500 dark:text-gray-400"}
            />
            <span className={`text-[10px] font-medium ${isActive("/") ? "text-orange-500" : "text-gray-500 dark:text-gray-400"}`}>
              Home
            </span>
          </Link>

          {/* Wishlist */}
          <Link to="/wishlist" className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-2xl transition
            hover:bg-red-50 dark:hover:bg-white/10">
            <Heart
              size={22}
              className={isActive("/wishlist")
                ? "text-red-500"
                : "text-gray-500 dark:text-gray-400"}
            />
            <span className={`text-[10px] font-medium ${isActive("/wishlist") ? "text-red-500" : "text-gray-500 dark:text-gray-400"}`}>
              Wishlist
            </span>
          </Link>

          {/* Cart — center big button */}
          <Link to="/cart" className="relative flex flex-col items-center -mt-5">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg
              bg-gradient-to-br from-orange-500 to-red-500
              ring-4 ring-white dark:ring-gray-900`}>
              <ShoppingBag size={24} className="text-white" />
              {total > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-orange-500 text-xs font-bold
                  px-1.5 rounded-full shadow border border-orange-200">
                  {total}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium mt-1 text-gray-500 dark:text-gray-400">Cart</span>
          </Link>

          {/* Dashboard */}
          <Link to="/dashboard" className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-2xl transition
            hover:bg-orange-50 dark:hover:bg-white/10">
            <LayoutDashboard
              size={22}
              className={isActive("/dashboard")
                ? "text-orange-500"
                : "text-gray-500 dark:text-gray-400"}
            />
            <span className={`text-[10px] font-medium ${isActive("/dashboard") ? "text-orange-500" : "text-gray-500 dark:text-gray-400"}`}>
              Stats
            </span>
          </Link>

          {/* Theme toggle in bottom nav */}
          <button
            onClick={toggleTheme}
            className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-2xl transition
              hover:bg-orange-50 dark:hover:bg-white/10 text-gray-500 dark:text-yellow-300">
            {dark ? <Sun size={22} /> : <Moon size={22} />}
            <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400">
              {dark ? "Light" : "Dark"}
            </span>
          </button>

        </div>
      </div>
    </>
  );
}