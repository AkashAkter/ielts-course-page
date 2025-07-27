interface HeroProps {
  title: string;
  description: string;
}

export default function Hero({ title, description }: HeroProps) {
  return (
    <section
      className="w-full bg-cover bg-center bg-no-repeat text-white relative"
      style={{
        backgroundImage: `url('https://cdn.10minuteschool.com/images/ui_%281%29_1716445506383.jpeg')`,
      }}
    >
      <div className="absolute"></div>
      <div className="relative max-w-[1200px] mx-auto px-4 py-16 md:py-20">
        <div className="w-full lg:w-3/5">
          <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-4 md:mb-6 leading-tight">
            {title || "Course Title"}
          </h1>
          {description ? (
            <div
              className="text-base md:text-md text-[#A3A3A3] prose prose-invert max-w-none prose-p:text-gray-200"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ) : (
            <p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 text-gray-200">
              Course description will be available soon.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
