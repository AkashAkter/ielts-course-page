interface MobileHeroContentProps {
  title: string;
  description: string;
}

export default function MobileHeroContent({
  title,
  description,
}: MobileHeroContentProps) {
  return (
    <section className="bg-white rounded-lg p-4">
      <h1 className="text-xl font-bold mb-3 text-[#111827] leading-tight">
        {title || "Course Title"}
      </h1>
      {description ? (
        <div
          className="text-gray-600 prose prose-sm max-w-none prose-p:text-gray-600 prose-p:text-sm prose-p:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      ) : (
        <p className="text-gray-600 text-sm">
          Course description will be available soon.
        </p>
      )}
    </section>
  );
}
