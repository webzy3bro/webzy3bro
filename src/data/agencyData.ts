export const LOGO_PATH = '/assets/aistudio/IMG-20261122-WA0001_e76ce589.jpg';
export const STUDIO_PHOTO_PATH = '/src/assets/images/studio_craft_editorial_1795347122926.jpg';

export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  shortTitle: string;
  contactServiceOption: string;
  summary: string;
  includes: string[];
  deliverableMetric: string;
  previewHeadline: string;
  previewSpecs: { label: string; detail: string }[];
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'website-development',
    index: '01',
    title: 'Website Development',
    shortTitle: 'Websites',
    contactServiceOption: 'Website',
    summary:
      'We create fast, modern, responsive websites tailored to your brand and business goals.',
    includes: [
      'Business websites',
      'Portfolio websites',
      'Corporate websites',
      'Custom websites',
      'Responsive development',
      'SEO-friendly structure',
    ],
    deliverableMetric: 'Semantic HTML · Sub-second first paint · Responsive grids',
    previewHeadline: 'Multi-breakpoint architecture built for clarity and search visibility.',
    previewSpecs: [
      { label: 'Architecture', detail: 'Next.js / React SSR & Static' },
      { label: 'Performance', detail: 'Core Web Vitals Tuned' },
      { label: 'Accessibility', detail: 'WCAG AA Keyboard & Screen Reader' },
    ],
  },
  {
    id: 'mobile-app-development',
    index: '02',
    title: 'Mobile App Development',
    shortTitle: 'Mobile Apps',
    contactServiceOption: 'Mobile App',
    summary:
      'We transform ideas into seamless mobile experiences built for Android and iOS.',
    includes: [
      'Android applications',
      'iOS applications',
      'Cross-platform apps',
      'Custom app interfaces',
      'API integrations',
    ],
    deliverableMetric: '60fps native navigation · Offline-ready state · Store deployment',
    previewHeadline: 'Unified codebase shipping fluid iOS and Android experiences.',
    previewSpecs: [
      { label: 'Platforms', detail: 'iOS App Store & Google Play' },
      { label: 'Framework', detail: 'React Native & Expo Workflow' },
      { label: 'Connectivity', detail: 'REST & Real-Time API Sync' },
    ],
  },
  {
    id: 'ui-ux-design',
    index: '03',
    title: 'UI/UX Design',
    shortTitle: 'UI/UX',
    contactServiceOption: 'UI/UX Design',
    summary:
      'We create intuitive, beautiful, and user-focused experiences that make digital products simple and enjoyable to use.',
    includes: [
      'Website UI design',
      'Mobile app UI design',
      'Wireframes',
      'Prototypes',
      'User flows',
      'Design systems',
    ],
    deliverableMetric: 'Figma component libraries · Interactive prototypes · Clear flows',
    previewHeadline: 'Structured visual systems that turn complex journeys into effortless steps.',
    previewSpecs: [
      { label: 'Discovery', detail: 'User Journey Mapping & IA' },
      { label: 'Prototyping', detail: 'Clickable Motion Specifications' },
      { label: 'Tokens', detail: 'Scalable Typography & Spacing' },
    ],
  },
  {
    id: 'ecommerce-development',
    index: '04',
    title: 'E-Commerce Development',
    shortTitle: 'E-Commerce',
    contactServiceOption: 'E-commerce',
    summary:
      'We build modern online stores that make shopping simple and help businesses sell their products online.',
    includes: [
      'Online storefronts',
      'Product pages',
      'Shopping carts',
      'Responsive store design',
      'Payment integration support',
    ],
    deliverableMetric: 'Frictionless checkout · Inventory sync · Mobile-first browsing',
    previewHeadline: 'Bespoke digital storefronts engineered for high-intent product discovery.',
    previewSpecs: [
      { label: 'Catalog', detail: 'Variant Filters & Rich Galleries' },
      { label: 'Cart & Flow', detail: 'Instant Slide-Over Drawer' },
      { label: 'Payments', detail: 'Stripe / Razorpay / Local Gateways' },
    ],
  },
  {
    id: 'landing-page-design',
    index: '05',
    title: 'Landing Page Design',
    shortTitle: 'Landing Pages',
    contactServiceOption: 'Landing Page',
    summary:
      'High-impact landing pages designed to communicate your offer, capture attention, and turn visitors into potential customers.',
    includes: [
      'Product landing pages',
      'Campaign pages',
      'Lead generation pages',
      'Promotional websites',
    ],
    deliverableMetric: 'Conversion-focused hierarchy · Sharp copy pairing · Fast launch',
    previewHeadline: 'Focused storytelling engineered to guide attention straight to action.',
    previewSpecs: [
      { label: 'Narrative', detail: 'Above-the-Fold Value Framing' },
      { label: 'Capture', detail: 'Validated Lead & Booking Flows' },
      { label: 'Motion', detail: 'Scroll-Paced Visual Storytelling' },
    ],
  },
  {
    id: 'custom-digital-solutions',
    index: '06',
    title: 'Custom Digital Solutions',
    shortTitle: 'Custom Apps',
    contactServiceOption: 'Custom Development',
    summary:
      'We build tailored digital experiences around your unique ideas, workflows, and requirements.',
    includes: [
      'Web applications',
      'Business dashboards',
      'Custom tools',
      'API-connected solutions',
    ],
    deliverableMetric: 'Role-based access · Clean data tables · Tailored internal workflows',
    previewHeadline: 'Bespoke software tools designed around how your team actually works.',
    previewSpecs: [
      { label: 'Portals', detail: 'Client & Operations Dashboards' },
      { label: 'Backend', detail: 'Node.js, MySQL & Firebase' },
      { label: 'Integrations', detail: 'Webhooks, CRM & Billing APIs' },
    ],
  },
];

