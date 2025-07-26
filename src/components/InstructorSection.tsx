import type { Section } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

interface InstructorSectionProps {
  section: Section;
}

export default function InstructorSection({ section }: InstructorSectionProps) {
  return (
    <section className="bg-white  p-6 md:p-8">
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
        <div className="space-y-4">
          {section.values.map((instructor, index) => (
            <div
              key={instructor.id || index}
              className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-lg transition-colors border border-gray-200"
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
                  <h3 className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                    {instructor.name}
                  </h3>
                  <FiArrowRight className="text-gray-500 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
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
