import { createContext, useContext, useState, useEffect } from "react";

// ✅ Create cart context
const CartContext = createContext();

export const CartProvider = ({ children }) => {

  // ✅ Load cart from localStorage so it persists on page refresh
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ Show "added to cart" popup state
  const [showPopup, setShowPopup] = useState(false);

  // ✅ Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ Add item — if already in cart, increase quantity; else add fresh
  const addToCart = (item) => {
    const exist = cart.find((i) => i.id === item.id);
    if (exist) {
      setCart(cart.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    // Show toast popup for 2 seconds
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  // ✅ Remove item completely from cart
  const removeFromCart = (id) => setCart(cart.filter((i) => i.id !== id));

  // ✅ Increase item quantity
  const increaseQty = (id) =>
    setCart(cart.map((i) => i.id === id ? { ...i, quantity: i.quantity + 1 } : i));

  // ✅ Decrease quantity — auto-removes if quantity reaches 0
  const decreaseQty = (id) =>
    setCart(
      cart
        .map((i) => i.id === id ? { ...i, quantity: i.quantity - 1 } : i)
        .filter((i) => i.quantity > 0)
    );

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQty, decreaseQty, showPopup }}>
      {children}
    </CartContext.Provider>
  );
};

// ✅ Custom hook
export const useCart = () => useContext(CartContext);