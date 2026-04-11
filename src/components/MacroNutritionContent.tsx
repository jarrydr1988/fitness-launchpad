import { ArrowRight, Target, TrendingUp, Clock, Settings, Dumbbell, Apple, Moon, Heart, Zap, Scale, Brain, Flame, Shield, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import proteinFoods from "@/assets/protein-foods.jpg";
import carbFoods from "@/assets/carb-foods.jpg";
import fatFoods from "@/assets/fat-foods.jpg";
import performanceWheel from "@/assets/performance-wheel.jpg";
interface MacroNutritionContentProps {
  onScrollToCalculator: () => void;
}
const MacroNutritionContent = ({
  onScrollToCalculator
}: MacroNutritionContentProps) => {
  return <div className="mt-20 space-y-24">
      {/* Hero Section */}
      <section className="text-center">
        <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
          Precision Nutrition. <span className="text-primary">Predictable Results.</span>
        </h2>
        <div className="max-w-2xl mx-auto space-y-4">
          <p className="text-muted-foreground font-body text-lg">
            Most people don't fail because they lack discipline.<br />
            <strong className="text-foreground">They fail because they're guessing.</strong>
          </p>
          <p className="text-muted-foreground font-body">
            Macronutrients remove guesswork and replace it with control, clarity, and measurable outcomes. When your intake is aligned with your body and your goal, results stop being random.
          </p>
        </div>
      </section>

      {/* What Are Macros */}
      <section>
        <h2 className="font-display text-2xl md:text-3xl text-foreground mb-6 text-center">
          What Are <span className="text-primary">Macros?</span>
        </h2>
        <div className="max-w-2xl mx-auto">
          <p className="text-muted-foreground font-body mb-6">Macros, short for macronutrients, are the three primary nutrients that determine how your body looks, performs, and recovers:</p>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <a href="#protein-section" className="bg-card border border-border rounded-lg p-4 text-center hover:border-primary transition-colors cursor-pointer">
              <span className="font-display text-primary text-lg">Protein</span>
            </a>
            <a href="#carbohydrates-section" className="bg-card border border-border rounded-lg p-4 text-center hover:border-primary transition-colors cursor-pointer">
              <span className="font-display text-primary text-lg">Carbohydrates</span>
            </a>
            <a href="#fats-section" className="bg-card border border-border rounded-lg p-4 text-center hover:border-primary transition-colors cursor-pointer">
              <span className="font-display text-primary text-lg">Fats</span>
            </a>
          </div>
          <div className="bg-card border border-primary/30 rounded-lg p-6">
            <p className="text-foreground font-body text-center">
              <strong>Calories</strong> determine whether your weight changes.<br />
              <strong>Macros</strong> determine <em>what that weight is made of.</em>
            </p>
          </div>
          <p className="text-muted-foreground font-body mt-6 text-center">When set correctly, macros allow you to lose fat, maintain or build muscle, and perform at a high level, without unnecessary restriction.</p>
        </div>
      </section>

      {/* Protein Section */}
      <section id="protein-section">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="font-display text-2xl md:text-3xl text-foreground mb-2">
              Protein: <span className="text-primary">The Foundation of Body Composition</span>
            </h3>
            <div className="space-y-6 mt-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-display text-foreground mb-1">Preserves and builds lean muscle</h4>
                  <p className="text-muted-foreground font-body text-sm">
                    Protein supplies the amino acids required to maintain and develop muscle tissue, particularly under training stress.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Flame className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-display text-foreground mb-1">Accelerates fat loss</h4>
                  <p className="text-muted-foreground font-body text-sm">
                    Higher protein intake increases satiety, stabilises blood sugar, and protects lean mass while dieting.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-display text-foreground mb-1">Enhances recovery and resilience</h4>
                  <p className="text-muted-foreground font-body text-sm">
                    Adequate protein improves recovery between sessions, allowing consistent training and long-term progress.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img src={proteinFoods} alt="High-quality protein sources including chicken, salmon, eggs and beef" className="rounded-lg shadow-xl w-full" />
          </div>
        </div>
      </section>

      {/* Carbohydrates Section */}
      <section id="carbohydrates-section">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <img src={carbFoods} alt="Healthy carbohydrate sources including sweet potatoes, oats and whole grains" className="rounded-lg shadow-xl w-full" />
          </div>
          <div className="order-1 md:order-2">
            <h3 className="font-display text-2xl md:text-3xl text-foreground mb-2">
              Carbohydrates: <span className="text-primary">Performance and Output</span>
            </h3>
            <div className="space-y-6 mt-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-display text-foreground mb-1">Primary training fuel</h4>
                  <p className="text-muted-foreground font-body text-sm">
                    Carbohydrates power workouts, daily movement, and cognitive performance.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-display text-foreground mb-1">Support strength and intensity</h4>
                  <p className="text-muted-foreground font-body text-sm">
                    Stored glycogen allows you to train harder, lift heavier, and sustain output across sessions.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-display text-foreground mb-1">Hormonal and metabolic support</h4>
                  <p className="text-muted-foreground font-body text-sm">
                    Carbs play a key role in stress regulation, thyroid health, and long-term metabolic efficiency.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fats Section */}
      <section id="fats-section">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="font-display text-2xl md:text-3xl text-foreground mb-2">
              Fats: <span className="text-primary">Hormones, Health, and Sustainability</span>
            </h3>
            <div className="space-y-6 mt-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-display text-foreground mb-1">Essential for hormone production</h4>
                  <p className="text-muted-foreground font-body text-sm">
                    Dietary fats support testosterone, oestrogen, and overall endocrine function.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Apple className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-display text-foreground mb-1">Enable nutrient absorption</h4>
                  <p className="text-muted-foreground font-body text-sm">
                    Vitamins A, D, E, and K require fat to be absorbed and utilised effectively.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Scale className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-display text-foreground mb-1">Promote satiety and energy stability</h4>
                  <p className="text-muted-foreground font-body text-sm">
                    Fats provide long-lasting energy and help regulate appetite throughout the day.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img src={fatFoods} alt="Healthy fat sources including avocados, olive oil, nuts and salmon" className="rounded-lg shadow-xl w-full" />
          </div>
        </div>
      </section>

      {/* Why Calories & Macros Matter */}
      <section className="bg-card border border-border rounded-lg p-8 md:p-12">
        <h2 className="font-display text-2xl md:text-3xl text-foreground mb-8 text-center">
          Why Calories & Macros <span className="text-primary">Matter</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-display text-foreground mb-1">They eliminate guesswork</h4>
              <p className="text-muted-foreground font-body text-sm">
                No more "eating clean" without results. Precision replaces assumptions.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-display text-foreground mb-1">They create predictability</h4>
              <p className="text-muted-foreground font-body text-sm">
                When intake matches your goal, outcomes become repeatable and measurable.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-display text-foreground mb-1">They support long-term consistency</h4>
              <p className="text-muted-foreground font-body text-sm">
                Clear targets simplify decision-making and reduce mental fatigue.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-display text-foreground mb-1">They allow intelligent adjustment</h4>
              <p className="text-muted-foreground font-body text-sm">
                Progress stalls? You know exactly what to change — and why.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* How to Use Your Macro Targets */}
      <section>
        <h2 className="font-display text-2xl md:text-3xl text-foreground mb-8 text-center">
          How to Use Your <span className="text-primary">Macro Targets</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-display text-sm">1</span>
              <h4 className="font-display text-foreground">Track with Precision</h4>
            </div>
            <p className="text-muted-foreground font-body text-sm">
              Log food using MyFitnessPal, Cronometer, or FoodNoms to ensure accuracy.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-display text-sm">2</span>
              <h4 className="font-display text-foreground">Build Around Protein</h4>
            </div>
            <p className="text-muted-foreground font-body text-sm">
              Anchor every meal with protein, then allocate carbohydrates and fats to complete your targets.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-display text-sm">3</span>
              <h4 className="font-display text-foreground">Assess and Refine</h4>
            </div>
            <p className="text-muted-foreground font-body text-sm">
              Review progress over 2–3 weeks and adjust based on results, performance, and energy.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-display text-sm">4</span>
              <h4 className="font-display text-foreground">Stay Consistent</h4>
            </div>
            <p className="text-muted-foreground font-body text-sm">
              Aim to land within 5–10g per macro daily. Perfection isn't required — discipline over time is.
            </p>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="bg-card border border-border rounded-lg p-8 md:p-12">
        <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4 text-center">
          Our Macro Calculator <span className="text-primary">Methodology</span>
        </h2>
        <p className="text-muted-foreground font-body text-center mb-8 max-w-xl mx-auto">
          We use scientifically validated formulas combined for greater accuracy and reliability.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-display text-lg text-foreground mb-3">Basal Metabolic Rate (BMR)</h4>
            <p className="text-muted-foreground font-body text-sm mb-4">
              Your BMR is calculated using an average of two gold-standard equations:
            </p>
            <ul className="space-y-2 text-muted-foreground font-body text-sm">
              <li className="flex items-center gap-2">
                <span className="text-primary">•</span>
                Harris-Benedict
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">•</span>
                Mifflin-St Jeor
              </li>
            </ul>
            <p className="text-muted-foreground font-body text-sm mt-4">
              This dual-formula approach reduces bias and improves accuracy across different body types.
            </p>
          </div>
          
          <div>
            <h4 className="font-display text-lg text-foreground mb-3">Total Daily Energy Expenditure (TDEE)</h4>
            <p className="text-muted-foreground font-body text-sm mb-4">
              Your BMR is adjusted for:
            </p>
            <ul className="space-y-2 text-muted-foreground font-body text-sm">
              <li className="flex items-center gap-2">
                <span className="text-primary">•</span>
                Training frequency
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">•</span>
                Daily movement
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">•</span>
                Lifestyle demands
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display text-lg text-foreground mb-3">Goal-Based Calorie Adjustment</h4>
            <ul className="space-y-2 text-muted-foreground font-body text-sm">
              <li className="flex items-center gap-2">
                <span className="text-primary font-display">Fat Loss:</span>
                15–25% deficit
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary font-display">Maintenance:</span>
                TDEE
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary font-display">Muscle Gain:</span>
                5–15% surplus
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display text-lg text-foreground mb-3">Macro Allocation</h4>
            <p className="text-muted-foreground font-body text-sm">
              Protein is set based on body weight and objective. Remaining calories are intelligently split between carbohydrates and fats based on performance demands and preference.
            </p>
          </div>
        </div>
      </section>

      {/* The Bigger Picture */}
      <section>
        <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4 text-center">
          The Bigger Picture: <span className="text-primary">Total Performance</span>
        </h2>
        <p className="text-muted-foreground font-body text-center mb-8 max-w-xl mx-auto">
          Your body operates as a system. When one area is neglected, results stall.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <div className="flex items-start gap-3 bg-card border border-border rounded-lg p-4">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
              <Flame className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h4 className="font-display text-foreground text-sm mb-1">Total Calories</h4>
              <p className="text-muted-foreground font-body text-xs">Precise fuel, not restriction</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-card border border-border rounded-lg p-4">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h4 className="font-display text-foreground text-sm mb-1">Gut Health</h4>
              <p className="text-muted-foreground font-body text-xs">Absorption dictates outcomes</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-card border border-border rounded-lg p-4">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
              <Apple className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h4 className="font-display text-foreground text-sm mb-1">Food Quality</h4>
              <p className="text-muted-foreground font-body text-xs">High-performance inputs only</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-card border border-border rounded-lg p-4">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
              <Activity className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h4 className="font-display text-foreground text-sm mb-1">Lifestyle</h4>
              <p className="text-muted-foreground font-body text-xs">Stress, routine, recovery</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-card border border-border rounded-lg p-4">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
              <Dumbbell className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h4 className="font-display text-foreground text-sm mb-1">Training</h4>
              <p className="text-muted-foreground font-body text-xs">Structured, progressive, intentional</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-card border border-border rounded-lg p-4">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
              <Scale className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h4 className="font-display text-foreground text-sm mb-1">Macronutrients</h4>
              <p className="text-muted-foreground font-body text-xs">Measured, not guessed</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-card border border-border rounded-lg p-4 md:col-span-2 md:max-w-xs md:mx-auto">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
              <Moon className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h4 className="font-display text-foreground text-sm mb-1">Sleep</h4>
              <p className="text-muted-foreground font-body text-xs">The non-negotiable foundation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Macros Alone Are Not Enough */}
      <section className="bg-card border border-border rounded-lg p-8 md:p-12">
        <h2 className="font-display text-2xl md:text-3xl text-foreground mb-6 text-center">
          Why Macros Alone <span className="text-primary">Are Not Enough</span>
        </h2>
        <p className="text-muted-foreground font-body text-center mb-8 max-w-xl mx-auto">Macros are a powerful starting point, not the full solution. Most people discover that:</p>
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <div className="flex items-start gap-3">
            <span className="text-primary">•</span>
            <p className="text-muted-foreground font-body text-sm">
              Nutrition alone produces limited transformation
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-primary">•</span>
            <p className="text-muted-foreground font-body text-sm">
              Weight loss without training often sacrifices muscle
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-primary">•</span>
            <p className="text-muted-foreground font-body text-sm">
              Sustainable change requires structured habits
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-primary">•</span>
            <p className="text-muted-foreground font-body text-sm">
              True results come from alignment, not isolated effort
            </p>
          </div>
        </div>
      </section>

      {/* Why Combine Macros with Personal Training */}
      <section>
        <h2 className="font-display text-2xl md:text-3xl text-foreground mb-8 text-center">
          Why Combine Macros with <span className="text-primary">Personal Training</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-display text-foreground mb-2">Maximise Nutrient Utilisation</h4>
            <p className="text-muted-foreground font-body text-sm">
              Training directs nutrients where they belong — into muscle, performance, and recovery.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
              <Dumbbell className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-display text-foreground mb-2">Body Recomposition, Not Just Weight Loss</h4>
            <p className="text-muted-foreground font-body text-sm">
              The right training allows fat loss without sacrificing muscle, creating a lean, athletic physique.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
              <Brain className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-display text-foreground mb-2">Lifestyle Integration</h4>
            <p className="text-muted-foreground font-body text-sm">
              This is not about perfection. It's about systems that work in real life.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-display text-foreground mb-2">Faster, Visible Results</h4>
            <p className="text-muted-foreground font-body text-sm">
              Macro tracking builds consistency. Intelligent training accelerates change.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section - Moved to Bottom */}
      <section className="text-center bg-gradient-to-b from-primary/10 to-transparent rounded-lg p-8 md:p-12">
        <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4">
          👉 Get Your Personalised <span className="text-primary">Macro Targets</span>
        </h2>
        <p className="text-muted-foreground font-body mb-6 max-w-xl mx-auto">Enter your details and receive your customised calorie and macro breakdown, delivered directly to your inbox.</p>
        <div className="flex justify-center">
          <Button variant="hero" size="xl" onClick={onScrollToCalculator} className="gap-2">
            Calculate Your Macros
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>;
};
export default MacroNutritionContent;