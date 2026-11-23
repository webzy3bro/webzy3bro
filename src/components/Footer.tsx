import { ArrowUp, Instagram, Linkedin, Github } from 'lucide-react';
import { LOGO_PATH, SERVICES } from '../data/agencyData';

interface FooterProps {
  onSelectServiceForContact: (serviceOption: string) => void;
}

export function Footer({ onSelectServiceForContact }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050507] border-t border-white/10 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Statement + Back to Top */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-12 border-b border-white/10">
          <p className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight max-w-xl">
            Building the digital future, one idea at a time.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 hover:border-[#8B5CF6] text-xs font-medium text-zinc-200 hover:text-white self-start sm:self-auto transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4 text-[#C084FC]" />
          </button>
        </div>

        {/* Directory Grid */}
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-3">
              <img
                src={LOGO_PATH}
                alt="WEBZY3BRO official logo"
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full object-contain bg-black shrink-0"
              />
              <span className="font-display text-xl font-bold text-white tracking-tight">
                WEBZY<span className="text-[#A855F7]">3</span>BRO
              </span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              Creative digital development agency building custom websites, mobile apps, UI/UX design systems, and e-commerce platforms.
            </p>
            <a
              href="mailto:hello@webzy3bro.com"
              className="inline-block text-sm font-medium text-white hover:text-[#C084FC] transition-colors"
            >
              hello@webzy3bro.com
            </a>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs font-mono text-zinc-500">Navigation</p>
            <ul className="space-y-2.5 text-sm text-zinc-300">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-mono text-zinc-500">Services</p>
            <ul className="space-y-2.5 text-sm text-zinc-300">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <button
                    type="button"
                    onClick={() => onSelectServiceForContact(service.contactServiceOption)}
                    className="hover:text-[#C084FC] text-left transition-colors"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs font-mono text-zinc-500">Connect</p>
            <ul className="space-y-2.5 text-sm text-zinc-300">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Instagram className="w-4 h-4 text-[#C084FC]" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-[#C084FC]" />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4 text-[#C084FC]" />
                  <span>GitHub</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} WEBZY3BRO. All rights reserved.</p>
          <p>Turning ideas into digital experiences.</p>
        </div>
      </div>
    </footer>
  );
}
