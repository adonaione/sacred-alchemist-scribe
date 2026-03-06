import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-display text-xl tracking-[0.15em] mb-4">SACRED CREATIONS</h3>
            <p className="font-body text-sm text-primary-foreground/60 leading-relaxed max-w-xs">
              Handcrafted botanical elixirs birthed in prayer, charged with intention, and sealed with integrity.
            </p>
          </div>
          <div>
            <h4 className="font-body text-xs tracking-[0.2em] uppercase mb-4 text-primary-foreground/40">Navigate</h4>
            <div className="space-y-3">
              {[
                { to: "/", label: "Home" },
                { to: "/shop", label: "Shop" },
                { to: "/about", label: "Our Story" },
                { to: "/philosophy", label: "Philosophy" },
              ].map((link) => (
                <Link key={link.to} to={link.to} className="block font-body text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-body text-xs tracking-[0.2em] uppercase mb-4 text-primary-foreground/40">Sacred Creations LLC</h4>
            <p className="font-body text-sm text-primary-foreground/60 leading-relaxed">
              Every vessel is handcrafted with reverence.<br />
              Anointed with purpose. Sealed with prayer.
            </p>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-primary-foreground/10 text-center">
          <p className="font-body text-xs text-primary-foreground/30 tracking-wider">
            © {new Date().getFullYear()} Sacred Creations LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
