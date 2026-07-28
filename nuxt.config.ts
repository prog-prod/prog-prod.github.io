// GitHub Pages serves the site from /<repo>/, so every absolute asset URL that
// Nuxt does not rewrite itself (head links, og:image) has to carry the prefix.
const baseURL = withTrailingSlash(process.env.NUXT_APP_BASE_URL || '/')
const siteUrl = (process.env.NUXT_PUBLIC_SITE_URL || 'https://prog-prod.github.io').replace(/\/$/, '')

function withTrailingSlash(path: string) {
  return path.endsWith('/') ? path : `${path}/`
}

function asset(path: string) {
  return baseURL + path.replace(/^\//, '')
}

const NAME = 'Andrii Polyvianyi'
const pageUrl = siteUrl + baseURL

// Person schema: the cheapest structured-data win for a personal site — it is
// what lets search engines tie the name, role and profile links together.
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: NAME,
  url: pageUrl,
  image: siteUrl + asset('/img/portrait.jpg'),
  jobTitle: 'Full Stack Web Developer',
  email: 'mailto:polyvyanyy.andrii@gmail.com',
  address: { '@type': 'PostalAddress', addressCountry: 'UA' },
  knowsAbout: ['PHP', 'Laravel', 'Vue.js', 'Nuxt', 'Node.js', 'TypeScript', 'MySQL'],
  sameAs: [
    'https://github.com/prog-prod',
    'https://www.linkedin.com/in/andrii-polyvyanyi/',
    'https://stackoverflow.com/users/10215872/andrii-polyvianyi',
    'https://t.me/primary_dv'
  ]
}

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  nitro: {
    // Emits .nojekyll and a 404.html SPA fallback alongside the static output.
    preset: 'github-pages'
  },
  vite: {
    optimizeDeps: {
      include: ['three']
    }
  },
  app: {
    baseURL,
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Andrii Polyvianyi — Full Stack Web Developer',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Personal website of Andrii Polyvianyi — a full stack web developer from Ukraine building fast, modern web applications with PHP, Laravel, Vue.js, Nuxt and Node.js.'
        },
        { name: 'theme-color', content: '#050511' },
        { property: 'og:title', content: 'Andrii Polyvianyi — Full Stack Web Developer' },
        {
          property: 'og:description',
          content: 'Portfolio, skills and contacts of Andrii Polyvianyi, full stack web developer.'
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: pageUrl },
        { property: 'og:site_name', content: NAME },
        { property: 'og:image', content: siteUrl + asset('/img/og-card.jpg') },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: `${NAME} — Full Stack Web Developer` },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: `${NAME} — Full Stack Web Developer` },
        {
          name: 'twitter:description',
          content: 'Portfolio, skills and contacts of Andrii Polyvianyi, full stack web developer.'
        },
        { name: 'twitter:image', content: siteUrl + asset('/img/og-card.jpg') }
      ],
      link: [
        { rel: 'canonical', href: pageUrl },
        { rel: 'icon', type: 'image/svg+xml', href: asset('/favicon.svg') },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap'
        }
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(personSchema)
        }
      ]
    }
  }
})
