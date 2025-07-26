import { fetchProductData } from "@/lib/api";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InstructorSection from "@/components/InstructorSection";
import FeaturesSection from "@/components/FeaturesSection";
import PointersSection from "@/components/PointersSection";
import AboutSection from "@/components/AboutSection";
import VideoPlayer from "@/components/VideoPlayer";
import CTASection from "@/components/CTASection";
import ChecklistSection from "@/components/ChecklistSection";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import CourseExclusiveSection from "@/components/CourseExclusiveSection";

interface PageProps {
  searchParams: { lang?: "en" | "bn" };
}

export default async function Home({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const lang = resolvedSearchParams.lang || "en";
  const productData = await fetchProductData(lang);

  if (!productData) {
    notFound();
  }

  // Filter sections by type with null checks
  const instructorSections =
    productData.sections?.filter((section) => section.type === "instructors") ||
    [];
  const featuresSections =
    productData.sections?.filter((section) => section.type === "features") ||
    [];
  const pointersSections =
    productData.sections?.filter((section) => section.type === "pointers") ||
    [];
  const aboutSections =
    productData.sections?.filter((section) => section.type === "about") || [];
  const featureExplanationSections =
    productData.sections?.filter(
      (section) => section.type === "feature_explanations"
    ) || [];

  return (
    <div className="min-h-screen">
      {/* Header with language toggle */}
      <Header currentLang={lang} />

      {/* Hero Section with product title and description */}
      <Hero title={productData.title} description={productData.description} />

      {/* Main Content - Two Column Layout */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - 60% width on desktop */}
          <div className="w-full lg:w-3/5 space-y-8">
            {/* Instructors */}
            {instructorSections.length > 0 &&
              instructorSections.map((section) => (
                <InstructorSection key={section.order_idx} section={section} />
              ))}

            {/* How the course is laid out */}
            {featuresSections.length > 0 &&
              featuresSections.map((section) => (
                <FeaturesSection key={section.order_idx} section={section} />
              ))}

            {/* What you will learn by doing the course */}
            {pointersSections.length > 0 &&
              pointersSections.map((section) => (
                <PointersSection key={section.order_idx} section={section} />
              ))}

            {/* Course Exclusive Feature */}
            {featureExplanationSections.length > 0 &&
              featureExplanationSections.map((section) => (
                <CourseExclusiveSection
                  key={section.order_idx}
                  section={section}
                />
              ))}

            {/* Course details */}
            {aboutSections.length > 0 &&
              aboutSections.map((section) => (
                <AboutSection key={section.order_idx} section={section} />
              ))}

            {/* Fallback message if no sections */}
            {instructorSections.length === 0 &&
              featuresSections.length === 0 &&
              pointersSections.length === 0 &&
              aboutSections.length === 0 && (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <p className="text-gray-600">
                    Course content is being updated. Please check back later.
                  </p>
                </div>
              )}
          </div>

          {/* Right Column - 40% width on desktop */}
          <div className="w-full lg:w-2/5 space-y-8">
            {/* Product trailer (YouTube player) */}
            {productData.media && productData.media.length > 0 && (
              <VideoPlayer media={productData.media} />
            )}

            {/* CTA Section */}
            {productData.cta_text && (
              <CTASection ctaText={productData.cta_text} />
            )}

            {/* Checklist */}
            {productData.checklist && productData.checklist.length > 0 && (
              <ChecklistSection checklist={productData.checklist} />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const lang = resolvedSearchParams.lang || "en";
  const productData = await fetchProductData(lang);

  if (!productData) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: productData.seo.title || productData.title,
    description: productData.seo.description,
    keywords: productData.seo.keywords?.join(", "),
    openGraph: {
      title: productData.seo.title || productData.title,
      description: productData.seo.description,
      images: productData.media?.find((m) => m.resource_type === "image")
        ?.resource_value
        ? [
            productData.media.find((m) => m.resource_type === "image")!
              .resource_value,
          ]
        : [],
    },
  };
}
