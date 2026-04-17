import { useEffect, useState } from "react";
import bannerImg from "../assets/banner.jpg";
import bannerImg1 from "../assets/banner2.jpg";
import bannerImg2 from "../assets/banner3.png";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

// ✅ Banner slide data
const banners = [
  { id: 1, img: bannerImg },
  { id: 2, img: bannerImg1 },
  { id: 3, img: bannerImg2 },
];

export default function Banner() {
  const { addToCart } = useCart();
  const [index, setIndex] = useState(0);

  // ✅ Touch swipe state
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // ✅ Auto-slide every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 3500);
    return () => clearInterval(interval);
  }, [index]);

  const nextSlide = () => setIndex((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + banners.length) % banners.length);

  // ✅ Touch swipe handlers for mobile
  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextSlide();
    else if (distance < -50) prevSlide();
  };

  return (
    <div
      className="relative h-56 sm:h-64 md:h-80 rounded-3xl overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* ✅ AnimatePresence for smooth slide transitions */}
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={banners[index].img}
          alt="banner"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* ✅ GLASSMORPHISM overlay gradient — text readable on any image */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      {/* ✅ Glass info card on the left */}
      <div className="absolute inset-0 flex items-center px-6">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-white max-w-md space-y-3"
        >
          <h2 className="text-2xl md:text-4xl font-extrabold leading-tight drop-shadow-lg">
            Delicious Food <br /> Delivered Fast 🚀
          </h2>
          <p className="text-sm md:text-base text-gray-200 drop-shadow">
            Order your favorite meals instantly with best offers.
          </p>

          {/* ✅ Order Now button — gradient with glass hover */}
          <button
            onClick={() =>
              addToCart({
                id: banners[index].id + 1000,
                name: "Special Offer",
                price: 99,
                image: banners[index].img,
              })
            }
            className="mt-2 bg-gradient-to-r from-orange-500 to-red-500 px-5 py-2.5 rounded-full text-white font-semibold hover:scale-105 hover:shadow-xl hover:shadow-orange-500/30 transition"
          >
            Order Now 🍔
          </button>
        </motion.div>
      </div>

      {/* ✅ Dot indicators — glass style */}
      <div className="absolute bottom-3 w-full flex justify-center gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
              i === index
                ? "bg-white w-6 shadow-md"
                : "bg-white/50 w-2.5"
            }`}
          />
        ))}
      </div>

      {/* ✅ Prev/Next arrow buttons — glass style */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 glass text-white w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition text-sm"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 glass text-white w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition text-sm"
      >
        ›
      </button>

    </div>
  );
}