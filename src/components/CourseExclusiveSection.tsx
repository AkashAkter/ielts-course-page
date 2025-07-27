"use client";

import type { Section } from "@/types/product";
import Image from "next/image";
import { Check } from "lucide-react";

interface CourseExclusiveSectionProps {
  section: Section;
}

export default function CourseExclusiveSection({
  section,
}: CourseExclusiveSectionProps) {
  return (
    <section className="bg-white">
      <h2 className="text-xl xl:text-2xl font-bold mb-4 text-gray-800">
        {section.name}
      </h2>

      {section.description && (
        <div
          className="text-gray-600 mb-6 prose prose-sm xl:prose-base max-w-none text-center"
          dangerouslySetInnerHTML={{ __html: section.description }}
        />
      )}

      <div className="space-y-6 border border-gray-200 rounded-lg">
        {section.values?.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row md:items-start gap-4 p-4 xl:p-6 border border-gray-100 rounded-md"
          >
            <div className="flex-1">
              <h3 className="text-base xl:text-lg font-semibold text-gray-800 mb-3 xl:mb-4">
                {item.title}
              </h3>

              {item.checklist && (
                <ul className="space-y-2">
                  {item.checklist.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check
                        className="text-blue-500 mt-0.5 flex-shrink-0"
                        size={18}
                      />
                      <span className="text-gray-700 text-sm xl:text-base">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {item.file_url && (
              <div className="w-full md:w-52 xl:w-60 flex-shrink-0">
                <Image
                  src={item.file_url || "/placeholder.svg"}
                  alt={item.title || "Feature image"}
                  width={300}
                  height={300}
                  className="w-full h-auto rounded-md object-cover"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
