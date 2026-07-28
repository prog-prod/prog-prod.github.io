# Personal Website — Andrii Polyvianyi

**Live:** https://prog-prod.github.io/personal-website/

A redesign of the old [spa](https://github.com/prog-prod/spa) (Laravel + Vue 2) personal
website, rebuilt with **Nuxt 4** and an animated **Three.js** 3D scene.

## Stack

- [Nuxt 4](https://nuxt.com) + Vue 3 + TypeScript
- [Three.js](https://threejs.org) — GLSL noise-displaced morphing blob, particle halo and starfield
- Scroll-reveal and 3D-tilt interactions via custom Vue directives
- No UI framework — hand-crafted CSS design system (glassmorphism, gradients, grain)

## Development

```bash
npm install
npm run dev      # http://localhost:3000
```

## Production

```bash
npm run build    # SSR build in .output/
npm run generate # static site (SSG) into .output/public
```

## Deployment

Every push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which generates the static site and publishes it to GitHub Pages.

Because Pages serves the site from `/personal-website/`, the build needs a base path.
`actions/configure-pages` supplies it via `NUXT_APP_BASE_URL`; to reproduce a
production build locally:

```bash
NUXT_APP_BASE_URL=/personal-website npm run generate && npx serve .output/public
```
