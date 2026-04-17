import { createContext, useContext, useState, useEffect } from "react";

// ✅ Create wishlist context
const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {

  // ✅ Load wishlist from localStorage so it persists on refresh
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ Save wishlist to localStorage on every change
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // ✅ Toggle: if item exists remove it, else add it (heart button behavior)
  const toggleWishlist = (item) => {
    const exist = wishlist.find((i) => i.id === item.id);
    if (exist) {
      setWishlist(wishlist.filter((i) => i.id !== item.id));
    } else {
      setWishlist([...wishlist, item]);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

// ✅ Custom hook
export const useWishlist = () => useContext(WishlistContext);