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
import MobileHeroContent from "@/components/MobileHeroContent";

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
    <div className="min-h-screen bg-white">
      {/* Header with language toggle */}
      <Header currentLang={lang} />

      {/* Hero Section - Desktop/Tablet only */}
      <div className="hidden lg:block">
        <Hero title={productData.title} description={productData.description} />
      </div>

      {/* Main Content Container - Max width 1200px */}
      <main className="max-w-[1300] mx-auto px-4 py-6 lg:py-8">
        {/* Mobile Layout - Vertical Flow */}
        <div className="block lg:hidden space-y-6">
          {/* Mobile: 1. Trailer Video Section */}
          {productData.media && productData.media.length > 0 && (
            <div className="mb-6">
              <VideoPlayer media={productData.media} />
            </div>
          )}

          {/* Mobile: 2. Product Title & Description */}
          <MobileHeroContent
            title={productData.title}
            description={productData.description}
          />

          {/* Mobile: 3. CTA Section (price + enroll button) */}
          <div className="mb-6">
            <CTASection
              ctaText={productData.cta_text}
              productData={productData}
              currentLang={lang}
            />
          </div>

          {/* Mobile: 4. What You'll Get */}
          {productData.checklist && productData.checklist.length > 0 && (
            <div className="mb-6">
              <ChecklistSection checklist={productData.checklist} />
            </div>
          )}

          {/* Mobile: 5. Course Instructor */}
          {instructorSections.length > 0 &&
            instructorSections.map((section) => (
              <div key={section.order_idx} className="mb-6">
                <InstructorSection section={section} />
              </div>
            ))}

          {/* Mobile: 6. How the Course is Laid Out */}
          {featuresSections.length > 0 &&
            featuresSections.map((section) => (
              <div key={section.order_idx} className="mb-6">
                <FeaturesSection section={section} />
              </div>
            ))}

          {/* Mobile: 7. What You Will Learn */}
          {pointersSections.length > 0 &&
            pointersSections.map((section) => (
              <div key={section.order_idx} className="mb-6">
                <PointersSection section={section} />
              </div>
            ))}

          {/* Mobile: 8. Course Exclusive Features */}
          {featureExplanationSections.length > 0 &&
            featureExplanationSections.map((section) => (
              <div key={section.order_idx} className="mb-6">
                <CourseExclusiveSection section={section} />
              </div>
            ))}

          {/* Mobile: 9. Course Details */}
          {aboutSections.length > 0 &&
            aboutSections.map((section) => (
              <div key={section.order_idx} className="mb-6">
                <AboutSection section={section} />
              </div>
            ))}
        </div>

        {/* Desktop/Tablet Layout - Two Column */}
        <div className="hidden lg:flex gap-6 xl:gap-8">
          {/* Left Column - 60% width */}
          <div className="w-4/6 space-y-8">
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
                <div className="bg-white rounded-lg shadow-md p-6 xl:p-8 text-center">
                  <p className="text-gray-600 text-sm xl:text-base">
                    Course content is being updated. Please check back later.
                  </p>
                </div>
              )}
          </div>

          {/* Right Column - 40% width */}
          <div className="w-2/6">
            {/* Video Player - Negative margin to align with hero */}
            {productData.media && productData.media.length > 0 && (
              <div className="-mt-20 xl:-mt-24 mb-8">
                <VideoPlayer media={productData.media} />
              </div>
            )}

            {/* Static container for CTA and Checklist */}
            <div className="space-y-6">
              {/* CTA Section */}
              <div>
                <CTASection
                  ctaText={productData.cta_text}
                  productData={productData}
                  currentLang={lang}
                />
              </div>

              {/* Checklist */}
              {productData.checklist && productData.checklist.length > 0 && (
                <div>
                  <ChecklistSection checklist={productData.checklist} />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile CTA (no longer sticky) */}
      <div className="lg:hidden p-4 bg-white border-t border-gray-200 shadow-lg">
        <CTASection
          ctaText={productData.cta_text}
          productData={productData}
          currentLang={lang}
        />
      </div>
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
