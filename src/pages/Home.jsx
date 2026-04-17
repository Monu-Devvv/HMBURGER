import { useState } from "react";
import { foods } from "../data/foods";
import FoodCard from "../components/FoodCard";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import { useSearch } from "../context/SearchContext";

export default function Home() {
  const { search } = useSearch();
  const [category, setCategory] = useState("All");
  const [type, setType] = useState("all");

  const filtered = foods.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || item.category === category;
    const matchType = type === "all" || item.type === type;
    return matchSearch && matchCategory && matchType;
  });

  return (
    // CHANGED: pb-24 on mobile so content isn't hidden behind bottom nav
    <div className="px-4 md:px-8 py-5 space-y-6 max-w-7xl mx-auto pb-24 md:pb-6">

      <Banner />

      {/* CHANGED: visible card bg in light mode — orange-tinted, not white-on-white */}
      <div className="bg-white dark:bg-gray-800 border border-orange-100 dark:border-white/10 p-4 rounded-2xl shadow-sm">
        <Categories setCategory={setCategory} setType={setType} />
      </div>

      {/* Food grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filtered.length === 0 ? (
          // CHANGED: empty state message visible in both modes
          <div className="col-span-4 text-center py-16">
            <p className="text-4xl mb-3">🍽️</p>
            <p className="text-gray-500 dark:text-gray-400 font-medium">No food found!</p>
          </div>
        ) : (
          filtered.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))
        )}
      </div>

    </div>
  );
}