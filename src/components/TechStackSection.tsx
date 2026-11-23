import { useState } from 'react';
import { motion } from 'motion/react';
import { TECHNOLOGIES, TechItem } from '../data/agencyData';

const TECH_FILTERS = ['All', 'Frontend', 'Mobile', 'Backend & Data'] as const;

function TechGlyph({ name }: { name: string }) {
  switch (name) {
    case 'HTML':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M4 3h16l-1.5 15L12 21l-6.5-3L4 3z" />
          <path d="M8 8h8l-.5 4H9l.3 3 2.7 1 2.7-1 .3-2" />
        </svg>
      );
    case 'CSS':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M4 3h16l-1.5 15L12 21l-6.5-3L4 3z" />
          <path d="M8 8h8l-4 4h3.5l-.5 4L12 17l-3-1" />
        </svg>
      );
    case 'JavaScript':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.75">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M10 10v6a2 2 0 0 1-2 2H7" />
          <path d="M17 11.5c0-1-.8-1.5-1.8-1.5s-1.7.6-1.7 1.4c0 2 3.5 1.3 3.5 3.6 0 1-.8 1.8-2 1.8-1.1 0-1.9-.5-2.2-1.2" />
        </svg>
      );
    case 'React':
    case 'React Native':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="2" fill="currentColor" />
          <ellipse cx="12" cy="12" rx="9" ry="3.8" />
          <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(120 12 12)" />
        </svg>
      );
    case 'Next.js':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.75">
          <circle cx="12" cy="12" r="9" />
          <path d="M9 15V9l7 8.5" />
          <path d="M15 9v4" />
        </svg>
      );
    case 'Expo':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M4 18L11 6c.4-.7 1.6-.7 2 0l7 12" strokeLinecap="round" />
          <path d="M7.5 14h9" strokeLinecap="round" />
        </svg>
      );
    case 'Tailwind CSS':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M6 10c1.2-2.4 3-3.5 5.2-3.5 3 0 3.5 2.3 5 2.7 1.2.3 2.2-.2 3.2-1.4-1.2 2.4-3 3.5-5.2 3.5-3 0-3.5-2.3-5-2.7-1.2-.3-2.2.2-3.2 1.4z" />
          <path d="M4 16c1.2-2.4 3-3.5 5.2-3.5 3 0 3.5 2.3 5 2.7 1.2.3 2.2-.2 3.2-1.4-1.2 2.4-3 3.5-5.2 3.5-3 0-3.5-2.3-5-2.7-1.2-.3-2.2.2-3.2 1.4z" />
        </svg>
      );
    case 'Node.js':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M12 2.5l8 4.6v9.8l-8 4.6-8-4.6V7.1l8-4.6z" />
          <path d="M9.5 14.5V9.5l5 5V9.5" />
        </svg>
      );
    case 'MySQL':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.75">
          <ellipse cx="12" cy="6.5" rx="7" ry="3" />
          <path d="M5 6.5v11c0 1.66 3.13 3 7 3s7-1.34 7-3v-11" />
          <path d="M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M6 17L8 5l4.5 5.5L16 7l2 10-6 3.5L6 17z" />
        </svg>
      );
  }
}

export function TechStackSection() {
  const [filter, setFilter] = useState<(typeof TECH_FILTERS)[number]>('All');

  const visibleTech: TechItem[] =
    filter === 'All' ? TECHNOLOGIES : TECHNOLOGIES.filter((t) => t.category === filter);

  return (
    <section className="relative py-24 lg:py-32 bg-[#08080D] border-t border-white/8">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-4">
            <p className="text-xs sm:text-sm font-medium tracking-[0.2em] text-[#C084FC] uppercase">
              TECHNOLOGIES
            </p>
            <h2 className="font-display text-[clamp(2rem,3.8vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-white">
              Built with the right tools.
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter technologies"
            className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-[#111119] border border-white/10 self-start"
          >
            {TECH_FILTERS.map((tab) => {
              const active = filter === tab;
              return (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => setFilter(tab)}
                  className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors ${
                    active ? 'bg-[#8B5CF6] text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Technology Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {visibleTech.map((tech, idx) => (
            <motion.div
              key={tech.name}
              layout
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: idx * 0.03 }}
              whileHover={{ y: -4 }}
              className="group rounded-xl border border-white/10 bg-[#0D0D14] hover:border-[#8B5CF6]/60 p-5 sm:p-6 flex flex-col justify-between gap-5 transition-colors duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-300 group-hover:text-[#C084FC] group-hover:border-[#8B5CF6]/40 transition-colors">
                  <TechGlyph name={tech.name} />
                </div>
                <span className="text-[11px] font-mono text-zinc-500">{tech.category}</span>
              </div>

              <div className="space-y-1">
                <h3 className="font-display text-lg font-bold text-white">{tech.name}</h3>
                <p className="text-xs sm:text-sm text-zinc-400">{tech.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
