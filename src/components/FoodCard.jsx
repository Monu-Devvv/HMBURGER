import { Heart, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function FoodCard({ item }) {
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  // ✅ Check if this item is in wishlist
  const liked = wishlist.find((i) => i.id === item.id);

  return (
    // ✅ GLASSMORPHISM Card: scale on hover, glass background, rounded corners
    <motion.div
      whileHover={{ scale: 1.04, y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group relative glass-card rounded-2xl overflow-hidden"
    >
      {/* ✅ Wishlist heart button — top right */}
      <button
        onClick={() => toggleWishlist(item)}
        className="absolute top-3 right-3 z-10 glass p-1.5 rounded-full hover:scale-110 transition"
      >
        <Heart
          size={16}
          className={liked ? "text-red-500 fill-red-500" : "text-white"}
        />
      </button>

      {/* ✅ Veg / Non-Veg badge — top left */}
      <div className="absolute top-3 left-3 z-10">
        <span
          className={`text-xs px-2 py-1 rounded-full font-semibold ${
            item.type === "veg"
              ? "bg-green-500/80 text-white backdrop-blur-sm"
              : "bg-red-500/80 text-white backdrop-blur-sm"
          }`}
        >
          {item.type === "veg" ? "🌿 VEG" : "🍗 NON-VEG"}
        </span>
      </div>

      {/* ✅ Food image with zoom on hover */}
      <div className="overflow-hidden h-44">
        <img
          src={`${item.image}?auto=format&fit=crop&w=600&q=80`}
          alt={item.name}
          className="h-44 w-full object-cover group-hover:scale-110 transition duration-500"
        />
        {/* ✅ Gradient overlay at bottom of image for text readability */}
        <div className="absolute inset-0 h-44 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* ✅ Card info: name, rating, price, add button */}
      <div className="p-3 space-y-2">

        {/* Food name */}
        <h2 className="font-semibold text-base line-clamp-1 text-gray-900 dark:text-white">
          {item.name}
        </h2>

        {/* Star rating */}
        <div className="flex items-center gap-1 text-yellow-500 text-sm">
          <Star size={13} fill="currentColor" />
          <span className="text-gray-700 dark:text-gray-300 text-xs">{item.rating}</span>
        </div>

        {/* Price + Add button */}
        <div className="flex items-center justify-between">
          <p className="text-orange-500 font-bold text-base">₹{item.price}</p>

          {/* ✅ Gradient add button with glass effect */}
          <button
            onClick={() => addToCart(item)}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:scale-105 hover:shadow-lg hover:shadow-orange-300/30 transition"
          >
            + Add
          </button>
        </div>

      </div>
    </motion.div>
  );
}