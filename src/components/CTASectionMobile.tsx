"use client";

import type { CtaText } from "@/types/product";

interface CTASectionProps {
  ctaText: CtaText;
  currentLang: "en" | "bn";
}

export default function CTASectionMobile({
  ctaText,
  currentLang,
}: CTASectionProps) {
  const price = 1000;
  const priceDisplay = currentLang === "en" ? `৳${price}` : `${price} টাকা`;

  return (
    // The component itself is now the sticky container for mobile
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 p-3 backdrop-blur-sm border-t border-gray-200 shadow-t-md lg:hidden">
      <div className="flex justify-between items-center gap-4 max-w-7xl mx-auto">
        {/* Price Information */}
        <div className="text-left">
          <p className="text-xs text-gray-600">Course Price</p>
          <h3 className="text-lg font-bold text-gray-900 -mt-0.5">
            {priceDisplay}
          </h3>
        </div>

        {/* Call to Action Button */}
        <button
          className={`
            px-6 py-2.5 rounded-lg font-semibold text-base
            bg-[#1CAB55] text-white transition-colors duration-200
            hover:bg-green-600 active:scale-95 flex-shrink-0
          `}
          aria-label={ctaText?.name || "Enroll Now"}
        >
          {ctaText?.name || "Enroll Now"}
        </button>
      </div>
    </div>
  );
}
