import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowRight, ArrowDown, Globe, Smartphone, Layers, MousePointer2 } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

interface HeroProps {
  onStartProject: () => void;
}

type PreviewMode = 'web' | 'mobile' | 'system';

export function Hero({ onStartProject }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [previewMode, setPreviewMode] = useState<PreviewMode>('web');

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from('.hero-stagger', {
        y: 28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'transform',
      });

      gsap.from('.hero-stage', {
        y: 36,
        opacity: 0,
        duration: 1,
        delay: 0.25,
        ease: 'power3.out',
        clearProps: 'transform',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setParallax({ x: nx * 18, y: ny * 14 });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen pt-28 pb-16 lg:pt-32 lg:pb-24 flex flex-col justify-between overflow-hidden bg-[#050507]"
    >
      {/* Subtle Brand Violet Ambient Lighting & Architectural Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute -top-32 right-[5%] w-[520px] h-[520px] rounded-full opacity-25 blur-[130px]"
          style={{
            background: 'radial-gradient(circle, #9333EA 0%, #6D28D9 45%, transparent 75%)',
            transform: `translate3d(${parallax.x * -0.6}px, ${parallax.y * -0.6}px, 0)`,
            transition: 'transform 200ms ease-out',
          }}
        />
        <div
          className="absolute bottom-0 left-[-10%] w-[420px] h-[420px] rounded-full opacity-15 blur-[140px]"
          style={{
            background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />
      </div>

      {/* Main Split Grid */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-8 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Brand Typography & Primary Actions */}
          <div className="lg:col-span-6 space-y-7">
            <div className="hero-stagger inline-flex items-center gap-3 border border-white/10 bg-white/[0.025] px-3 py-2 text-[11px] font-mono uppercase tracking-[0.16em] text-zinc-300">
              <span className="h-1.5 w-1.5 rounded-full bg-[#B7A3FF]" />
              Independent digital studio
            </div>

            <h1 className="hero-stagger font-display text-[clamp(3rem,6.2vw,6.25rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-white">
              Digital experiences,
              <br />
              <span className="text-[#B7A3FF]">built with intent.</span>
            </h1>

            <p className="hero-stagger text-base sm:text-lg text-zinc-300 leading-relaxed max-w-xl">
              We design and develop beautiful websites, powerful mobile apps, and digital products that help businesses grow and stand out.
            </p>

            <div className="hero-stagger flex flex-wrap items-center gap-4 pt-2">
              <MagneticButton
                onClick={onStartProject}
                className="px-7 py-3.5 rounded-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold text-sm sm:text-base gap-2 shadow-[0_0_32px_rgba(139,92,246,0.32)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C084FC]"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>

              <MagneticButton
                href="#projects"
                className="px-7 py-3.5 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/30 text-white font-medium text-sm sm:text-base transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9333EA]"
              >
                <span>Explore Our Work</span>
              </MagneticButton>
            </div>

            <div className="hero-stagger pt-4 border-t border-white/10 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-zinc-400">
              <span>Website Development</span>
              <span aria-hidden="true" className="text-[#A855F7]">·</span>
              <span>iOS &amp; Android Apps</span>
              <span aria-hidden="true" className="text-[#A855F7]">·</span>
              <span>UI/UX Systems</span>
              <span aria-hidden="true" className="text-[#A855F7]">·</span>
              <span>E-Commerce</span>
            </div>
          </div>

          {/* Right Column: Interactive Multi-Device Studio Composition */}
          <div className="lg:col-span-6 hero-stage">
            <div className="relative mx-auto max-w-xl lg:max-w-none">
              {/* Interactive Preview Mode Controls */}
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="text-xs font-mono text-zinc-400">
                  Interactive Craft Preview
                </span>
                <div
                  role="tablist"
                  aria-label="Preview craft mode"
                  className="inline-flex items-center gap-1 p-1 rounded-lg bg-[#111118] border border-white/10"
                >
                  {(
                    [
                      { id: 'web', label: 'Web', icon: Globe },
                      { id: 'mobile', label: 'Mobile', icon: Smartphone },
                      { id: 'system', label: 'UI System', icon: Layers },
                    ] as const
                  ).map((tab) => {
                    const Icon = tab.icon;
                    const active = previewMode === tab.id;
                    return (
                      <button
                        key={tab.id}
                        role="tab"
                        aria-selected={active}
                        type="button"
                        onClick={() => setPreviewMode(tab.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                          active
                            ? 'bg-[#8B5CF6] text-white'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Layered Browser + Mobile + Geometric Stage */}
              <div className="relative pt-2 pb-8 sm:pb-12">
                {/* Geometric orbital ring echoing the WEBZY3BRO emblem */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-6 -right-6 w-48 h-48 rounded-full border border-[#9333EA]/25"
                  style={{
                    transform: `translate3d(${parallax.x * 0.4}px, ${parallax.y * 0.4}px, 0)`,
                  }}
                />

                {/* Primary Floating Browser Mockup */}
                <div
                  className="relative rounded-2xl border border-white/12 bg-[#0D0D14] shadow-[0_30px_80px_rgba(0,0,0,0.75)] overflow-hidden"
                  style={{
                    transform: `translate3d(${parallax.x * 0.35}px, ${parallax.y * 0.35}px, 0)`,
                    transition: 'transform 180ms ease-out',
                  }}
                >
                  {/* Browser Top Chrome */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#12121B]">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                      <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" />
                    </div>
                    <div className="px-3 py-1 rounded-md bg-[#09090D] border border-white/8 text-[11px] font-mono text-zinc-400 truncate max-w-[190px] sm:max-w-xs">
                      {previewMode === 'web' && 'webzy3bro.studio / web-platform'}
                      {previewMode === 'mobile' && 'webzy3bro.studio / ios-android'}
                      {previewMode === 'system' && 'webzy3bro.studio / design-tokens'}
                    </div>
                    <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline">1440px</span>
                  </div>

                  {/* Interactive Viewport Content */}
                  <div className="p-5 sm:p-7 space-y-5 min-h-[290px] sm:min-h-[320px] flex flex-col justify-between">
                    {previewMode === 'web' && (
                      <>
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-2">
                            <p className="text-xs font-mono text-[#C084FC]">
                              01. Custom Web Architecture
                            </p>
                            <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-tight">
                              Responsive Flagship Storefronts &amp; Web Platforms
                            </h3>
                          </div>
                          <MousePointer2 className="w-5 h-5 text-white shrink-0 mt-1" />
                        </div>

                        <div className="grid grid-cols-12 gap-3">
                          <div className="col-span-7 rounded-xl bg-[#161622] border border-white/8 p-4 space-y-3">
                            <div className="h-2.5 w-20 rounded bg-[#8B5CF6]/70" />
                            <div className="space-y-1.5">
                              <div className="h-2 w-full rounded bg-white/15" />
                              <div className="h-2 w-4/5 rounded bg-white/10" />
                            </div>
                            <div className="pt-2 flex items-center gap-2">
                              <div className="h-7 w-24 rounded-full bg-[#8B5CF6]" />
                              <div className="h-7 w-16 rounded-full border border-white/15" />
                            </div>
                          </div>
                          <div className="col-span-5 rounded-xl bg-gradient-to-br from-[#2E1065]/60 to-[#14141E] border border-[#8B5CF6]/25 p-4 flex flex-col justify-between">
                            <span className="text-[11px] font-mono text-zinc-300">Layout Grid</span>
                            <div className="grid grid-cols-3 gap-1.5 my-2">
                              <div className="h-10 rounded bg-white/10" />
                              <div className="h-10 rounded bg-[#8B5CF6]/35" />
                              <div className="h-10 rounded bg-white/10" />
                            </div>
                            <span className="text-[11px] text-zinc-400">12-Col Fluid</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-white/8 text-xs text-zinc-400">
                          <span>React · Next.js · Tailwind CSS</span>
                          <span className="font-mono text-zinc-300 tabular-nums">60 fps</span>
                        </div>
                      </>
                    )}

                    {previewMode === 'mobile' && (
                      <>
                        <div className="space-y-2">
                          <p className="text-xs font-mono text-[#C084FC]">
                            02. Cross-Platform Mobile Engineering
                          </p>
                          <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-tight">
                            Native-Feel iOS &amp; Android Experiences
                          </h3>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                          <div className="rounded-xl bg-[#161622] border border-white/8 p-3.5 space-y-2">
                            <span className="text-[11px] font-mono text-zinc-400">Gesture Nav</span>
                            <p className="text-sm font-semibold text-white">Fluid Stack</p>
                            <div className="h-1.5 w-full rounded bg-[#8B5CF6]/60" />
                          </div>
                          <div className="rounded-xl bg-[#161622] border border-white/8 p-3.5 space-y-2">
                            <span className="text-[11px] font-mono text-zinc-400">Data Sync</span>
                            <p className="text-sm font-semibold text-white">REST &amp; Live</p>
                            <div className="h-1.5 w-3/4 rounded bg-white/25" />
                          </div>
                          <div className="rounded-xl bg-[#161622] border border-white/8 p-3.5 space-y-2">
                            <span className="text-[11px] font-mono text-zinc-400">Release</span>
                            <p className="text-sm font-semibold text-white">App Stores</p>
                            <div className="h-1.5 w-4/5 rounded bg-[#C084FC]/60" />
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-white/8 text-xs text-zinc-400">
                          <span>React Native · Expo · Firebase</span>
                          <span className="font-mono text-zinc-300">iOS + Android</span>
                        </div>
                      </>
                    )}

                    {previewMode === 'system' && (
                      <>
                        <div className="space-y-2">
                          <p className="text-xs font-mono text-[#C084FC]">
                            03. Modular UI/UX Design Systems
                          </p>
                          <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-tight">
                            Consistent Tokens, Wireframes &amp; Prototypes
                          </h3>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="rounded-xl bg-[#161622] border border-white/8 p-4 space-y-2.5">
                            <span className="text-[11px] font-mono text-zinc-400">Palette Tokens</span>
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-md bg-[#050507] border border-white/20" />
                              <span className="w-6 h-6 rounded-md bg-[#161622] border border-white/20" />
                              <span className="w-6 h-6 rounded-md bg-[#8B5CF6]" />
                              <span className="w-6 h-6 rounded-md bg-[#C084FC]" />
                              <span className="w-6 h-6 rounded-md bg-white" />
                            </div>
                          </div>
                          <div className="rounded-xl bg-[#161622] border border-white/8 p-4 space-y-1.5">
                            <span className="text-[11px] font-mono text-zinc-400">Type Scale</span>
                            <p className="font-display text-lg font-bold text-white leading-none">
                              Aa Bb Cc
                            </p>
                            <p className="text-xs text-zinc-400">Bricolage + Plus Jakarta</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-white/8 text-xs text-zinc-400">
                          <span>Wireframes · User Flows · Figma</span>
                          <span className="font-mono text-zinc-300">WCAG AA</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Overlapping Floating Mobile Screen Mockup */}
                <div
                  className="hidden sm:block absolute -bottom-2 -right-3 lg:-right-6 w-48 rounded-[24px] border border-white/15 bg-[#09090E] p-3 shadow-[0_24px_60px_rgba(0,0,0,0.85)]"
                  style={{
                    transform: `translate3d(${parallax.x * -0.55}px, ${parallax.y * -0.55}px, 0)`,
                    transition: 'transform 180ms ease-out',
                  }}
                >
                  <div className="mx-auto mb-2.5 h-1 w-10 rounded-full bg-white/20" />
                  <div className="rounded-xl bg-[#14141D] border border-white/8 p-3 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#C084FC]">MOBILE UI</span>
                      <span className="text-[10px] font-mono text-zinc-500">9:41</span>
                    </div>
                    <div className="h-14 rounded-lg bg-gradient-to-br from-[#7C3AED]/50 to-[#1A1A26] border border-[#8B5CF6]/30 p-2 flex flex-col justify-end">
                      <span className="text-[11px] font-semibold text-white">App Ready</span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-2 w-full rounded bg-white/15" />
                      <div className="h-2 w-2/3 rounded bg-white/10" />
                    </div>
                    <div className="h-6 rounded-full bg-[#8B5CF6] flex items-center justify-center text-[10px] font-semibold text-white">
                      Launch Flow
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Statement & Scroll Indicator */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-8 pt-10 flex items-center justify-between border-t border-white/10">
        <p className="text-xs sm:text-sm text-zinc-400">
          Turning ideas into digital experiences.
        </p>
        <a
          href="#intro"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-300 hover:text-white transition-colors"
        >
          <span>Scroll to explore</span>
          <ArrowDown className="w-4 h-4 text-[#A855F7]" />
        </a>
      </div>
    </section>
  );
}
