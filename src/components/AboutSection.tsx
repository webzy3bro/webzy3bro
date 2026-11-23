import { motion } from 'motion/react';
import { CORE_VALUES, STUDIO_PHOTO_PATH } from '../data/agencyData';

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-24 lg:py-32 bg-[#050507] border-t border-white/8"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-stretch">
          {/* Left Editorial Column */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5"
            >
              <p className="text-xs sm:text-sm font-medium tracking-[0.2em] text-[#C084FC] uppercase">
                ABOUT WEBZY3BRO
              </p>

              <h2 className="font-display text-[clamp(2rem,3.8vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-white">
                We turn your vision into something real.
              </h2>

              <div className="space-y-4 text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl pt-2">
                <p>
                  WEBZY3BRO is a creative digital development agency passionate about building modern websites, mobile applications, and digital products.
                </p>
                <p>
                  We combine creative design, technical expertise, and thoughtful development to help businesses establish a strong digital presence and bring their ideas to life.
                </p>
                <p className="text-zinc-400">
                  We don&apos;t believe in one-size-fits-all solutions. Every project is designed around its purpose, audience, and goals.
                </p>
              </div>
            </motion.div>

            {/* Four Core Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 pt-8 border-t border-white/10">
              {CORE_VALUES.map((val, idx) => (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: idx * 0.06 }}
                  className="space-y-1.5"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-[#C084FC] tabular-nums">
                      {val.index}
                    </span>
                    <h3 className="font-display text-xl font-bold text-white">
                      {val.title}
                    </h3>
                  </div>
                  <p className="text-sm text-zinc-400 pl-7">{val.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Studio Visual Column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative h-full min-h-[380px] rounded-2xl overflow-hidden border border-white/12 bg-[#0D0D14]">
              <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-sm text-zinc-500">
                WEBZY3BRO Creative Studio Craft
              </div>
              <img
                src={STUDIO_PHOTO_PATH}
                alt="WEBZY3BRO creative digital design studio workspace"
                referrerPolicy="no-referrer"
                className="relative z-10 w-full h-full lg:h-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-[#050507]/85 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 z-30 flex items-center justify-between text-xs text-zinc-300">
                <span className="font-medium text-white">WEBZY3BRO Studio</span>
                <span className="font-mono text-zinc-400">Design &amp; Engineering</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
