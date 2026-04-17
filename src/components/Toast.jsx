import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

// ✅ Toast popup — shown when item is added to cart
export default function Toast() {
  const { showPopup } = useCart();

  return (
    // ✅ AnimatePresence handles smooth mount/unmount animation
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          // ✅ GLASSMORPHISM toast with green tint
          className="fixed top-5 right-5 z-50 glass px-5 py-3 rounded-2xl text-sm font-semibold text-gray-900 dark:text-white border border-green-400/30 shadow-lg shadow-green-300/20"
        >
          ✅ Item added to cart!
        </motion.div>
      )}
    </AnimatePresence>
  );
}