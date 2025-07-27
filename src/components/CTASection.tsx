"use client";
import type { CtaText } from "@/types/product";

interface CTASectionProps {
  ctaText: CtaText;
  currentLang: "en" | "bn";
}

export default function CTASection({ ctaText, currentLang }: CTASectionProps) {
  const price = 1000;
  const priceDisplay = currentLang === "en" ? `৳${price}` : `${price} টাকা`;

  return (
    <section
      className="
        bg-gradient-to-br from-white to-gray-100 
        rounded-3xl p-6 xl:p-10 shadow-xl 
        flex flex-col items-center gap-6 text-center transition-all duration-300
      "
    >
      <div className="flex flex-col items-center gap-2">
        <span className="text-gray-500 text-sm xl:text-base">
          Starting from
        </span>
        <h3 className="text-3xl xl:text-4xl font-bold text-gray-900 tracking-tight">
          {priceDisplay}
        </h3>
      </div>

      <button
        className="
          w-full max-w-xs px-6 py-4 rounded-2xl font-semibold text-lg xl:text-xl 
          transition-all duration-200 ease-in-out transform
          bg-[#1CAB55] text-white hover:bg-[#16994c] active:scale-95 hover:scale-105 
          focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-[#1CAB55]
          shadow-md hover:shadow-lg
        "
        aria-label={ctaText?.name || "Enroll Now"}
      >
        {ctaText?.name || "Enroll Now"}
      </button>
    </section>
  );
}
