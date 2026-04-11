import { Check } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

type Option = {
  title: string;
  description: string;
  bestFor: string;
  price: string;
  period: string;
  features: string[];
  bestValue?: boolean;
};

const personalTrainingOptions: Option[] = [
  {
    title: "1:1 PERSONAL TRAINING",
    description: "High-touch coaching for clients who want hands-on guidance, precision programming, and accountability.",
    bestFor: "Those who want elite results with zero guesswork.",
    price: "£150",
    period: "per session",
    features: [
      "Personalized workout plans",
      "Full attention & form correction",
      "Progress tracking",
      "Flexible scheduling"
    ],
    bestValue: false
  },
  {
    title: "2-ON-1 PERSONAL TRAINING",
    description: "Train with a partner or friend and share the motivation while receiving expert guidance.",
    bestFor: "Those who want accountability with a training partner.",
    price: "£210",
    period: "per session",
    features: [
      "Partner accountability",
      "Shared session cost",
      "Competitive motivation",
      "Social fitness experience"
    ],
    bestValue: true
  }
];

const onlineOptions: Option[] = [
  {
    title: "ONLINE COACHING",
    description: "Data-driven programming, macro targets, and weekly check-ins — wherever you are.",
    bestFor: "Self-motivated clients who still want expert oversight.",
    price: "£250",
    period: "per month",
    features: [
      "Custom training programs",
      "Macro targets",
      "Weekly check-ins",
      "Data-driven approach"
    ],
    bestValue: false
  },
  {
    title: "ONLINE TRAINING COMMUNITY",
    description: "Join our community with multiple programs to choose from to suit your goals, plus community forums and groups.",
    bestFor: "Those looking for affordable guided training with community support.",
    price: "£25",
    period: "per month",
    features: [
      "Multiple program options",
      "Community forums",
      "Support groups",
      "Goal-based training"
    ],
    bestValue: true
  }
];

const ServiceCard = ({ option }: { option: Option }) => (
  <div className="service-card relative p-6 md:p-8 rounded-2xl border border-primary/20 bg-card/40 flex flex-col h-full mt-4 w-full">
    {option.bestValue && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary z-10">
        <span className="text-xs uppercase tracking-wider text-primary-foreground font-bold whitespace-nowrap">
          Best Value
        </span>
      </div>
    )}
    <h3 className="font-display text-xl text-foreground mb-2 uppercase">{option.title}</h3>
    <p className="text-sm text-muted-foreground mb-6 min-h-[60px] leading-relaxed">{option.description}</p>
    
    <div className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/10 min-h-[80px]">
      <span className="text-[10px] uppercase tracking-wider text-primary font-bold">Best for:</span>
      <p className="text-sm text-muted-foreground mt-1">{option.bestFor}</p>
    </div>
    
    <div className="mb-6 pb-6 border-b border-border flex flex-col justify-center">
      <div className="flex items-baseline mb-1 ml-10 mr-10">
        <span className="font-display text-4xl text-primary">{option.price}</span>
        <span className="text-sm text-muted-foreground ml-2">{option.period}</span>
      </div>
    </div>
    
    <ul className="space-y-3 mt-auto">
      {option.features.map(feature => (
        <li key={feature} className="flex items-start gap-3">
          <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
          <span className="text-sm text-muted-foreground">{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 mb-6">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">
              Training Options
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-7xl text-foreground mb-2 uppercase tracking-tight">
            How I Help You
            <br />
            <span className="text-primary">Get Results</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 max-w-6xl mx-auto">
          {/* Personal Training Column */}
          <div className="flex flex-col">
            <h3 className="text-center font-display text-2xl text-foreground mb-6 uppercase tracking-wider">
              Personal Training
            </h3>
            <Carousel className="w-full relative" opts={{ loop: true }}>
              <CarouselContent className="py-2">
                {personalTrainingOptions.map(option => (
                  <CarouselItem key={option.title}>
                    <ServiceCard option={option} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-6 top-[280px] md:top-[300px] bg-transparent border-primary text-primary hover:bg-primary/10 w-8 h-8 z-10 -translate-y-1/2" />
              <CarouselNext className="absolute right-6 top-[280px] md:top-[300px] bg-transparent border-primary text-primary hover:bg-primary/10 w-8 h-8 z-10 -translate-y-1/2" />
            </Carousel>
          </div>

          {/* Online Options Column */}
          <div className="flex flex-col">
            <h3 className="text-center font-display text-2xl text-foreground mb-6 uppercase tracking-wider">
              Online Options
            </h3>
            <Carousel className="w-full relative" opts={{ loop: true }}>
              <CarouselContent className="py-2">
                {onlineOptions.map(option => (
                  <CarouselItem key={option.title}>
                    <ServiceCard option={option} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-6 top-[280px] md:top-[300px] bg-transparent border-primary text-primary hover:bg-primary/10 w-8 h-8 z-10 -translate-y-1/2" />
              <CarouselNext className="absolute right-6 top-[280px] md:top-[300px] bg-transparent border-primary text-primary hover:bg-primary/10 w-8 h-8 z-10 -translate-y-1/2" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
