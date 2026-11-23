import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { FAQS } from '../data/agencyData';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative py-24 lg:py-32 bg-[#050507] border-t border-white/8"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5 space-y-4">
            <p className="text-xs sm:text-sm font-medium tracking-[0.2em] text-[#C084FC] uppercase">
              FAQ
            </p>
            <h2 className="font-display text-[clamp(2rem,3.8vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-white">
              Everything you need to know.
            </h2>
            <p className="text-base text-zinc-400 leading-relaxed max-w-md pt-1">
              Clear answers about our services, timelines, pricing approach, and how we kick off new builds.
            </p>
          </div>

          <div className="lg:col-span-7 divide-y divide-white/10 border-y border-white/10">
            {FAQS.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={item.question}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full py-6 text-left flex items-center justify-between gap-6 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9333EA]"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-xs text-zinc-500 tabular-nums">
                        0{idx + 1}
                      </span>
                      <span
                        className={`font-display text-lg sm:text-xl font-semibold transition-colors ${
                          isOpen ? 'text-white' : 'text-zinc-200 group-hover:text-white'
                        }`}
                      >
                        {item.question}
                      </span>
                    </div>

                    <span
                      className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? 'bg-[#8B5CF6] border-[#8B5CF6] text-white'
                          : 'border-white/15 text-zinc-400 group-hover:border-white/30 group-hover:text-white'
                      }`}
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 pl-8 pr-12 text-sm sm:text-base text-zinc-300 leading-relaxed">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
