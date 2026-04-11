import heroImage from "@/assets/hero-trainer.jpg";
import RotatingWord from "./RotatingWord";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img src={heroImage} alt="Personal trainer in gym" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Accent Glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 hero-content">
        <div className="max-w-3xl">
          {/* Tagline */}
          <div className="hero-tagline inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 my-[40px]">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-body text-sm uppercase tracking-wider text-primary font-semibold">
              Transform Your Body
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="hero-heading font-display text-6xl md:text-8xl lg:text-9xl leading-none mb-6 uppercase">
            <span className="text-foreground">Unlock</span>
            <br />
            <span className="text-foreground">Your </span>
            <RotatingWord />
          </h1>

          {/* Subheading */}
          <p className="hero-subheading font-body text-lg md:text-xl text-muted-foreground max-w-xl mb-10">
            If you've lost touch with how strong, fit, and capable your body should feel, you're not alone.
            Our coaching is designed for people who demand high performance in their career and want the same from their body.
          </p>

          {/* CTA Button */}
          <a href="#contact">
            <Button variant="hero" size="lg">
              Start Your Journey
            </Button>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;