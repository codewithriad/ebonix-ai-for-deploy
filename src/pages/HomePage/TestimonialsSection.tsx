const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      quote:
        "Ebonix has completely transformed how we approach our digital strategy. The features are intuitive and powerful.",
      author: "Sarah Johnson",
      role: "Chief Technology Officer",
      company: "TechVision Inc.",
    },
    {
      id: 2,
      quote:
        "Implementation was seamless and the customer support team has been incredibly responsive to our needs.",
      author: "Elena Rodriguez",
      role: "VP of Product",
      company: "Innovate Labs",
    },
    {
      id: 3,
      quote:
        "The analytics capabilities alone have saved us countless hours and helped us make data-driven decisions with confidence.",
      author: "Dr. Adisan",
      role: "Director of Operations",
      company: "Apple Xer",
    },
    {
      id: 4,
      quote:
        "Implementation was seamless and the customer support team has been incredibly responsive to our needs.",
      author: "Elena Rodriguez",
      role: "VP of Product",
      company: "Innovate Labs",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="hero-glow w-[500px] h-[500px] bottom-[-200px] right-[-100px]"></div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl text-foreground md:text-5xl font-bold mb-6">
            Trusted by <span className="gradient-text">Industry Leaders</span>
          </h2>
          <p className="text-para text-lg max-w-2xl mx-auto">
            See what our clients have to say about their experience with our
            platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-background border-[5px] border-grayBackground rounded-xl p-8 transition-all hover:border-ebonix-purple hover:shadow-lg hover:shadow-ebonix-purple/20"
            >
              <div className="mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="inline-block w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="mb-6 text-lg">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full bg-ebonix-purple-light flex items-center justify-center text-lg font-bold">
                    {testimonial.author[0]}
                  </div>
                </div>
                <div>
                  <p className="font-bold">{testimonial.author}</p>
                  <p className="text-sm text-ebonix-gray-light">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
