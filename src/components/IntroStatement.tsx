import { motion } from 'motion/react';

const MARQUEE_WORDS = ['DESIGN', 'DEVELOP', 'CREATE', 'LAUNCH', 'GROW'];

export function IntroStatement() {
  return (
    <section
      id="intro"
      className="relative py-20 lg:py-28 bg-[#08080D] border-t border-white/8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <h2 className="font-display text-[clamp(2rem,4vw,3.4rem)] font-bold leading-[1.06] tracking-tight text-white">
              GOOD IDEAS DESERVE
              <span className="text-[#B7A3FF]"> GREAT EXECUTION.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
              We bring design and technology together to create digital experiences that look exceptional, work seamlessly, and help brands move forward.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Horizontal Editorial Marquee */}
      <div className="mt-16 border-y border-white/10 py-6 bg-[#050507]/70">
        <div className="animate-marquee">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center shrink-0">
              {MARQUEE_WORDS.map((word) => (
                <div key={`${dup}-${word}`} className="flex items-center">
                  <span className="px-6 sm:px-10 font-display text-2xl sm:text-4xl font-bold tracking-tight text-white/90 hover:text-[#C084FC] transition-colors">
                    {word}
                  </span>
                  <span aria-hidden="true" className="text-[#9333EA] text-xl font-light">
                    —
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
