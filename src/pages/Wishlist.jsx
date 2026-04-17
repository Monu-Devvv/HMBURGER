
import { useWishlist } from "../context/WishlistContext";
import FoodCard from "../components/FoodCard";

export default function Wishlist() {
  const { wishlist } = useWishlist();

  return (
    <div className="px-4 md:px-8 py-6 max-w-7xl mx-auto space-y-6">

      {/* ✅ Page heading */}
      <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
        Wishlist ❤️
      </h1>

      {/* ✅ Empty state */}
      {wishlist.length === 0 ? (
        <div className="glass-card rounded-2xl p-10 text-center text-gray-500 dark:text-gray-400">
          <p className="text-5xl mb-4">💔</p>
          <p className="font-medium">No favourite items yet</p>
          <p className="text-sm mt-1">Tap the heart on any food to save it here.</p>
        </div>
      ) : (
        // ✅ Grid of wishlisted food cards
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {wishlist.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      )}

    </div>
  );
}