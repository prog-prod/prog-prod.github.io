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
        { property: 'og:url', content: siteUrl + baseURL },
        { property: 'og:image', content: siteUrl + asset('/img/portfolio-img.png') }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: asset('/favicon.svg') },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap'
        }
      ]
    }
  }
})
