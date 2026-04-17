import { useState, useEffect } from "react";
import Feedback from "./Feedback";
import { useCart } from "../context/CartContext";
import { Trash2, Plus, Minus } from "lucide-react";

export default function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCart();

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [delivered, setDelivered] = useState(false);

  // ✅ Order form fields
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [tableNo, setTableNo] = useState("");

  // ✅ Calculate totals
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const finalPrice = total - discount;

  // ✅ Open name/table form before placing order
  const placeOrder = () => setShowForm(true);

  // ✅ Send order via WhatsApp and start delivery timer
  const sendWhatsApp = () => {
    const number = "917599147368";
    let message = `🧾 New Order\n\n👤 Name: ${name}\n🍽️ Table: ${tableNo}\n\n🛒 Items:\n`;
    cart.forEach((item) => {
      message += `- ${item.name} x${item.quantity} = ₹${item.price * item.quantity}\n`;
    });
    message += `\n💰 Total: ₹${finalPrice}`;

    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank");

    // ✅ Start countdown timer (10–20 random minutes)
    const randomMinutes = Math.floor(Math.random() * 11) + 10;
    setTimeLeft(randomMinutes * 60);
    setOrderPlaced(true);
    setShowForm(false);
  };

  // ✅ Countdown timer effect
  useEffect(() => {
    if (!orderPlaced) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setDelivered(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [orderPlaced]);

  // ✅ Format seconds → MM:SS
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // ✅ Show feedback page after delivery
  if (delivered) {
    return (
      <Feedback
        onClose={() => {
          alert("Thanks ❤️");
          setDelivered(false);
          setOrderPlaced(false);
          setDiscount(0);
          setCoupon("");
        }}
      />
    );
  }

  return (
    <div className="px-4 md:px-8 py-6 max-w-3xl mx-auto space-y-6">

      {/* ✅ Page heading */}
      <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
        Your Cart 🛒
      </h1>

      {/* ✅ Empty cart state */}
      {cart.length === 0 ? (
        <div className="glass-card rounded-2xl p-10 text-center text-gray-500 dark:text-gray-400">
          <p className="text-5xl mb-4">🛒</p>
          <p className="font-medium">Your cart is empty</p>
          <p className="text-sm mt-1">Add some delicious food!</p>
        </div>
      ) : (
        <>
          {/* ✅ Cart items list */}
          <div className="space-y-3">
            {cart.map((item) => (
              // ✅ Each cart item — glass card style
              <div key={item.id} className="glass-card rounded-2xl p-4 flex items-center gap-4">

                {/* Food image thumbnail */}
                <img
                  src={`${item.image}?auto=format&fit=crop&w=100&q=80`}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                />

                {/* Name + Price */}
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-gray-900 dark:text-white truncate">{item.name}</h2>
                  <p className="text-orange-500 font-bold text-sm">₹{item.price}</p>
                </div>

                {/* ✅ Quantity controls — glass buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="glass w-7 h-7 rounded-full flex items-center justify-center hover:scale-110 transition text-gray-700 dark:text-white"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="font-bold text-gray-900 dark:text-white w-5 text-center">{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="glass w-7 h-7 rounded-full flex items-center justify-center hover:scale-110 transition text-gray-700 dark:text-white"
                  >
                    <Plus size={12} />
                  </button>
                </div>

                {/* ✅ Item total */}
                <p className="font-bold text-gray-900 dark:text-white text-sm w-14 text-right">
                  ₹{item.price * item.quantity}
                </p>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400 hover:text-red-500 hover:scale-110 transition"
                >
                  <Trash2 size={16} />
                </button>

              </div>
            ))}
          </div>

          {/* ✅ Order summary + coupon section */}
          <div className="glass-card rounded-2xl p-5 space-y-4">

            {/* Totals */}
            <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{total}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-500 font-medium">
                  <span>Discount</span>
                  <span>-₹{discount.toFixed(0)}</span>
                </div>
              )}
              <div className="flex justify-between font-extrabold text-lg text-gray-900 dark:text-white pt-2 border-t border-white/20">
                <span>Total</span>
                <span className="text-orange-500">₹{finalPrice.toFixed(0)}</span>
              </div>
            </div>

            {/* ✅ Coupon input — glass style */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter coupon code..."
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="glass flex-1 px-4 py-2 rounded-xl text-sm outline-none text-gray-900 dark:text-white placeholder-gray-400 bg-transparent"
              />
            </div>

            {/* ✅ Coupon cards — glass tinted */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

              <div
                onClick={() => { setCoupon("FIRST50"); setDiscount(total * 0.5); }}
                className="glass rounded-xl p-3 cursor-pointer hover:scale-105 transition border border-yellow-400/30"
              >
                <p className="font-bold text-yellow-600 dark:text-yellow-400 text-sm">FIRST50 🎉</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">50% OFF on first order</p>
              </div>

              <div
                onClick={() => {
                  if (total >= 400) { setCoupon("SAVE25"); setDiscount(total * 0.25); }
                  else alert("Minimum ₹400 required ❌");
                }}
                className="glass rounded-xl p-3 cursor-pointer hover:scale-105 transition border border-green-400/30"
              >
                <p className="font-bold text-green-600 dark:text-green-400 text-sm">SAVE25 💸</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">25% OFF above ₹400</p>
              </div>

              <div
                onClick={() => {
                  if (total >= 200) { setCoupon("SAVE10"); setDiscount(total * 0.1); }
                  else alert("Minimum ₹200 required ❌");
                }}
                className="glass rounded-xl p-3 cursor-pointer hover:scale-105 transition border border-blue-400/30"
              >
                <p className="font-bold text-blue-600 dark:text-blue-400 text-sm">SAVE10 🔥</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">10% OFF above ₹200</p>
              </div>

            </div>

            {/* ✅ Place Order button */}
            {!orderPlaced && (
              <button
                onClick={placeOrder}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-bold hover:scale-[1.02] hover:shadow-xl hover:shadow-orange-300/30 transition"
              >
                Place Order 🚀
              </button>
            )}

            {/* ✅ Name + Table form — shown before WhatsApp send */}
            {showForm && (
              <div className="glass rounded-xl p-4 space-y-3">
                <p className="font-semibold text-gray-900 dark:text-white">Your Details</p>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="glass w-full px-4 py-2 rounded-xl text-sm outline-none text-gray-900 dark:text-white placeholder-gray-400 bg-transparent"
                />
                <input
                  type="text"
                  placeholder="Table Number"
                  value={tableNo}
                  onChange={(e) => setTableNo(e.target.value)}
                  className="glass w-full px-4 py-2 rounded-xl text-sm outline-none text-gray-900 dark:text-white placeholder-gray-400 bg-transparent"
                />
                <button
                  onClick={sendWhatsApp}
                  className="w-full bg-green-500 text-white py-2.5 rounded-xl font-bold hover:scale-[1.02] transition"
                >
                  Send via WhatsApp 📲
                </button>
              </div>
            )}

            {/* ✅ Delivery countdown timer */}
            {orderPlaced && !delivered && (
              <div className="flex flex-col items-center gap-4 py-4">
                <p className="font-semibold text-gray-900 dark:text-white animate-pulse">
                  🚴 Order on the way...
                </p>
                {/* ✅ Glass circular timer */}
                <div className="w-32 h-32 glass rounded-full flex items-center justify-center border-4 border-orange-500/60 shadow-lg shadow-orange-300/20">
                  <span className="text-2xl font-extrabold text-orange-500">{formatTime(timeLeft)}</span>
                </div>
                <button
                  onClick={() => setDelivered(true)}
                  className="glass px-5 py-2 rounded-xl text-sm font-semibold text-gray-800 dark:text-white hover:scale-105 transition"
                >
                  Mark Delivered ⚡
                </button>
              </div>
            )}

          </div>
        </>
      )}
    </div>
  );
}