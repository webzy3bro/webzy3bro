import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROCESS_STEPS } from '../data/agencyData';

gsap.registerPlugin(ScrollTrigger);

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      if (progressRef.current) {
        gsap.fromTo(
          progressRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              end: 'bottom 75%',
              scrub: 0.6,
            },
          }
        );
      }

      gsap.from('.process-step-card', {
        y: 26,
        opacity: 0,
        duration: 0.65,
        stagger: 0.12,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#050507] border-t border-white/8"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Sticky Header Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-4">
            <p className="text-xs sm:text-sm font-medium tracking-[0.2em] text-[#C084FC] uppercase">
              OUR PROCESS
            </p>
            <h2 className="font-display text-[clamp(2rem,3.8vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-white">
              From concept to creation.
            </h2>
            <p className="text-base text-zinc-400 leading-relaxed max-w-md pt-2">
              A focused five-stage workflow engineered to keep communication clear, design purposeful, and launches predictable.
            </p>
          </div>

          {/* Animated Vertical Timeline Column */}
          <div className="lg:col-span-7 relative pl-8 sm:pl-12">
            {/* Background Connecting Track */}
            <div
              aria-hidden="true"
              className="absolute left-2.5 sm:left-4 top-3 bottom-3 w-[2px] bg-white/10"
            />
            {/* Animated GSAP Scroll Progress Fill */}
            <div
              ref={progressRef}
              aria-hidden="true"
              className="absolute left-2.5 sm:left-4 top-3 bottom-3 w-[2px] bg-gradient-to-b from-[#8B5CF6] via-[#A855F7] to-[#C084FC] origin-top"
            />

            <div className="space-y-8">
              {PROCESS_STEPS.map((item) => (
                <div
                  key={item.step}
                  className="process-step-card relative rounded-2xl border border-white/10 bg-[#0C0C13] p-6 sm:p-8 hover:border-[#8B5CF6]/50 transition-colors duration-200"
                >
                  {/* Step Marker Node */}
                  <span
                    aria-hidden="true"
                    className="absolute -left-[29px] sm:-left-[39px] top-8 w-4 h-4 rounded-full bg-[#050507] border-2 border-[#A855F7]"
                  />

                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-5">
                    <span className="font-mono text-sm font-medium text-[#C084FC] tabular-nums shrink-0">
                      {item.step} —
                    </span>
                    <div className="space-y-2">
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
