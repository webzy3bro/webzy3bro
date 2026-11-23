import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { WHY_CHOOSE_ITEMS } from '../data/agencyData';

interface WhyChooseUsProps {
  onStartProject: () => void;
}

export function WhyChooseUs({ onStartProject }: WhyChooseUsProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = WHY_CHOOSE_ITEMS[activeIdx];

  return (
    <section className="relative py-24 lg:py-32 bg-[#08080D] border-t border-white/8">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-3xl space-y-4 mb-14">
          <p className="text-xs sm:text-sm font-medium tracking-[0.2em] text-[#C084FC] uppercase">
            WHY WEBZY3BRO
          </p>
          <h2 className="font-display text-[clamp(2rem,3.8vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-white">
            Your vision. Our expertise. One great result.
          </h2>
        </div>

        {/* Interactive Architectural Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Interactive List */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {WHY_CHOOSE_ITEMS.map((item, idx) => {
              const selected = idx === activeIdx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  onMouseEnter={() => setActiveIdx(idx)}
                  className={`p-5 rounded-xl border text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9333EA] ${
                    selected
                      ? 'bg-[#12121B] border-[#8B5CF6]/70 text-white'
                      : 'bg-[#0C0C12] border-white/8 text-zinc-300 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span
                      className={`font-mono text-xs tabular-nums ${
                        selected ? 'text-[#C084FC]' : 'text-zinc-500'
                      }`}
                    >
                      {item.index}
                    </span>
                    <ArrowUpRight
                      className={`w-4 h-4 transition-transform duration-200 ${
                        selected ? 'text-[#C084FC] translate-x-0.5 -translate-y-0.5' : 'text-zinc-600'
                      }`}
                    />
                  </div>
                  <p className="font-display text-base sm:text-lg font-semibold leading-snug">
                    {item.title}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Interactive Focus Panel */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl border border-white/12 bg-[#0D0D15] p-7 sm:p-9 space-y-6"
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#C084FC]">{current.focusArea}</span>
                  <span className="text-zinc-500 tabular-nums">{current.index} / 08</span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {current.headline}
                </h3>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  {current.detail}
                </p>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                  <span className="text-xs text-zinc-400">Built around your goals</span>
                  <button
                    type="button"
                    onClick={onStartProject}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-sm font-semibold whitespace-nowrap shrink-0 transition-colors"
                  >
                    <span>Start a Project</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
