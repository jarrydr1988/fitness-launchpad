import { Award, Target, Users, Zap } from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: Target,
      title: "Precision Goal-Setting",
      description: "We don't do generic. Your goals, your metrics, your success."
    },
    {
      icon: Zap,
      title: "High-Efficiency Training",
      description: "Maximum impact, minimum time. Workouts that respect your schedule."
    },
    {
      icon: Users,
      title: "Executive-Level Coaching",
      description: "The same level of dedication and insight you bring to your work."
    },
    {
      icon: Award,
      title: "Data-Driven Results",
      description: "We track, measure, and optimize for undeniable progress."
    }
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="about-content">
            {/* Section Label */}
            <div className="about-header inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="font-body text-sm uppercase tracking-wider text-primary">
                The Atlas Method
              </span>
            </div>

            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-foreground mb-6">
              ENGINEERED
              <br />
              <span className="text-gradient">FOR ELITE PERFORMANCE</span>
            </h2>

            <p className="font-body text-lg text-muted-foreground mb-12 leading-relaxed">
              At Atlas Strength, we&apos;ve coached CEOs, entrepreneurs, and top-tier professionals who demand the same excellence from their bodies as they do from their careers. We solve the common frustrations: &apos;I&apos;m too busy,&apos; &apos;I&apos;m not seeing results,&apos; &apos;I feel tired and weak.&apos; The problem isn&apos;t your effort it&apos;s your strategy. We provide the strategy.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="about-feature group p-6 rounded-lg bg-secondary/50 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <feature.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-display text-xl text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image/Visual */}
          <div className="about-visual relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              {/* Background Shape */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl" />

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-primary/30 rounded-full" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-primary/20 rounded-full" />

              {/* Stats Card */}
              <div className="absolute bottom-8 right-8 p-6 rounded-xl bg-card/90 backdrop-blur-sm border border-border shadow-xl">
                <p className="font-display text-4xl text-primary mb-1">15K+</p>
                <p className="font-body text-sm uppercase tracking-wider text-muted-foreground">
                  Sessions Delivered
                </p>
              </div>

              {/* Certification Badge */}
              <div className="absolute top-8 left-8 p-4 rounded-lg bg-primary/90 backdrop-blur-sm">
                <Award className="w-8 h-8 text-primary-foreground" />
              </div>

              {/* Main Visual Content */}
              <div className="absolute inset-8 flex items-center justify-center">
                <div className="text-center">
                  <p className="font-display text-8xl text-primary/10">PRO</p>
                  <p className="font-display text-4xl text-foreground -mt-4">CERTIFIED</p>
                  <p className="font-body text-sm uppercase tracking-wider text-muted-foreground mt-2">
                    NSCA • CSCS • CPT
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
