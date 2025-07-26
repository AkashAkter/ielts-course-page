import type { Section } from "@/types/product";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

interface FeaturesSectionProps {
  section: Section;
}

export default function FeaturesSection({ section }: FeaturesSectionProps) {
  return (
    <section>
      {/* Header remains with white background */}
      <div className="bg-white rounded-lg mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          {section.name}
        </h2>
        {section.description && (
          <div
            className="text-gray-600 mt-2 prose max-w-none"
            dangerouslySetInnerHTML={{ __html: section.description }}
          />
        )}
      </div>

      <div className="bg-gray-900 rounded-lg p-6 md:p-8">
        {section.values && section.values.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.values.map((feature, index) => (
              <div
                key={feature.id || index}
                className="flex items-start gap-3 p-4  "
              >
                {feature.icon ? (
                  <div className="flex-shrink-0 w-6 h-6 mt-1">
                    <Image
                      src={feature.icon || "/placeholder.svg"}
                      alt=""
                      width={24}
                      height={24}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <CheckCircle
                    className="text-green-500 mt-1 flex-shrink-0"
                    size={20}
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-100 mb-1">
                    {feature.title}
                  </h3>
                  {feature.subtitle && (
                    <p className="text-sm text-gray-400 mb-2">
                      {feature.subtitle}
                    </p>
                  )}
                  {feature.description && (
                    <div
                      className="text-sm text-gray-300 prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: feature.description }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
