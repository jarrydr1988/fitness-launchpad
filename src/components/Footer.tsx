import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 bg-card border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <span className="font-display text-2xl text-primary">Atlas Strength & Performance</span>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Copyright */}
            <p className="font-body text-sm text-muted-foreground text-center sm:text-left">
              © 2025 All rights reserved.
            </p>

            {/* Links & Social */}
            <div className="flex items-center gap-4">
              <a href="#" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy
              </a>
              <a href="#" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms
              </a>
              <a href="https://www.instagram.com/atlasstrength" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
