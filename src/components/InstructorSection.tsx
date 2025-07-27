import type { Section } from "@/types/product";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface InstructorSectionProps {
  section: Section;
}

export default function InstructorSection({ section }: InstructorSectionProps) {
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
        <div className="space-y-4">
          {section.values.map((instructor, index) => (
            <div
              key={instructor.id || index}
              className="flex flex-col sm:flex-row items-center gap-4 p-3 xl:p-4 rounded-lg transition-colors border border-gray-200"
            >
              {instructor.image && (
                <div className="flex-shrink-0">
                  <Image
                    src={instructor.image || "/placeholder.svg"}
                    alt={instructor.name || "Instructor"}
                    width={80}
                    height={80}
                    className="rounded-full object-cover w-16 h-16 sm:w-20 sm:h-20"
                  />
                </div>
              )}
              <div className="flex-1 w-full">
                <Link
                  href="https://10minuteschool.com/en/skills/instructors/munzereen-shahid/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 w-fit"
                >
                  <h3 className="font-bold text-gray-800 group-hover:text-green-600 transition-colors text-base xl:text-lg">
                    {instructor.name}
                  </h3>
                  <ChevronRight className="text-gray-500 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                </Link>

                {instructor.description && (
                  <div
                    className="text-sm text-gray-600 prose prose-sm max-w-none mt-2"
                    dangerouslySetInnerHTML={{ __html: instructor.description }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
