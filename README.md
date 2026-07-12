# Personal Website — Andrii Polyvianyi

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
npm run generate # static site (SSG)
```
