import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "",
    message: "",
  });

  const inquiryTypes = [
    { value: "1on1", label: "1-on-1 Personal Training" },
    { value: "2on1", label: "2-on-1 Personal Training" },
    { value: "online", label: "Online Personal Training" },
    { value: "general", label: "General Inquiry" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Message sent!",
        description: "We\'ve sent you a confirmation email. We\'ll be in touch soon.",
      });

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", inquiryType: "", message: "" });
      }, 3000);
    } catch (error: any) {
      console.error("Error sending contact form:", error);
      toast({
        title: "Error sending message",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="contact-header text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary font-body text-sm uppercase tracking-widest mb-6">
            Get In Touch
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-foreground mb-6">
            START YOUR <span className="text-primary">JOURNEY</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to transform your fitness? Fill out the form below and we\'ll get back to you within 24 hours.
          </p>
        </div>

        {/* Contact Form */}
        <div className="contact-form max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Email Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-body text-sm text-foreground uppercase tracking-wider">
                  Your Name
                </label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="bg-background border-border/50 focus:border-primary text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="space-y-2">
                <label className="font-body text-sm text-foreground uppercase tracking-wider">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="bg-background border-border/50 focus:border-primary text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Inquiry Type */}
            <div className="space-y-2">
              <label className="font-body text-sm text-foreground uppercase tracking-wider">
                I\'m Interested In
              </label>
              <Select
                value={formData.inquiryType}
                onValueChange={(value) =>
                  setFormData({ ...formData, inquiryType: value })
                }
                required
              >
                <SelectTrigger className="bg-background border-border/50 focus:border-primary text-foreground">
                  <SelectValue placeholder="Select an inquiry type" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border">
                  {inquiryTypes.map((type) => (
                    <SelectItem
                      key={type.value}
                      value={type.value}
                      className="text-foreground hover:bg-primary/10 focus:bg-primary/10"
                    >
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="font-body text-sm text-foreground uppercase tracking-wider">
                Your Message
              </label>
              <Textarea
                placeholder="Tell us about your fitness goals..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                rows={5}
                className="bg-background border-border/50 focus:border-primary text-foreground placeholder:text-muted-foreground resize-none"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full"
              disabled={isSubmitted || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Sending...
                </>
              ) : isSubmitted ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Message Sent!
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </form>

          {/* Additional Info */}
          <p className="text-center text-muted-foreground text-sm mt-8 font-body">
            We respect your privacy. Your information will never be shared.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