export interface ProjectShowcaseItem {
  id: string;
  index: string;
  name: string;
  category: 'Websites' | 'Mobile Apps' | 'E-Commerce' | 'Landing Pages';
  showcaseType: string;
  brief: string;
  overview: string;
  technologies: string[];
  deliverables: string[];
  image: string;
  aspect: 'wide' | 'standard';
  contactServiceOption: string;
}

export const PROJECTS: ProjectShowcaseItem[] = [
  {
    id: 'meridian-capital-web',
    index: '01',
    name: 'Meridian Analytics Portal',
    category: 'Websites',
    showcaseType: 'Concept Showcase · Web Application',
    brief:
      'A dark-mode portfolio and treasury web dashboard crafted for clear financial oversight and multi-device responsiveness.',
    overview:
      'Designed as a demonstration of our custom web application craft, Meridian pairs high-contrast data typography with crisp interactive reporting panels and streamlined navigation across desktop and tablet screens.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    deliverables: ['Design System', 'Responsive Web App', 'Interactive Charts', 'Role-Based Views'],
    image: '/src/assets/images/project_fintech_web_1795347123109.jpg',
    aspect: 'wide',
    contactServiceOption: 'Custom Development',
  },
  {
    id: 'kora-mobile-companion',
    index: '02',
    name: 'Kora Personal Finance & Travel',
    category: 'Mobile Apps',
    showcaseType: 'Concept Showcase · iOS & Android App',
    brief:
      'Cross-platform mobile application concept combining daily spending clarity with curated travel discovery.',
    overview:
      'Built to showcase fluid native-feeling gestures and modular mobile UI architecture. Features instant balance views, clean transaction timelines, and lightweight card-based exploration tailored for thumb reach.',
    technologies: ['React Native', 'Expo', 'TypeScript', 'Firebase'],
    deliverables: ['iOS & Android UI', 'Interactive Prototype', 'API Architecture', 'Push Flows'],
    image: '/src/assets/images/project_mobile_app_1795347122277.jpg',
    aspect: 'standard',
    contactServiceOption: 'Mobile App',
  },
  {
    id: 'aeterna-objects-store',
    index: '03',
    name: 'Aeterna Objects Storefront',
    category: 'E-Commerce',
    showcaseType: 'Concept Showcase · Online Store',
    brief:
      'Editorial e-commerce experience built around tactile photography, minimalist product grids, and rapid checkout.',
    overview:
      'Demonstrates our approach to modern digital retail: generous negative space, crisp product comparison, slide-over shopping bag interactions, and mobile-optimized payment readiness without visual clutter.',
    technologies: ['Next.js', 'Tailwind CSS', 'Node.js', 'MySQL'],
    deliverables: ['Storefront UI', 'Product Detail System', 'Cart Experience', 'Checkout Integration'],
    image: '/src/assets/images/project_ecommerce_store_1795347122231.jpg',
    aspect: 'wide',
    contactServiceOption: 'E-commerce',
  },
  {
    id: 'axis-collective-landing',
    index: '04',
    name: 'Axis Architectural Collective',
    category: 'Landing Pages',
    showcaseType: 'Concept Showcase · Editorial Landing Page',
    brief:
      'High-impact promotional website featuring bold Swiss typography, monochrome imagery, and smooth scroll pacing.',
    overview:
      'Created as an architectural studio showcase, this landing page highlights our command of editorial grid tension, balanced display typography, and seamless GSAP reveal choreography.',
    technologies: ['React', 'GSAP', 'Tailwind CSS', 'HTML5'],
    deliverables: ['Art Direction', 'Scroll Choreography', 'Responsive Grid', 'Lead Inquiry Flow'],
    image: '/src/assets/images/project_architecture_landing_1795347122799.jpg',
    aspect: 'standard',
    contactServiceOption: 'Landing Page',
  },
];

