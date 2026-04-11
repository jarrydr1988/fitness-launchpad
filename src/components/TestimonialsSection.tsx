import { Quote } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Alex T. - CEO",
      story: "Juggling a company and family left zero room for my health. The structure and intensity of this program were exactly what I needed. I'm now in the best shape of my life, and my focus at work has never been sharper.",
      result: "Peak Performance"
    },
    {
      name: "Samantha B. - Lawyer",
      story: "I thrive under pressure, but my fitness was a constant point of failure. The no-nonsense, results-driven approach here finally clicked. I've surpassed every single goal we set.",
      result: "Smashed Goals"
    },
    {
      name: "Michael C. - Entrepreneur",
      story: "I thought I knew how to train. I was wrong. The science-backed methodology here is on another level. The strength and physique gains I've made in 6 months are more than I achieved in the last 5 years.",
      result: "+25lbs Lean Mass"
    },
    {
      name: "Jessica L. - Surgeon",
      story: "Long hours and high stress were taking a toll. This program wasn't just a workout, it was a complete overhaul of my physical and mental resilience. The discipline I've built in the gym now carries into every aspect of my life.",
      result: "Total Resilience"
    }
  ];

  const TestimonialCard = ({
    testimonial,
    index
  }: {
    testimonial: typeof testimonials[0];
    index: number;
  }) => (
    <div
      className="testimonial-card group relative p-8 md:p-10 rounded-2xl bg-secondary/30 border border-border hover:border-primary/30 transition-all duration-500 h-full min-h-[320px] flex flex-col"
      style={{ '--card-index': index } as React.CSSProperties}
    >
      <Quote className="w-12 h-12 text-primary/30 mb-6 flex-shrink-0" />
      <p className="font-body text-lg text-foreground/90 leading-relaxed mb-8 flex-grow">
        "{testimonial.story}"
      </p>
      <div className="flex items-center justify-between flex-shrink-0">
        <div>
          <p className="font-display text-xl text-foreground uppercase">
            {testimonial.name}
          </p>
        </div>
        <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
          <span className="font-body text-sm font-semibold text-primary uppercase tracking-wider">
            {testimonial.result}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="font-body text-sm uppercase tracking-wider text-primary font-semibold">
              Success Stories
            </span>
          </div>

          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-foreground mb-6 uppercase">
            Real People,
            <br />
            <span className="text-gradient">Real Results</span>
          </h2>

          <p className="font-body text-lg text-muted-foreground">
            Don't just take our word for it. Here are the stories of people who
            transformed their lives through our dedicated coaching.
          </p>
        </div>

        {/* Two Carousel Blocks with Scroll Animation */}
        <div className="testimonials-container grid md:grid-cols-2 gap-8">
          <Carousel opts={{ loop: true }} className="w-full testimonial-carousel testimonial-carousel-1">
            <CarouselContent>
              {testimonials.slice(0, 2).map((testimonial, index) => (
                <CarouselItem key={testimonial.name}>
                  <TestimonialCard testimonial={testimonial} index={index} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-6">
              <CarouselPrevious className="static translate-y-0 h-10 w-10" />
              <CarouselNext className="static translate-y-0 h-10 w-10" />
            </div>
          </Carousel>

          <Carousel opts={{ loop: true }} className="w-full testimonial-carousel testimonial-carousel-2">
            <CarouselContent>
              {testimonials.slice(2, 4).map((testimonial, index) => (
                <CarouselItem key={testimonial.name}>
                  <TestimonialCard testimonial={testimonial} index={index + 2} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-6">
              <CarouselPrevious className="static translate-y-0 h-10 w-10" />
              <CarouselNext className="static translate-y-0 h-10 w-10" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;