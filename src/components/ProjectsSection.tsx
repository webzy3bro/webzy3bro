import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, X, Layers } from 'lucide-react';
import { PROJECTS, ProjectShowcaseItem } from '../data/agencyData';

interface ProjectsSectionProps {
  onSelectServiceForContact: (serviceOption: string) => void;
}

const CATEGORIES = ['All', 'Websites', 'Mobile Apps', 'E-Commerce', 'Landing Pages'] as const;

export function ProjectsSection({ onSelectServiceForContact }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectShowcaseItem | null>(null);
  const [showArchiveNote, setShowArchiveNote] = useState(false);

  const filteredProjects =
    activeCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === activeCategory);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <section
      id="projects"
      className="relative py-24 lg:py-32 bg-[#08080D] border-t border-white/8"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header & Category Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div className="space-y-4 max-w-2xl">
            <p className="text-xs sm:text-sm font-medium tracking-[0.2em] text-[#C084FC] uppercase">
              OUR SELECTED WORK
            </p>
            <h2 className="font-display text-[clamp(2rem,3.8vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-white">
              Made to be seen. Built to make a difference.
            </h2>
            <p className="text-sm text-zinc-400">
              Curated studio concept showcases demonstrating our web, mobile, and e-commerce craft.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-[#111119] border border-white/10 self-start"
          >
            {CATEGORIES.map((category) => {
              const active = activeCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors ${
                    active
                      ? 'bg-[#8B5CF6] text-white'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetrical Editorial Portfolio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {filteredProjects.map((project, idx) => {
            const isWide = activeCategory === 'All' ? idx === 0 || idx === 3 : idx % 2 === 0;
            return (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className={`group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0D0D14] overflow-hidden ${
                  isWide ? 'lg:col-span-7' : 'lg:col-span-5'
                }`}
              >
                {/* Large Preview Image with Hover Zoom & Fallback */}
                <div
                  onClick={() => setSelectedProject(project)}
                  className="relative aspect-[16/10] w-full overflow-hidden bg-[#14141F] cursor-pointer"
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-zinc-500 p-6 text-center">
                    <Layers className="w-8 h-8 text-[#8B5CF6]/70" />
                    <span className="font-display text-sm text-zinc-400">{project.name}</span>
                  </div>
                  <img
                    src={project.image}
                    alt={`${project.name} — ${project.category} concept preview`}
                    referrerPolicy="no-referrer"
                    className="relative z-10 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-[#0D0D14] via-transparent to-transparent opacity-70" />

                  <span className="absolute top-4 left-4 z-30 font-mono text-xs text-white/90 bg-black/65 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/10">
                    {project.index} · {project.category}
                  </span>
                </div>

                {/* Editorial Details */}
                <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between gap-6">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                      <span>{project.showcaseType}</span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {project.name}
                    </h3>

                    <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                      {project.brief}
                    </p>
                  </div>

                  <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono text-zinc-400">
                      {project.technologies.map((tech, tIdx) => (
                        <span key={tech} className="inline-flex items-center gap-2.5">
                          <span>{tech}</span>
                          {tIdx < project.technologies.length - 1 && (
                            <span aria-hidden="true" className="text-zinc-600">
                              /
                            </span>
                          )}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-[#C084FC] transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto"
                    >
                      <span>View Project</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-zinc-400">
            {showArchiveNote
              ? 'Showing all studio concept showcases across Web, Mobile, E-Commerce, and Landing Pages. Custom client portfolio pieces are shared privately during discovery calls.'
              : 'Every showcase above is a studio demonstration crafted to illustrate our design and engineering standards.'}
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory('All');
              setShowArchiveNote(true);
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 bg-white/[0.03] hover:bg-[#8B5CF6] hover:border-[#8B5CF6] text-white text-sm font-semibold whitespace-nowrap shrink-0 transition-colors"
          >
            <span>VIEW ALL PROJECTS</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Case Study Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              className="w-full max-w-4xl rounded-2xl border border-white/15 bg-[#0D0D14] overflow-hidden shadow-2xl my-auto"
            >
              <div className="relative aspect-[16/9] bg-[#14141F]">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  aria-label="Close project preview"
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-11 h-11 rounded-full bg-black/75 border border-white/20 text-white hover:bg-[#8B5CF6] flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-xs font-mono text-[#C084FC]">
                      {selectedProject.showcaseType}
                    </p>
                    <h3
                      id="project-modal-title"
                      className="font-display text-2xl sm:text-3xl font-bold text-white"
                    >
                      {selectedProject.name}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const serviceOption = selectedProject.contactServiceOption;
                      setSelectedProject(null);
                      onSelectServiceForContact(serviceOption);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-sm font-semibold whitespace-nowrap shrink-0 transition-colors"
                  >
                    <span>Build Something Similar</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  {selectedProject.overview}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-5 border-t border-white/10">
                  <div>
                    <p className="text-xs font-mono text-zinc-400 mb-2.5">Deliverables</p>
                    <ul className="space-y-1.5 text-sm text-zinc-200">
                      {selectedProject.deliverables.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs font-mono text-zinc-400 mb-2.5">Technology Stack</p>
                    <p className="text-sm font-mono text-zinc-200 leading-relaxed">
                      {selectedProject.technologies.join(' · ')}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