export const CORE_VALUES = [
  {
    index: '01',
    title: 'Creativity',
    description: 'We think beyond the ordinary.',
  },
  {
    index: '02',
    title: 'Precision',
    description: 'Every detail matters.',
  },
  {
    index: '03',
    title: 'Innovation',
    description: 'We use modern technology to solve real problems.',
  },
  {
    index: '04',
    title: 'Quality',
    description: 'We build experiences that are made to last.',
  },
];

export interface WhyChooseItem {
  id: string;
  index: string;
  title: string;
  headline: string;
  detail: string;
  focusArea: string;
}

export const WHY_CHOOSE_ITEMS: WhyChooseItem[] = [
  {
    id: 'custom-built',
    index: '01',
    title: 'Custom-built solutions',
    headline: 'Engineered from a blank canvas around your exact goals.',
    detail:
      'No bloated off-the-shelf themes. Every layout, component, and backend route is structured specifically for your business model and brand voice.',
    focusArea: 'Architecture & Bespoke Code',
  },
  {
    id: 'creative-modern',
    index: '02',
    title: 'Creative and modern design',
    headline: 'Editorial composition that commands immediate trust.',
    detail:
      'We pair disciplined typography, intentional negative space, and cohesive visual identity so visitors recognize your credibility within seconds.',
    focusArea: 'Art Direction & Brand Craft',
  },
  {
    id: 'responsive',
    index: '03',
    title: 'Responsive across all devices',
    headline: 'Tuned individually for desktop, tablet, and thumb-first mobile.',
    detail:
      'Breakpoints are actively designed—not just shrunk down—ensuring crisp spacing, readable type scales, and effortless tap targets everywhere.',
    focusArea: 'Multi-Viewport Engineering',
  },
  {
    id: 'performance',
    index: '04',
    title: 'Performance-focused development',
    headline: 'Lean bundles, smooth 60fps transitions, and rapid page loads.',
    detail:
      'From optimized media pipelines to GPU-composited motion, we engineer fast digital products that respect your visitors’ time and bandwidth.',
    focusArea: 'Speed & Core Web Vitals',
  },
  {
    id: 'user-friendly',
    index: '05',
    title: 'User-friendly experiences',
    headline: 'Clear navigation and intuitive flows that remove friction.',
    detail:
      'Every interaction is mapped around how real customers browse, compare, and decide—making complex products feel straightforward.',
    focusArea: 'Usability & Interaction Design',
  },
  {
    id: 'communication',
    index: '06',
    title: 'Clear communication',
    headline: 'Direct collaboration with transparent milestones from day one.',
    detail:
      'You always know what is being built, why design choices are made, and when the next milestone ships—with zero agency guesswork.',
    focusArea: 'Partnership & Transparency',
  },
  {
    id: 'execution',
    index: '07',
    title: 'Reliable project execution',
    headline: 'Structured workflows that move smoothly from wireframe to launch.',
    detail:
      'Disciplined scoping, thorough device testing, and clean handoff ensure launches feel calm, predictable, and production-ready.',
    focusArea: 'Delivery & QA Rigor',
  },
  {
    id: 'tailored',
    index: '08',
    title: 'Solutions tailored to your business',
    headline: 'Built for startups, creators, and growing companies alike.',
    detail:
      'Whether you need a sharp conversion landing page or a full web and mobile ecosystem, we right-size the technology to fit your stage.',
    focusArea: 'Strategic Fit & Scalability',
  },
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'DISCOVER',
    description: 'We learn about your idea, business, audience, and requirements.',
  },
  {
    step: '02',
    title: 'PLAN',
    description: 'We define the project scope, features, structure, and direction.',
  },
  {
    step: '03',
    title: 'DESIGN',
    description: 'We create the visual experience and interface.',
  },
  {
    step: '04',
    title: 'DEVELOP',
    description: 'We turn the designs into a working website or application.',
  },
  {
    step: '05',
    title: 'TEST & LAUNCH',
    description: 'We test, refine, and launch your project.',
  },
];

