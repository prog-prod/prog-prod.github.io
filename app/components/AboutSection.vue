<template>
  <section id="about" class="section">
    <div class="container">
      <div class="section-head">
        <p v-reveal class="eyebrow">About me</p>
        <h2 v-reveal="60" class="section-title">
          A short story <span class="text-grad">about who I am</span>
        </h2>
      </div>

      <div class="about-grid">
        <div v-reveal class="about-portrait">
          <div class="portrait-ring" aria-hidden="true" />
          <img
            src="/img/portrait.jpg"
            alt="Andrii Polyvianyi"
            width="360"
            height="360"
            loading="lazy"
          />
        </div>

        <div class="about-text">
          <p v-reveal="80">
            Hi! I'm <strong>Andrii Polyvianyi</strong>, a full stack web developer
            from Ukraine with 8+ years in commercial development. Today I own the
            production environment of a fintech's key web applications — stability
            monitoring, security, performance and the release process are all on
            me, and releases go out on schedule.
          </p>
          <p v-reveal="140">
            Before that I refactored a microservice membership platform on AWS,
            built a UK real-estate API covered with unit, feature and end-to-end
            tests, and grew into a team lead on an e-commerce frontend. I move
            comfortably between Laravel, Vue&nbsp;/&nbsp;Nuxt and Node.js — and I
            talk to clients directly, in English.
          </p>

          <ul v-reveal="200" class="about-highlights">
            <li>
              Maintained, refactored and hardened <strong>6+ financial
              products</strong>, and took full responsibility for their
              production environment.
            </li>
            <li>
              Repelled <strong>DDoS and form-spam attacks</strong> and raised the
              security baseline of the company's public websites.
            </li>
            <li>
              Designed a <strong>multi-tenant SaaS platform</strong> on Vue 3 +
              Inertia.js with RBAC, impersonation and a LiqPay payment gateway.
            </li>
            <li>
              Drove code reviews and clean-ups on an AWS microservice platform,
              <strong>cutting critical bugs</strong> in production releases.
            </li>
          </ul>

          <blockquote v-reveal="260">
            A cup of coffee and a list of interesting tasks is all it takes for a
            good, productive day — the positive attitude is already included.
          </blockquote>

          <div v-reveal="320" class="about-stats">
            <div class="stat">
              <span class="stat-num text-grad">8+</span>
              <span class="stat-label">years in commercial development</span>
            </div>
            <div class="stat">
              <span class="stat-num text-grad">12+</span>
              <span class="stat-label">production projects shipped</span>
            </div>
            <div class="stat">
              <span class="stat-num text-grad">2</span>
              <span class="stat-label">Master's degrees</span>
            </div>
          </div>

          <p v-reveal="380" class="about-meta">
            MSc in Computer Science, Sumy State University · MSc in Applied
            Physics, Taras Shevchenko National University of Kyiv · Ukrainian
            (native) · English (B1–B2, actively improving)
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-grid {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 64px;
  align-items: start;
}

.about-portrait {
  position: relative;
  width: 100%;
  max-width: 360px;
  aspect-ratio: 1;
}

.about-portrait img {
  position: absolute;
  inset: 14px;
  width: calc(100% - 28px);
  height: calc(100% - 28px);
  object-fit: cover;
  border-radius: 28px;
}

.portrait-ring {
  position: absolute;
  inset: 0;
  border-radius: 34px;
  padding: 2px;
  background: conic-gradient(
    from var(--ring-angle, 0deg),
    #8b5cf6,
    #22d3ee,
    transparent 40%,
    #8b5cf6
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: ring-spin 7s linear infinite;
}

@property --ring-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

@keyframes ring-spin {
  to {
    --ring-angle: 360deg;
  }
}

.about-text p {
  color: var(--muted);
  font-size: 17px;
  margin-bottom: 20px;
}

.about-text strong {
  color: var(--text);
}

.about-highlights {
  list-style: none;
  margin: 28px 0 4px;
  display: grid;
  gap: 14px;
}

.about-highlights li {
  position: relative;
  padding-left: 26px;
  color: var(--muted);
  font-size: 16px;
}

/* The marker echoes the chip bullets used across the site, so the list reads as
   part of the same system rather than as a plain <ul>. */
.about-highlights li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--grad);
}

.about-highlights strong {
  color: var(--text);
  font-weight: 600;
}

blockquote {
  margin: 28px 0;
  padding: 20px 26px;
  border-left: 3px solid;
  border-image: var(--grad) 1;
  background: rgba(13, 13, 30, 0.8);
  border-radius: 0 var(--radius) var(--radius) 0;
  color: var(--text);
  font-style: italic;
  font-size: 16px;
}

.about-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 44px;
  margin-top: 36px;
}

.stat {
  display: flex;
  flex-direction: column;
}

.stat-num {
  font-family: var(--font-display);
  font-size: 40px;
  font-weight: 700;
  line-height: 1;
}

.stat-label {
  margin-top: 8px;
  color: var(--muted);
  font-size: 14px;
}

/* Scoped under .about-text to outrank the `.about-text p` base rule above. */
.about-text .about-meta {
  margin-top: 32px;
  margin-bottom: 0;
  padding-top: 22px;
  border-top: 1px solid var(--border);
  font-size: 14px;
  line-height: 1.7;
}

@media (max-width: 900px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 44px;
  }

  .about-portrait {
    margin-inline: auto;
  }
}
</style>
