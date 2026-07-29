export interface Project {
  name: string
  desc: string
  tags: string[]
  category: string
  icon: string
  metric?: string
}

export interface Repo {
  name: string
  desc: string
  stack: string
  url: string
}

export interface SkillGroup {
  title: string
  hint: string
  items: string[]
}

export interface Social {
  name: string
  icon: string
  url: string
}

// Web3Forms relays submissions to the address the key is bound to, so the
// destination inbox never appears in the public HTML.
export const CV_FORM_ENDPOINT = 'https://api.web3forms.com/submit'
export const CV_FORM_ACCESS_KEY = '9e31285b-6795-4123-9501-88be55f968d9'

export const EMAIL = 'polyvyanyy.andrii@gmail.com'
export const TELEGRAM = 'https://t.me/primary_dv'
export const TELEGRAM_HANDLE = `@${TELEGRAM.split('/').pop()}`

export const SOCIALS: Social[] = [
  { name: 'GitHub', icon: 'github', url: 'https://github.com/prog-prod' },
  { name: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/in/andrii-polyvyanyi/' },
  { name: 'Telegram', icon: 'telegram', url: TELEGRAM }
]

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Backend',
    hint: 'APIs, domain logic & integrations',
    items: ['PHP 8', 'Laravel', 'Yii2', 'CodeIgniter', 'Node.js', 'Nest.js', 'REST API', 'GraphQL']
  },
  {
    title: 'Frontend',
    hint: 'SSR apps and interfaces people enjoy',
    items: [
      'JavaScript (ES6+)',
      'TypeScript',
      'Vue 2/3',
      'Nuxt',
      'Inertia.js',
      'Tailwind CSS',
      'Vuetify',
      'Three.js'
    ]
  },
  {
    title: 'Data & Search',
    hint: 'Storage, search & messaging at scale',
    items: ['MySQL / MariaDB', 'PostgreSQL', 'Redis', 'Elasticsearch', 'Meilisearch', 'RabbitMQ']
  },
  {
    title: 'DevOps & Cloud',
    hint: 'Deployment, uptime & production ownership',
    items: ['Docker', 'Linux', 'Nginx / Apache', 'AWS (EC2, ECS, S3)', 'CloudFront', 'CI/CD']
  },
  {
    title: 'Architecture & Quality',
    hint: 'Systems that stay maintainable',
    items: ['SOLID', 'Design Patterns', 'Microservices', 'Multi-tenancy', 'RBAC', 'Code Review']
  },
  {
    title: 'Testing & Workflow',
    hint: 'Confidence before every release',
    items: ['PHPUnit', 'Jest', 'Laravel Dusk', 'Git Flow', 'ESLint / Prettier', 'SCRUM']
  }
]

