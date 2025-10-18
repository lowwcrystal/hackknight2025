
import Image from "next/image";

export default function Recipe() {
  return (
    <div className="relative">
      {/* Gradient overlays for fading edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />

      {/* Scrollable container */}
      <div className="flex overflow-x-auto space-x-6 scrollbar-hide snap-x snap-mandatory scroll-smooth px-4">
        <div className="snap-start shrink-0"><RecipeAttempt /></div>
      </div>
    </div>
  );
}
