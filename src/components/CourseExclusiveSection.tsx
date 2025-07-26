import type { Section } from "@/types/product";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

interface CourseExclusiveSectionProps {
  section: Section;
}

export default function CourseExclusiveSection({
  section,
}: CourseExclusiveSectionProps) {
  return (
    <section className="bg-white">
      <h2 className="text-xl md:mb-4 md:text-2xl">{section.name}</h2>

      {section.description && (
        <div
          className="text-gray-600 mb-10 max-w-3xl mx-auto text-center prose"
          dangerouslySetInnerHTML={{ __html: section.description }}
        />
      )}

      <div className="space-y-6 ">
        {section.values?.map((item, index) => (
          <div
            key={item.id || index}
            className="flex flex-col md:flex-row md:items-start gap-4 border rounded-lg p-6"
          >
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {item.title}
              </h3>
              {item.checklist && (
                <ul className="space-y-2">
                  {item.checklist.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="text-blue-600 mt-0.5" size={16} />
                      <span className="text-gray-700 text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {item.file_url && (
              <div className="w-full md:w-40 flex-shrink-0">
                <Image
                  src={item.file_url}
                  alt={item.title || "Feature Image"}
                  width={160}
                  height={160}
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
