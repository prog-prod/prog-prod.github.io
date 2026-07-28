<script setup lang="ts">
// The PDF lives in public/, so it needs the deployment's base path prepended —
// Vite only rewrites asset URLs in src attributes, not in bound hrefs.
const cvHref = computed(
  () => useRuntimeConfig().app.baseURL.replace(/\/$/, '') + CV_URL
)
</script>

<template>
  <section id="hero" class="hero">
    <div class="container hero-inner">
      <div class="hero-content">
        <p v-reveal class="eyebrow">Full Stack Web Developer</p>
        <h1 v-reveal="80" class="hero-title">
          Hi, I'm Andrew.
          <span class="text-grad">I build things for&nbsp;the&nbsp;web.</span>
        </h1>
        <p v-reveal="160" class="hero-sub">
          Welcome to my personal website. For 8+ years I've been crafting fast,
          reliable web applications — from clean backend APIs to interfaces that
          feel alive. Take a look at my work, or write me to build something
          together.
        </p>
        <div v-reveal="240" class="hero-actions">
          <a class="btn btn-primary" href="#work">View my work</a>
          <a class="btn btn-ghost" href="#contact">Get in touch</a>
          <a class="btn btn-ghost" :href="cvHref" download>Download CV</a>
        </div>
        <div v-reveal="320" class="hero-socials">
          <a
            v-for="s in SOCIALS"
            :key="s.name"
            :href="s.url"
            target="_blank"
            rel="noopener"
            :aria-label="s.name"
            :title="s.name"
          >
            <SocialIcon :name="s.icon" />
          </a>
        </div>
      </div>
    </div>
    <a class="scroll-hint" href="#about" aria-label="Scroll down">
      <span class="scroll-wheel" />
    </a>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  padding: calc(var(--header-h) + 40px) 0 80px;
}

.hero-inner {
  display: grid;
  grid-template-columns: minmax(0, 600px) 1fr;
  align-items: center;
}

.hero-content {
  position: relative;
}

/* The 3D scene is a fixed, full-viewport layer, so it can pass behind this
   copy — especially once the grid collapses to one column. This scrim keeps
   the text readable instead of letting bright particles show through it. */
.hero-content::before {
  content: '';
  position: absolute;
  inset: -48px -64px;
  z-index: -1;
  pointer-events: none;
  background: radial-gradient(
    ellipse at 32% 50%,
    rgba(5, 5, 17, 0.94) 0%,
    rgba(5, 5, 17, 0.82) 42%,
    rgba(5, 5, 17, 0) 76%
  );
}

.hero-title {
  font-size: clamp(40px, 6.4vw, 68px);
  font-weight: 700;
}

.hero-title .text-grad {
  display: block;
}

.hero-sub {
  margin-top: 26px;
  max-width: 520px;
  color: var(--muted);
  font-size: 18px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 38px;
}

.hero-socials {
  display: flex;
  gap: 10px;
  margin-top: 44px;
}

.hero-socials a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.03);
  color: var(--muted);
  transition: color 0.25s ease, border-color 0.25s ease, transform 0.25s ease,
    background 0.25s ease;
}

.hero-socials a:hover {
  color: var(--text);
  border-color: rgba(139, 92, 246, 0.65);
  background: rgba(139, 92, 246, 0.12);
  transform: translateY(-3px);
}

.hero-socials svg {
  width: 20px;
  height: 20px;
}

.scroll-hint {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 26px;
  height: 42px;
  border: 2px solid rgba(255, 255, 255, 0.25);
  border-radius: 14px;
  display: flex;
  justify-content: center;
  padding-top: 7px;
}

.scroll-wheel {
  width: 4px;
  height: 8px;
  border-radius: 3px;
  background: var(--cyan);
  animation: scroll-bounce 1.8s ease-in-out infinite;
}

@keyframes scroll-bounce {
  0%,
  100% {
    transform: translateY(0);
    opacity: 1;
  }

  55% {
    transform: translateY(12px);
    opacity: 0.25;
  }
}

@media (max-width: 860px) {
  .hero-inner {
    grid-template-columns: 1fr;
  }

  .hero-sub {
    font-size: 16px;
  }

  /* One column means the scene sits directly behind the whole block, not
     beside it, so the scrim has to cover its full height — buttons and social
     icons included — rather than fading out around the copy. */
  .hero-content::before {
    inset: -32px -28px -20px;
    background: linear-gradient(
      to bottom,
      rgba(5, 5, 17, 0.95) 0%,
      rgba(5, 5, 17, 0.9) 62%,
      rgba(5, 5, 17, 0.72) 100%
    );
  }
}
</style>
