"use client";
import type { CtaText, ProductData } from "@/types/product";
import { ShoppingCart } from "lucide-react";

interface CTASectionProps {
  ctaText: CtaText;
  productData: ProductData;
  currentLang: "en" | "bn"; // Added for language-specific price
}

export default function CTASection({
  ctaText,
  productData,
  currentLang,
}: CTASectionProps) {
  // Hardcoded price as per instruction
  const price = 1000;

  const priceDisplay = currentLang === "en" ? `৳${price}` : `${price} টাকা`;

  return (
    <section className="bg-white rounded-lg p-4 xl:p-6">
      <button
        className={`
          w-full px-4 xl:px-6 py-3 xl:py-4 rounded-lg font-bold text-base xl:text-lg transition-all duration-200 flex items-center justify-center gap-2
          hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2
          bg-[#1CAB55] text-white hover:bg-green-600 focus:ring-[#1CAB55]
        `}
      >
        <ShoppingCart size={18} className="xl:w-5 xl:h-5" />
        <span className="flex items-center gap-2">
          <span>{priceDisplay}</span>
          <span>•</span>
          <span>{ctaText?.name || "Enroll Now"}</span>
        </span>
      </button>
    </section>
  );
}
