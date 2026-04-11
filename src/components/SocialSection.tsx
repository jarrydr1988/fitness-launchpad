import { Instagram, Youtube, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const SocialSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('leads')
      .insert([{ email: email }]);

    if (error) {
      toast({
        title: "Error",
        description: error.code === '23505' 
          ? "This email is already subscribed!" 
          : error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success!",
        description: "You've been added to the community. We'll be in touch!",
      });
      setEmail("");
    }
    setLoading(false);
  };
  const socialLinks = [{
    icon: Instagram,
    label: "Instagram",
    handle: "@jarrydroos_pt",
    url: "https://www.instagram.com/jarrydroos_pt?igsh=Y3pnY21mOGNhMjJp",
    followers: "45K"
  }, {
    icon: Youtube,
    label: "YouTube",
    handle: "Jarryd Roos PT",
    url: "#",
    followers: "120K"
  }];
  return <section id="contact" className="py-24 md:py-32 bg-gradient-to-b from-card to-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Social Media */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="font-body text-sm uppercase tracking-wider text-primary font-semibold">
                Connect With Me
              </span>
            </div>

            <h2 className="font-display text-5xl md:text-6xl text-foreground mb-6 uppercase">
              Follow The
              <br />
              <span className="text-gradient">Journey</span>
            </h2>

            <p className="font-body text-lg text-muted-foreground mb-12 max-w-lg">
              Join our fitness community for daily motivation, workout tips, and 
              behind-the-scenes content.
            </p>

            {/* Social Links Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {socialLinks.map(social => <a key={social.label} href={social.url} className="group flex items-center gap-4 p-5 rounded-xl bg-secondary/50 border border-border transition-all duration-300 hover:border-primary/50 hover:bg-secondary">
                  <div className="p-3 rounded-lg bg-background/50 group-hover:bg-primary/20 transition-colors">
                    <social.icon className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1">
                    <p className="font-display text-lg uppercase">{social.label}</p>
                    <p className="font-body text-sm text-muted-foreground">
                      {social.handle}
                    </p>
                  </div>
                  <div className="text-right">
                    
                  </div>
                </a>)}
            </div>
          </div>

          {/* Email Capture */}
          <div>
            <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30">
              <div className="p-4 rounded-xl bg-primary/20 w-fit mb-6">
                <Mail className="w-8 h-8 text-primary" />
              </div>

              <h3 className="font-display text-4xl md:text-5xl text-foreground mb-4 uppercase">
                Get Exclusive
                <br />
                <span className="text-gradient">Content</span>
              </h3>

              <p className="font-body text-lg text-muted-foreground mb-8">
                Join my email list for weekly workout tips, nutrition advice, and 
                exclusive content you won't find anywhere else.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" required className="w-full px-6 py-4 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body text-lg" />
                <Button variant="hero" size="xl" className="w-full" type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Join the Community"}
                  <ArrowRight className="ml-2" />
                </Button>
              </form>

              <p className="font-body text-sm text-muted-foreground mt-6 text-center">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default SocialSection;