import type { Section } from "@/types/product";
import { ChevronRight } from "lucide-react";

interface PointersSectionProps {
  section: Section;
}

export default function PointersSection({ section }: PointersSectionProps) {
  return (
    <section className="bg-white rounded-lg">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
        {section.name}
      </h2>
      {section.description && (
        <div
          className="text-gray-600 mb-6 prose max-w-none"
          dangerouslySetInnerHTML={{ __html: section.description }}
        />
      )}

      {section.values && section.values.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-200 rounded-lg">
          {section.values.map((pointer, index) => (
            <div
              key={pointer.id || index}
              className="flex items-start gap-3 p-4"
            >
              <ChevronRight
                className="text-gray-800 mt-0.5 flex-shrink-0"
                size={18}
              />
              <div>
                <p className="text-gray-800">{pointer.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
