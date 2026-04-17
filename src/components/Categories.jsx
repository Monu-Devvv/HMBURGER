import { useState } from "react";

// ✅ Category list with icons
const categories = [
  { name: "All",     img: "https://cdn-icons-png.flaticon.com/512/1828/1828919.png" },
  { name: "Burger",  img: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png" },
  { name: "Pizza",   img: "https://cdn-icons-png.flaticon.com/512/1404/1404945.png" },
  { name: "Drinks",  img: "https://cdn-icons-png.flaticon.com/512/3050/3050151.png" },
  { name: "Fries",   img: "https://cdn-icons-png.flaticon.com/512/1046/1046786.png" },
  { name: "Chinese", img: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png" },
  { name: "Combo",   img: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png" },
];

export default function Categories({ setCategory, setType }) {
  // ✅ Track which type filter is active (veg / nonveg / all)
  const [activeType, setActiveType] = useState("all");
  // ✅ Track which category is active for highlight
  const [activeCategory, setActiveCategory] = useState("All");

  const handleType = (type) => {
    setActiveType(type);
    setType(type);
  };

  const handleCategory = (name) => {
    setActiveCategory(name);
    setCategory(name);
  };

  return (
    <div className="space-y-4">

      {/* ✅ Veg / Non-Veg / All filter pills — glass style */}
      <div className="flex gap-2 flex-wrap">

        {/* Veg filter */}
        <button
          onClick={() => handleType("veg")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition hover:scale-105 ${
            activeType === "veg"
              ? "bg-green-500 text-white shadow-lg shadow-green-300/30"
              : "glass text-gray-700 dark:text-gray-200"
          }`}
        >
          🌿 Veg
        </button>

        {/* Non-Veg filter */}
        <button
          onClick={() => handleType("nonveg")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition hover:scale-105 ${
            activeType === "nonveg"
              ? "bg-red-500 text-white shadow-lg shadow-red-300/30"
              : "glass text-gray-700 dark:text-gray-200"
          }`}
        >
          🍗 Non-Veg
        </button>

        {/* All filter */}
        <button
          onClick={() => handleType("all")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition hover:scale-105 ${
            activeType === "all"
              ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-300/30"
              : "glass text-gray-700 dark:text-gray-200"
          }`}
        >
          ✨ All
        </button>

      </div>

      {/* ✅ Category horizontal scroll — glassmorphism style icons */}
      <div className="flex gap-4 overflow-x-auto py-2 scrollbar-hide">
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => handleCategory(cat.name)}
            className="flex flex-col items-center cursor-pointer hover:scale-110 transition min-w-[70px]"
          >
            {/* ✅ Glass circle icon — orange ring when active */}
            <div className={`w-14 h-14 md:w-16 md:h-16 glass rounded-full flex items-center justify-center shadow transition
              ${activeCategory === cat.name
                ? "ring-2 ring-orange-500 shadow-orange-300/30 shadow-md"
                : "hover:ring-1 hover:ring-orange-400/50"
              }`}
            >
              <img src={cat.img} alt={cat.name} className="w-7 h-7 md:w-8 md:h-8" />
            </div>

            {/* Category name */}
            <p className={`text-xs md:text-sm mt-1 text-center font-medium transition
              ${activeCategory === cat.name
                ? "text-orange-500"
                : "text-gray-600 dark:text-gray-300"
              }`}
            >
              {cat.name}
            </p>

          </div>
        ))}
      </div>

    </div>
  );
}