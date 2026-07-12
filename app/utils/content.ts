export interface Project {
  name: string
  desc: string
  img: string
  tags: string[]
  link?: string
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

export const EMAIL = 'polyvyanyy.andrii@gmail.com'
export const TELEGRAM = 'https://t.me/prog_prog'

export const SOCIALS: Social[] = [
  { name: 'GitHub', icon: 'github', url: 'https://github.com/prog-prod' },
  { name: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/in/andrii-polyvianyi/' },
  { name: 'Telegram', icon: 'telegram', url: TELEGRAM },
  {
    name: 'Stack Overflow',
    icon: 'stackoverflow',
    url: 'https://stackoverflow.com/users/10215872/andrii-polyvianyi'
  },
  { name: 'Instagram', icon: 'instagram', url: 'https://www.instagram.com/prog_prog_/' }
]

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Backend',
    hint: 'APIs, architecture & business logic',
    items: ['PHP', 'Laravel', 'Yii2', 'Node.js', 'REST API', 'WordPress']
  },
  {
    title: 'Frontend',
    hint: 'Interfaces people enjoy using',
    items: ['JavaScript', 'TypeScript', 'Vue.js', 'Nuxt', 'HTML5', 'CSS3', 'Three.js']
  },
  {
    title: 'Data & DevOps',
    hint: 'Storage, search & delivery',
    items: ['MySQL', 'Elasticsearch', 'Docker', 'Git', 'Linux', 'CI/CD', 'Webpack']
  }
]

export const PROJECTS: Project[] = [
  {
    name: 'Nort Monitoring',
    desc: 'A tracking system for railway tickets — monitors seat availability and notifies users the moment tickets appear.',
    img: '/img/nortmonitoring.png',
    tags: ['Laravel', 'Vue.js', 'MySQL']
  },
  {
    name: 'Proxy Auto Configuration',
    desc: 'A service that generates and serves PAC files, letting clients route traffic through the right proxy automatically.',
    img: '/img/ProxyService.png',
    tags: ['PHP', 'Networking']
  },
  {
    name: 'Quiz Generator',
    desc: 'A web application for building and passing custom quizzes with instant scoring of the results.',
    img: '/img/quiz-generator.png',
    tags: ['PHP', 'JavaScript']
  },
  {
    name: 'Luck Generator',
    desc: 'A playful web app for random draws and giveaways — pick a winner in one click.',
    img: '/img/luckgenerator.png',
    tags: ['JavaScript', 'PHP']
  },
  {
    name: 'Underman',
    desc: 'A corporate website with a product catalog, built to present the brand and drive inbound requests.',
    img: '/img/underman.png',
    tags: ['WordPress', 'CSS3']
  },
  {
    name: 'Dance Club',
    desc: 'A website for a dance studio with class schedule, trainers and enrollment form.',
    img: '/img/dance.png',
    tags: ['PHP', 'jQuery']
  },
  {
    name: 'Bank Service',
    desc: 'A test assignment: a small banking service handling accounts and transactions safely.',
    img: '/img/bank.png',
    tags: ['Laravel', 'MySQL']
  },
  {
    name: 'Endless Tree',
    desc: 'A test assignment: an infinitely nested category tree with efficient storage and rendering.',
    img: '/img/minty.png',
    tags: ['PHP', 'MySQL']
  },
  {
    name: 'Online Store',
    desc: 'An e-commerce store with a product catalog, cart and order flow.',
    img: '/img/beyblade.png',
    tags: ['PHP', 'MySQL', 'jQuery']
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
