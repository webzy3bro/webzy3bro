import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { LOGO_PATH } from '../data/agencyData';
import { MagneticButton } from './MagneticButton';

const NAV_LINKS = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

interface NavbarProps {
  onStartProject: () => void;
}

export function Navbar({ onStartProject }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 28);

      const offsets = NAV_LINKS.map((item) => {
        const el = document.getElementById(item.id);
        if (!el) return { id: item.id, top: Infinity };
        return { id: item.id, top: Math.abs(el.getBoundingClientRect().top - 120) };
      });
      offsets.sort((a, b) => a.top - b.top);
      if (offsets[0]) {
        setActiveSection(offsets[0].id);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setMobileOpen(false);
    setActiveSection(id);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#08090D]/90 backdrop-blur-xl border-b border-white/10 py-3'
            : 'bg-transparent border-b border-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Lockup (untouched official logo + single-line wordmark) */}
          <a
            href="#home"
            onClick={() => handleLinkClick('home')}
            className="inline-flex items-center gap-3 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9333EA] rounded-md"
          >
            <img
              src={LOGO_PATH}
              alt="WEBZY3BRO official logo"
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-contain bg-black shrink-0"
            />
            <span className="font-display text-lg font-bold tracking-tight text-white">
              WEBZY<span className="text-[#A855F7]">3</span>BRO
            </span>
          </a>

          {/* Zone 2: Concise single-line navigation links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9333EA] rounded-sm ${
                    isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 right-0 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#C084FC] transition-transform duration-200 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <MagneticButton
              onClick={() => {
                setMobileOpen(false);
                onStartProject();
              }}
              className="hidden md:inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-white bg-[#8B5CF6] hover:bg-[#7C3AED] rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C084FC]"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="w-4 h-4" />
            </MagneticButton>

            <button
              type="button"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9333EA]"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-[#050507]/95 backdrop-blur-2xl pt-24 px-6 pb-8 flex flex-col justify-between">
          <nav aria-label="Mobile navigation" className="flex flex-col divide-y divide-white/10">
            {NAV_LINKS.map((link, idx) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => handleLinkClick(link.id)}
                className="py-5 flex items-center justify-between text-2xl font-display font-semibold text-white hover:text-[#C084FC] transition-colors min-h-[52px]"
              >
                <span>{link.label}</span>
                <span className="font-mono text-xs text-zinc-500">0{idx + 1}</span>
              </a>
            ))}
          </nav>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
            <p className="text-sm text-zinc-400">Turning ideas into digital experiences.</p>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onStartProject();
              }}
              className="w-full py-3.5 px-6 rounded-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold text-base flex items-center justify-center gap-2 transition-colors min-h-[48px]"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
