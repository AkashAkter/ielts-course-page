import type { CtaText } from "@/types/product";
import { ShoppingCart } from "lucide-react";

interface CTASectionProps {
  ctaText: CtaText;
}

export default function CTASection({ ctaText }: CTASectionProps) {
  return (
    <section className="sticky top-20 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg shadow-lg p-6">
      <div className="text-center mb-6">
        <div className="text-3xl font-bold mb-2">৳5,000</div>
        <div className="text-blue-100 text-sm">Course Price</div>
      </div>

      <button className="w-full bg-white text-blue-600 px-6 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 mb-4">
        <ShoppingCart size={20} />
        {ctaText?.name || "Enroll Now"}
      </button>

      <div className="mt-6 space-y-3 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span>Lifetime Access</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span>Certificate of Completion</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span>24/7 Support</span>
        </div>
      </div>
    </section>
  );
}
