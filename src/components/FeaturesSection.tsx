import type { Section } from "@/types/product";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

interface FeaturesSectionProps {
  section: Section;
}

export default function FeaturesSection({ section }: FeaturesSectionProps) {
  return (
    <section className="bg-white">
      <div className="mb-6">
        <h2 className="text-xl xl:text-2xl font-bold mb-4 text-gray-800">
          {section.name}
        </h2>
        {section.description && (
          <div
            className="text-gray-600 prose prose-sm xl:prose-base max-w-none"
            dangerouslySetInnerHTML={{ __html: section.description }}
          />
        )}
      </div>

      <div className="bg-gray-900 rounded-lg p-6 xl:p-10">
        {section.values && section.values.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.values.map((feature, index) => (
              <div key={feature.id || index} className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {feature.icon ? (
                    <Image
                      src={feature.icon}
                      alt="Feature icon"
                      width={24}
                      height={24}
                      className="w-6 h-6 object-contain"
                    />
                  ) : (
                    <CheckCircle className="text-green-500" size={20} />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-100 mb-1 text-base xl:text-lg">
                    {feature.title}
                  </h3>
                  {feature.subtitle && (
                    <p className="text-sm text-gray-400 mb-1">
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
