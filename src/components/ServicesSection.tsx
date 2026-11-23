import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowUpRight,
  Globe,
  Smartphone,
  PenTool,
  ShoppingBag,
  Sparkles,
  Code2,
  Check,
} from 'lucide-react';
import { SERVICES, ServiceItem } from '../data/agencyData';

interface ServicesSectionProps {
  onSelectServiceForContact: (serviceOption: string) => void;
}

function ServiceVisualBlueprint({ service }: { service: ServiceItem }) {
  switch (service.id) {
    case 'website-development':
      return (
        <div className="rounded-xl border border-white/10 bg-[#09090E] p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/8 pb-3">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#C084FC]" />
              <span className="text-xs font-mono text-zinc-300">Responsive Grid · 1440px → 375px</span>
            </div>
            <span className="text-xs font-mono text-zinc-500">SEO Ready</span>
          </div>
          <div className="grid grid-cols-12 gap-2.5">
            <div className="col-span-8 rounded-lg bg-[#14141E] border border-white/8 p-3 space-y-2">
              <div className="h-2 w-1/3 rounded bg-[#8B5CF6]" />
              <div className="h-2.5 w-5/6 rounded bg-white/20" />
              <div className="h-2 w-2/3 rounded bg-white/10" />
              <div className="pt-2 grid grid-cols-3 gap-2">
                <div className="h-8 rounded bg-white/5 border border-white/8" />
                <div className="h-8 rounded bg-[#8B5CF6]/20 border border-[#8B5CF6]/30" />
                <div className="h-8 rounded bg-white/5 border border-white/8" />
              </div>
            </div>
            <div className="col-span-4 rounded-lg bg-[#14141E] border border-white/8 p-3 flex flex-col justify-between">
              <span className="text-[10px] font-mono text-zinc-400">Mobile</span>
              <div className="space-y-1.5 my-2">
                <div className="h-2 w-full rounded bg-[#8B5CF6]/60" />
                <div className="h-8 w-full rounded bg-white/10" />
              </div>
              <span className="text-[10px] font-mono text-zinc-500">Touch OK</span>
            </div>
          </div>
        </div>
      );
    case 'mobile-app-development':
      return (
        <div className="rounded-xl border border-white/10 bg-[#09090E] p-5">
          <div className="flex items-center justify-between border-b border-white/8 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-[#C084FC]" />
              <span className="text-xs font-mono text-zinc-300">iOS &amp; Android Native Flow</span>
            </div>
            <span className="text-xs font-mono text-zinc-500">60fps</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/12 bg-[#13131C] p-3.5 space-y-2.5">
              <div className="mx-auto h-1 w-8 rounded-full bg-white/20" />
              <div className="h-12 rounded-lg bg-gradient-to-r from-[#7C3AED]/45 to-[#9333EA]/20 border border-[#8B5CF6]/30 p-2 flex items-end">
                <span className="text-[11px] font-medium text-white">Home Feed</span>
              </div>
              <div className="space-y-1.5">
                <div className="h-2 w-full rounded bg-white/15" />
                <div className="h-2 w-4/5 rounded bg-white/10" />
              </div>
            </div>
            <div className="rounded-2xl border border-white/12 bg-[#13131C] p-3.5 space-y-2.5 translate-y-2">
              <div className="mx-auto h-1 w-8 rounded-full bg-white/20" />
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                <span>API Sync</span>
                <span className="text-[#C084FC]">Connected</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <div className="h-10 rounded bg-white/8" />
                <div className="h-10 rounded bg-[#8B5CF6]/30" />
              </div>
              <div className="h-5 rounded-full bg-[#8B5CF6] text-[10px] font-semibold text-white flex items-center justify-center">
                Continue
              </div>
            </div>
          </div>
        </div>
      );
    case 'ui-ux-design':
      return (
        <div className="rounded-xl border border-white/10 bg-[#09090E] p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/8 pb-3">
            <div className="flex items-center gap-2">
              <PenTool className="w-4 h-4 text-[#C084FC]" />
              <span className="text-xs font-mono text-zinc-300">Design System &amp; Wireframe Spec</span>
            </div>
            <span className="text-xs font-mono text-zinc-500">Tokens</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-[#14141E] border border-white/8 p-3 space-y-2">
              <span className="text-[10px] font-mono text-zinc-400">01 Wireframe</span>
              <div className="h-10 rounded border border-dashed border-white/25 flex items-center justify-center text-[10px] text-zinc-500">
                Low-Fi
              </div>
            </div>
            <div className="rounded-lg bg-[#14141E] border border-white/8 p-3 space-y-2">
              <span className="text-[10px] font-mono text-zinc-400">02 Flow</span>
              <div className="flex items-center gap-1 pt-2">
                <div className="h-4 w-4 rounded bg-[#8B5CF6]/60" />
                <div className="h-[1px] flex-1 bg-white/30" />
                <div className="h-4 w-4 rounded bg-[#C084FC]" />
              </div>
            </div>
            <div className="rounded-lg bg-[#14141E] border border-[#8B5CF6]/35 p-3 space-y-2">
              <span className="text-[10px] font-mono text-[#C084FC]">03 System</span>
              <div className="flex gap-1.5 pt-1">
                <span className="w-4 h-4 rounded bg-white" />
                <span className="w-4 h-4 rounded bg-[#8B5CF6]" />
                <span className="w-4 h-4 rounded bg-zinc-700" />
              </div>
            </div>
          </div>
        </div>
      );
    case 'ecommerce-development':
      return (
        <div className="rounded-xl border border-white/10 bg-[#09090E] p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/8 pb-3">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#C084FC]" />
              <span className="text-xs font-mono text-zinc-300">Storefront &amp; Checkout Pipeline</span>
            </div>
            <span className="text-xs font-mono text-zinc-500">Payments</span>
          </div>
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-7 grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-[#14141E] border border-white/8 p-2.5 space-y-2">
                <div className="h-12 rounded bg-white/8" />
                <div className="h-2 w-3/4 rounded bg-white/20" />
                <div className="h-2 w-1/3 rounded bg-[#C084FC]/70" />
              </div>
              <div className="rounded-lg bg-[#14141E] border border-white/8 p-2.5 space-y-2">
                <div className="h-12 rounded bg-white/8" />
                <div className="h-2 w-2/3 rounded bg-white/20" />
                <div className="h-2 w-1/3 rounded bg-[#C084FC]/70" />
              </div>
            </div>
            <div className="col-span-5 rounded-lg bg-[#14141E] border border-[#8B5CF6]/30 p-3 flex flex-col justify-between">
              <span className="text-[10px] font-mono text-zinc-300">Cart Drawer</span>
              <div className="space-y-1">
                <div className="h-2 w-full rounded bg-white/15" />
                <div className="h-2 w-2/3 rounded bg-white/10" />
              </div>
              <div className="h-6 rounded-full bg-[#8B5CF6] text-[10px] font-semibold text-white flex items-center justify-center">
                Checkout
              </div>
            </div>
          </div>
        </div>
      );
    case 'landing-page-design':
      return (
        <div className="rounded-xl border border-white/10 bg-[#09090E] p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/8 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C084FC]" />
              <span className="text-xs font-mono text-zinc-300">Campaign Funnel &amp; Lead Capture</span>
            </div>
            <span className="text-xs font-mono text-zinc-500">High Impact</span>
          </div>
          <div className="rounded-lg bg-[#14141E] border border-white/8 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-1.5 w-2/3">
                <div className="h-2.5 w-20 rounded bg-[#C084FC]/80" />
                <div className="h-3.5 w-full rounded bg-white/25" />
                <div className="h-2 w-4/5 rounded bg-white/12" />
              </div>
              <div className="h-12 w-16 rounded-lg bg-gradient-to-br from-[#8B5CF6]/40 to-transparent border border-[#8B5CF6]/30" />
            </div>
            <div className="pt-2 border-t border-white/8 flex items-center justify-between">
              <span className="text-[11px] text-zinc-400">Clear CTA Placement</span>
              <span className="px-3 py-1 rounded-full bg-[#8B5CF6] text-[10px] font-semibold text-white">
                Convert Visitor
              </span>
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div className="rounded-xl border border-white/10 bg-[#09090E] p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/8 pb-3">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#C084FC]" />
              <span className="text-xs font-mono text-zinc-300">Custom Web App &amp; API Architecture</span>
            </div>
            <span className="text-xs font-mono text-zinc-500">Tailored</span>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            <div className="rounded-lg bg-[#14141E] border border-white/8 p-3 space-y-1.5">
              <span className="text-[10px] font-mono text-[#C084FC]">Client UI</span>
              <p className="text-xs font-medium text-white">Dashboards</p>
            </div>
            <div className="rounded-lg bg-[#14141E] border border-[#8B5CF6]/35 p-3 space-y-1.5">
              <span className="text-[10px] font-mono text-[#C084FC]">API Layer</span>
              <p className="text-xs font-medium text-white">Node / REST</p>
            </div>
            <div className="rounded-lg bg-[#14141E] border border-white/8 p-3 space-y-1.5">
              <span className="text-[10px] font-mono text-[#C084FC]">Storage</span>
              <p className="text-xs font-medium text-white">MySQL / Firebase</p>
            </div>
          </div>
        </div>
      );
  }
}

export function ServicesSection({ onSelectServiceForContact }: ServicesSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = SERVICES[activeIndex];

  return (
    <section
      id="services"
      className="relative py-24 lg:py-32 bg-[#050507] border-t border-white/8"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl space-y-4 mb-14 lg:mb-20">
          <p className="text-xs sm:text-sm font-medium tracking-[0.2em] text-[#C084FC] uppercase">
            WHAT WE DO
          </p>
          <h2 className="font-display text-[clamp(2rem,3.8vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-white">
            We build everything your brand needs to thrive online.
          </h2>
        </div>

        {/* Desktop Interactive Studio Split + Mobile Accordion Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: 6 Interactive Service Rows */}
          <div className="lg:col-span-6 divide-y divide-white/10 border-y border-white/10">
            {SERVICES.map((service, index) => {
              const isSelected = index === activeIndex;
              return (
                <div key={service.id} className="group">
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    onMouseEnter={() => setActiveIndex(index)}
                    aria-expanded={isSelected}
                    className="w-full py-6 text-left flex items-start justify-between gap-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9333EA]"
                  >
                    <div className="flex items-baseline gap-4 sm:gap-6">
                      <span
                        className={`font-mono text-xs sm:text-sm tabular-nums transition-colors ${
                          isSelected ? 'text-[#C084FC]' : 'text-zinc-500 group-hover:text-zinc-300'
                        }`}
                      >
                        {service.index}.
                      </span>
                      <div className="space-y-1.5">
                        <h3
                          className={`font-display text-xl sm:text-2xl font-bold tracking-tight transition-colors ${
                            isSelected ? 'text-white' : 'text-zinc-300 group-hover:text-white'
                          }`}
                        >
                          {service.title}
                        </h3>
                        <p className="text-sm text-zinc-400 leading-relaxed max-w-md">
                          {service.summary}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`mt-1 w-9 h-9 rounded-full border flex items-center justify-center shrink-0 transition-all duration-200 ${
                        isSelected
                          ? 'bg-[#8B5CF6] border-[#8B5CF6] text-white rotate-0'
                          : 'border-white/12 text-zinc-400 group-hover:border-white/30 group-hover:text-white'
                      }`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </button>

                  {/* Mobile Inline Detail Panel */}
                  <AnimatePresence initial={false}>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="lg:hidden overflow-hidden pb-6"
                      >
                        <div className="rounded-xl bg-[#0D0D14] border border-white/10 p-5 space-y-5">
                          <ServiceVisualBlueprint service={service} />
                          <div>
                            <p className="text-xs font-mono text-zinc-400 mb-3">Includes</p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {service.includes.map((item) => (
                                <li
                                  key={item}
                                  className="flex items-center gap-2 text-sm text-zinc-200"
                                >
                                  <Check className="w-3.5 h-3.5 text-[#C084FC] shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <button
                            type="button"
                            onClick={() => onSelectServiceForContact(service.contactServiceOption)}
                            className="w-full py-3 px-5 rounded-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                          >
                            <span>Discuss {service.shortTitle}</span>
                            <ArrowUpRight className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Column: Desktop Sticky Interactive Service Showcase Panel */}
          <div className="hidden lg:block lg:col-span-6 lg:sticky lg:top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-white/12 bg-[#0D0D14] p-8 space-y-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <span className="font-mono text-xs text-[#C084FC]">
                      Service {activeService.index} of 06
                    </span>
                    <h3 className="font-display text-3xl font-bold text-white tracking-tight">
                      {activeService.title}
                    </h3>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {activeService.previewHeadline}
                    </p>
                  </div>
                </div>

                {/* Unique Visual Blueprint per Service */}
                <ServiceVisualBlueprint service={activeService} />

                {/* Deliverable Specs */}
                <div className="grid grid-cols-3 gap-4 py-4 border-y border-white/10">
                  {activeService.previewSpecs.map((spec) => (
                    <div key={spec.label} className="space-y-1">
                      <p className="text-[11px] font-mono text-zinc-400">{spec.label}</p>
                      <p className="text-xs font-medium text-white leading-snug">{spec.detail}</p>
                    </div>
                  ))}
                </div>

                {/* Included Deliverables */}
                <div>
                  <p className="text-xs font-mono text-zinc-400 mb-3">What is included</p>
                  <ul className="grid grid-cols-2 gap-y-2.5 gap-x-4">
                    {activeService.includes.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-zinc-200">
                        <Check className="w-4 h-4 text-[#C084FC] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 flex items-center justify-between gap-4">
                  <span className="text-xs text-zinc-400">{activeService.deliverableMetric}</span>
                  <button
                    type="button"
                    onClick={() => onSelectServiceForContact(activeService.contactServiceOption)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-sm font-semibold whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C084FC]"
                  >
                    <span>Start {activeService.shortTitle} Project</span>
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
