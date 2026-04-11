import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MacroNutritionContent from "@/components/MacroNutritionContent";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Footer from "@/components/Footer";

type Gender = "male" | "female";
type Goal = "fat-loss" | "muscle-gain" | "maintain";
type WeightUnit = "kg" | "lbs";
type HeightUnit = "cm" | "inches";
type ActivityLevel = "sedentary" | "somewhat-active" | "active" | "very-active";

interface MacroResults {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

const MacroCalculator = () => {
  const calculatorRef = useRef<HTMLDivElement>(null);
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [gender, setGender] = useState<Gender | "">("");
  const [goal, setGoal] = useState<Goal | "">("");
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("kg");
  const [height, setHeight] = useState("");
  const [heightUnit, setHeightUnit] = useState<HeightUnit>("cm");
  const [age, setAge] = useState("");
  const [activityLevel, setActivityLevel] = useState<ActivityLevel | "">("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const scrollToCalculator = () => {
    calculatorRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const activityMultipliers: Record<ActivityLevel, number> = {
    sedentary: 1.2,
    "somewhat-active": 1.375,
    active: 1.55,
    "very-active": 1.725
  };

  const calculateMacros = (): MacroResults | null => {
    if (!gender || !goal || !weight || !height || !age || !activityLevel) {
      return null;
    }
    const weightKg = weightUnit === "lbs" ? parseFloat(weight) * 0.453592 : parseFloat(weight);
    const heightCm = heightUnit === "inches" ? parseFloat(height) * 2.54 : parseFloat(height);
    const ageNum = parseFloat(age);

    let bmr: number;
    if (gender === "male") {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum - 161;
    }

    const tdee = bmr * activityMultipliers[activityLevel];
    let calories: number;
    switch (goal) {
      case "fat-loss":
        calories = tdee - 500;
        break;
      case "muscle-gain":
        calories = tdee + 300;
        break;
      default:
        calories = tdee;
    }

    let proteinMultiplier: number;
    let fatPercentage: number;
    switch (goal) {
      case "fat-loss":
        proteinMultiplier = 2.2;
        fatPercentage = 0.25;
        break;
      case "muscle-gain":
        proteinMultiplier = 2.0;
        fatPercentage = 0.25;
        break;
      default:
        proteinMultiplier = 1.8;
        fatPercentage = 0.30;
    }

    const protein = Math.round(weightKg * proteinMultiplier);
    const fats = Math.round(calories * fatPercentage / 9);
    const carbCalories = calories - protein * 4 - fats * 9;
    const carbs = Math.round(carbCalories / 4);

    return {
      calories: Math.round(calories),
      protein,
      carbs,
      fats
    };
  };

  const handleSubmit = async () => {
    if (!email || !name) {
      toast.error("Please enter your name and email");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    const results = calculateMacros();
    if (!results) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const {
        data,
        error
      } = await supabase.functions.invoke("send-macro-results", {
        body: {
          email,
          name,
          calories: results.calories,
          protein: results.protein,
          carbs: results.carbs,
          fats: results.fats,
          goal
        }
      });
      if (error) throw error;
      setEmailSent(true);
      toast.success("Your macro results have been sent to your email!");
    } catch (error: any) {
      console.error("Error sending email:", error);
      toast.error("Failed to send email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = gender && goal && weight && height && age && activityLevel && email && name;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <span className="font-display text-2xl text-primary">Atlas Strength & Performance</span>
            </Link>
            <Link to="/">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft size={16} />
                Back
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-32 pb-20 px-6">
        <div ref={calculatorRef} className="container mx-auto max-w-2xl">
          {/* Intro Section */}
          <div className="calculator-intro text-center mb-12">
            <div className="calculator-header inline-flex items-center gap-3 mb-4">
              <h1 className="font-display text-4xl md:text-5xl text-foreground">
                MACRO <span className="text-primary">CALCULATOR</span>
              </h1>
            </div>
            
            <h2 className="font-display text-2xl md:text-3xl text-foreground mb-6">
              Not Sure How Much You Should Be Eating?
            </h2>
            
            <div className="text-left max-w-lg mx-auto mb-8">
              <p className="text-muted-foreground font-body mb-4">Most people are either:</p>
              <ul className="space-y-2 text-muted-foreground font-body mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Eating too much and spinning their wheels
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Or eating too little and killing their progress
                </li>
              </ul>
            </div>

            <h3 className="font-display text-xl md:text-2xl text-primary mb-6">Get Your Personal Macro Breakdown Free!</h3>

            <div className="text-left max-w-lg mx-auto mb-6">
              <p className="text-muted-foreground font-body mb-3">This calculator factors in:</p>
              <ul className="space-y-2 text-muted-foreground font-body">
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  Your body composition
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  Training frequency
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  Goals (fat loss, strength, recomposition)
                </li>
              </ul>
            </div>

            <p className="text-muted-foreground font-body flex items-center justify-center gap-2">
              Your exact macros will be sent straight to your email, along with guidance on how to use them properly.
            </p>
          </div>

          {emailSent ? (
            <div className="bg-card border border-primary/30 rounded-lg p-8 md:p-12 text-center animate-fade-in">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4">
                CHECK YOUR <span className="text-primary">INBOX!</span>
              </h2>
              <p className="text-muted-foreground font-body mb-6">
                We've sent your personalized macro targets to <strong className="text-foreground">{email}</strong>
              </p>
              <Button variant="outline" onClick={() => {
                setEmailSent(false);
                setEmail("");
                setName("");
              }}>
                Calculate Again
              </Button>
            </div>
          ) : (
            <div className="calculator-form bg-card border border-border rounded-lg p-6 md:p-8 space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label className="text-foreground font-display tracking-wider">Your Name</Label>
                <Input type="text" placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)} className="bg-background border-border" />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label className="text-foreground font-display tracking-wider">Email Address</Label>
                <Input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} className="bg-background border-border" />
                <p className="text-xs text-muted-foreground">
                  We'll send your results to this email.
                </p>
              </div>

              {/* Gender Selection */}
              <div className="space-y-2">
                <Label className="text-foreground font-display tracking-wider">Gender</Label>
                <Select value={gender} onValueChange={(value: Gender) => setGender(value)}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Age */}
              <div className="space-y-2">
                <Label className="text-foreground font-display tracking-wider">Age</Label>
                <Input type="number" placeholder="Enter your age" value={age} onChange={e => setAge(e.target.value)} className="bg-background border-border" />
              </div>

              {/* Goal Selection */}
              <div className="space-y-2">
                <Label className="text-foreground font-display tracking-wider">Goal</Label>
                <Select value={goal} onValueChange={(value: Goal) => setGoal(value)}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Select your goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fat-loss">Fat Loss</SelectItem>
                    <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                    <SelectItem value="maintain">Maintain</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Weight */}
              <div className="space-y-2">
                <Label className="text-foreground font-display tracking-wider">Body Weight</Label>
                <div className="flex gap-3">
                  <Input type="number" placeholder={`Weight in ${weightUnit}`} value={weight} onChange={e => setWeight(e.target.value)} className="bg-background border-border flex-1" />
                  <Select value={weightUnit} onValueChange={(value: WeightUnit) => setWeightUnit(value)}>
                    <SelectTrigger className="bg-background border-border w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">KG</SelectItem>
                      <SelectItem value="lbs">LBS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Height */}
              <div className="space-y-2">
                <Label className="text-foreground font-display tracking-wider">Height</Label>
                <div className="flex gap-3">
                  <Input type="number" placeholder={`Height in ${heightUnit}`} value={height} onChange={e => setHeight(e.target.value)} className="bg-background border-border flex-1" />
                  <Select value={heightUnit} onValueChange={(value: HeightUnit) => setHeightUnit(value)}>
                    <SelectTrigger className="bg-background border-border w-28">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cm">CM</SelectItem>
                      <SelectItem value="inches">Inches</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Activity Level */}
              <div className="space-y-2">
                <Label className="text-foreground font-display tracking-wider">Activity Level</Label>
                <Select value={activityLevel} onValueChange={(value: ActivityLevel) => setActivityLevel(value)}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (little to no exercise)</SelectItem>
                    <SelectItem value="somewhat-active">Somewhat Active (1-3 days/week)</SelectItem>
                    <SelectItem value="active">Active (3-5 days/week)</SelectItem>
                    <SelectItem value="very-active">Very Active (6-7 days/week)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Calculate Button */}
              <Button variant="hero" size="xl" className="w-full mt-4 gap-2" onClick={handleSubmit} disabled={!isFormValid || isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    Get My Results
                  </>
                )}
              </Button>

              <p className="text-center text-muted-foreground text-xs font-body">
                By submitting, you'll receive your personalized macro targets via email.
              </p>

              {/* Email Benefits Section */}
              <div className="mt-8 pt-8 border-t border-border">
                <h4 className="font-display text-lg text-foreground mb-4 text-center">
                  What You'll Get When You Join the List
                </h4>
                <p className="text-muted-foreground font-body text-sm mb-4">
                  When you enter your email, you'll receive:
                </p>
                <ul className="space-y-3 text-muted-foreground font-body text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    Your personalised macro targets
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    Training and nutrition insights you can apply immediately
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    Fat loss and strength strategies for busy schedules
                  </li>
                </ul>
                <p className="text-muted-foreground/70 font-body text-xs mt-4 text-center italic">
                  No spam. No nonsense. Just useful information.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Nutrition Content Section */}
        <div className="nutrition-content container mx-auto max-w-4xl mt-16">
          <MacroNutritionContent onScrollToCalculator={scrollToCalculator} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MacroCalculator;