export const PROJECTS: Project[] = [
  {
    name: 'High-Load SEO Platform with Search',
    desc: 'High-load SEO platform with full-text search across millions of profiles: SSR app on Laravel + Vue 3 (Inertia.js), microservices architecture, dynamic SEO pages and an admin panel with parser monitoring.',
    tags: ['Laravel', 'Vue 3', 'Elasticsearch', 'Redis'],
    category: 'Web Platform',
    icon: 'search'
  },
  {
    name: 'E-commerce Platform with Custom Print Builder',
    desc: 'Full-scale e-commerce platform with a print-on-demand builder and 3D product customization on Three.js. Typesense/Elasticsearch search, payments via Stripe, PayPal, LiqPay and Fondy, admin panel with CRM.',
    tags: ['Laravel', 'Vue 3', 'Three.js', 'Elasticsearch'],
    category: 'E-commerce',
    icon: 'cube'
  },
  {
    name: 'Fintech Platform with Credit Calculator',
    desc: 'Production fintech platform with a real-time credit calculator, Filament admin panel and an SMS gateway for marketing campaigns — optimized for high traffic and secure financial logic.',
    tags: ['Laravel', 'Livewire', 'Tailwind CSS', 'MySQL'],
    category: 'Fintech',
    icon: 'calculator'
  },
  {
    name: 'Video Streaming Platform (TikTok-style Reels)',
    desc: 'TikTok-style video platform: vertical autoplay feed on HLS/DASH with Cloudflare Stream, comments, favorites and profiles, plus an analytics admin and a full visit/click tracking system.',
    tags: ['Laravel', 'Nuxt', 'WebSockets', 'Redis'],
    category: 'Streaming',
    icon: 'play'
  },
  {
    name: 'Enterprise Membership & Payment System',
    desc: 'Enterprise membership platform with payments and subscriptions used by organizations in Norway: invoicing, refunds and payment flows with Stripe and EHF, reports, notifications and data validation.',
    tags: ['Node.js', 'Ember.js', 'PHP', 'Kubernetes'],
    category: 'Enterprise',
    icon: 'users'
  },
  {
    name: 'Fintech Platform for Earned Wage Access',
    desc: 'Pay-on-demand platform: a multi-tenant system for companies and employees with a LiqPay payment flow, RBAC admin panel, SMS verification and Redis + Meilisearch under the hood.',
    tags: ['Laravel', 'Vue 3', 'Inertia.js', 'Docker'],
    category: 'Fintech',
    icon: 'wallet'
  },
  {
    name: 'Headless CMS Website',
    desc: 'Headless corporate website: statically generated Nuxt.js frontend over a WordPress REST API backend, HubSpot integration, SEO tooling and AWS infrastructure with S3, CloudFront and ECS.',
    tags: ['Nuxt.js', 'WordPress', 'AWS', 'Docker'],
    category: 'Web Platform',
    icon: 'layers'
  },
  {
    name: 'Fintech Landing with Credit Calculator',
    desc: 'High-conversion fintech landing with an XIRR loan calculator and payment schedule, UA/RU localization, GA4/GTM/UTM analytics, secure lead forms and fingerprint-based user identification.',
    tags: ['PHP', 'JavaScript', 'GTM', 'AWS S3'],
    category: 'Fintech',
    icon: 'trending'
  },
  {
    name: 'Fintech Marketing Website',
    desc: 'Marketing website for a financial product with a dynamic loan calculator, UA/RU localization, lead-generation forms with reCAPTCHA and analytics wired through Google Tag Manager.',
    tags: ['PHP', 'JavaScript', 'MySQL', 'GTM'],
    category: 'Fintech',
    icon: 'globe'
  },
  {
    name: 'Marketing Landing with Partner Integration',
    desc: 'Marketing landing page for a financial service with dynamic partner selection, GTM/UTM campaign tracking and a responsive UI tuned for conversions and mobile traffic.',
    tags: ['Laravel 12', 'Livewire', 'Tailwind CSS'],
    category: 'Marketing',
    icon: 'chart'
  },
  {
    name: 'Railway Ticket Monitoring System',
    desc: 'Real-time monitoring system for railway tickets: Laravel backend with API integrations, a data-visualization dashboard and monitoring logic built for stability and high reliability.',
    tags: ['Laravel', 'Vue.js', 'Node.js', 'Socket.io'],
    category: 'Monitoring',
    icon: 'activity'
  },
  {
    name: 'Full E-commerce Store',
    desc: 'Full-featured online store with a product catalog, filtering and cart logic, an integrated backend API and performance tuned for a smooth shopping experience.',
    tags: ['Laravel', 'Vue.js', 'MySQL'],
    category: 'E-commerce',
    icon: 'bag'
  }
]

export const REPOS: Repo[] = [
  {
    name: 'table-booking',
    desc: 'Restaurant table reservation system',
    stack: 'Laravel · Blade · MySQL',
    url: 'https://github.com/prog-prod/table-booking'
  },
  {
    name: 'yii2-blog',
    desc: 'Blog engine with an admin panel',
    stack: 'Yii2 · PHP · MySQL',
    url: 'https://github.com/prog-prod/yii2-blog'
  },
  {
    name: 'of-db-service',
    desc: 'Database service API',
    stack: 'Node.js · JavaScript',
    url: 'https://github.com/prog-prod/of-db-service'
  },
  {
    name: 'parser',
    desc: 'Data parsing application',
    stack: 'Laravel · Vue.js',
    url: 'https://github.com/prog-prod/parser'
  },
  {
    name: 'power-energy-server',
    desc: 'Backend for an energy monitoring app',
    stack: 'Node.js · JavaScript',
    url: 'https://github.com/prog-prod/power-energy-server'
  },
  {
    name: 'spa',
    desc: 'The previous version of this very website',
    stack: 'Laravel · Vue.js',
    url: 'https://github.com/prog-prod/spa'
  }
]
