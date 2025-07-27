"use client";

import type { Section } from "@/types/product";
import { Check } from "lucide-react";

interface PointersSectionProps {
  section: Section;
}

export default function PointersSection({ section }: PointersSectionProps) {
  return (
    <section className="bg-white">
      <h2 className="text-xl xl:text-2xl font-bold mb-4 text-gray-800">
        {section.name}
      </h2>

      {section.description && (
        <div
          className="text-gray-600 mb-6 prose prose-sm xl:prose-base max-w-none"
          dangerouslySetInnerHTML={{ __html: section.description }}
        />
      )}

      {section.values && section.values.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-200 rounded-lg p-4 xl:p-6">
          {section.values.map((pointer, index) => (
            <div key={pointer.id || index} className="flex items-start gap-3">
              <Check className="text-blue-500 mt-1 flex-shrink-0" size={20} />
              <p className="text-gray-800 text-sm xl:text-base">
                {pointer.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