export interface TechItem {
  name: string;
  role: string;
  category: 'Frontend' | 'Mobile' | 'Backend & Data';
}

export const TECHNOLOGIES: TechItem[] = [
  { name: 'HTML', role: 'Semantic Document Structure', category: 'Frontend' },
  { name: 'CSS', role: 'Modern Layout & Styling', category: 'Frontend' },
  { name: 'JavaScript', role: 'Interactive Browser Logic', category: 'Frontend' },
  { name: 'React', role: 'Component UI Architecture', category: 'Frontend' },
  { name: 'Next.js', role: 'Full-Stack Web Framework', category: 'Frontend' },
  { name: 'React Native', role: 'Cross-Platform Mobile Apps', category: 'Mobile' },
  { name: 'Expo', role: 'Native Build & Release Pipeline', category: 'Mobile' },
  { name: 'Tailwind CSS', role: 'Design Token Utility System', category: 'Frontend' },
  { name: 'Node.js', role: 'Scalable Server Runtime', category: 'Backend & Data' },
  { name: 'MySQL', role: 'Structured Relational Storage', category: 'Backend & Data' },
  { name: 'Firebase', role: 'Realtime Sync & Auth Services', category: 'Backend & Data' },
];

export const FAQS = [
  {
    question: 'What does WEBZY3BRO do?',
    answer:
      'We design and develop websites, mobile applications, e-commerce platforms, and custom digital solutions for businesses and individuals.',
  },
  {
    question: 'Can you build a website for my business?',
    answer:
      'Yes. We create custom websites tailored to your brand, business goals, and audience.',
  },
  {
    question: 'Do you develop mobile apps?',
    answer:
      'Yes. We develop mobile app experiences for Android and iOS based on your project requirements.',
  },
  {
    question: 'How long does a project take?',
    answer:
      "The timeline depends on the project's size, complexity, features, and design requirements.",
  },
  {
    question: 'How much does a website or app cost?',
    answer:
      'Pricing depends on the project scope and functionality. Contact us to discuss your requirements and receive a custom estimate.',
  },
  {
    question: 'How do I start?',
    answer:
      'Submit your project details through our contact form, and we can discuss your idea and requirements.',
  },
];

export const CONTACT_SERVICE_OPTIONS = [
  'Website',
  'Mobile App',
  'UI/UX Design',
  'E-commerce',
  'Landing Page',
  'Custom Development',
  'Other',
] as const;

export const CONTACT_BUDGET_OPTIONS = [
  'Under $2,500',
  '$2,500 – $5,000',
  '$5,000 – $12,000',
  '$12,000 – $25,000',
  '$25,000+',
  'Not sure yet',
] as const;
