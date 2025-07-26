interface HeroProps {
  title: string;
  description: string;
}

export default function Hero({ title, description }: HeroProps) {
  return (
    <section
      className="w-full bg-cover bg-center bg-no-repeat text-white"
      style={{
        backgroundImage: `url('https://cdn.10minuteschool.com/images/ui_%281%29_1716445506383.jpeg')`,
      }}
    >
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="w-full lg:w-3/5 text-left">
          <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-6">
            {title || "Course Title"}
          </h1>
          {description ? (
            <div
              className="text-md md:text-lg lg:text-lg mb-8 text-[#A3A3A3] prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ) : (
            <p className="text-lg md:text-xl lg:text-lg mb-8 text-[#A3A3A3]">
              Course description will be available soon.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
