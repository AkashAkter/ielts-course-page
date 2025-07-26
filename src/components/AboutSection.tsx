"use client";

import { useState } from "react";
import type { Section } from "@/types/product";

interface AboutSectionProps {
  section: Section;
}

export default function AboutSection({ section }: AboutSectionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([0]); // first item open by default

  const toggleIndex = (index: number) => {
    setOpenIndices(
      (prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index) // close if open
          : [...prev, index] // open if closed
    );
  };

  return (
    <section className="bg-white ">
      <h2 className="text-xl font-semibold text-green-primary mb-4">
        {section?.name ?? "Course details"}
      </h2>

      <div className="divide-y divide-gray-200 border border-gray-200 rounded-lg p-4">
        {section.values?.map((item, index) => (
          <div key={index}>
            <button
              onClick={() => toggleIndex(index)}
              className="w-full text-left py-4 text-[#111827] flex justify-between items-center"
            >
              <span dangerouslySetInnerHTML={{ __html: item.title || "" }} />
              <span>{openIndices.includes(index) ? "▲" : "▼"}</span>
            </button>

            {openIndices.includes(index) && (
              <div className="pb-4 text-gray-600 pl-2">
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
