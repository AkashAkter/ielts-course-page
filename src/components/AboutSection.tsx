"use client";

import { useState } from "react";
import type { Section } from "@/types/product";
import { ChevronUp, ChevronDown } from "lucide-react";

interface AboutSectionProps {
  section: Section;
}

export default function AboutSection({ section }: AboutSectionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="bg-white">
      <h2 className="text-xl xl:text-2xl font-bold mb-4 text-gray-800">
        {section?.name ?? "Course details"}
      </h2>

      <div className="divide-y divide-gray-200 border border-gray-200 rounded-lg p-4 xl:p-6">
        {section.values?.map((item, index) => (
          <div key={index}>
            <button
              onClick={() => toggleIndex(index)}
              className="w-full flex justify-between items-center py-3 xl:py-4 text-left xl:text-lg  text-gray-800 hover:bg-gray-50 transition-colors"
            >
              <span dangerouslySetInnerHTML={{ __html: item.title || "" }} />
              {openIndices.includes(index) ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>

            {openIndices.includes(index) && (
              <div className="pb-4 text-sm xl:text-base text-gray-600 pl-1">
                <div
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: item.description || "" }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
