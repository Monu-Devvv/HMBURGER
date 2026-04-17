// ✅ Skeleton loader card — shown while food items are loading
export default function Skeleton() {
  return (
    // ✅ GLASSMORPHISM skeleton with pulse animation
    <div className="animate-pulse glass-card rounded-2xl overflow-hidden">
      {/* Image placeholder */}
      <div className="bg-white/20 dark:bg-white/5 h-44 w-full" />

      <div className="p-3 space-y-2">
        {/* Title placeholder */}
        <div className="h-4 bg-white/20 dark:bg-white/5 rounded-full w-3/4" />
        {/* Rating placeholder */}
        <div className="h-3 bg-white/20 dark:bg-white/5 rounded-full w-1/4" />
        {/* Price placeholder */}
        <div className="h-4 bg-white/20 dark:bg-white/5 rounded-full w-1/2" />
      </div>
    </div>
  );
}