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
            from Ukraine. I take real ownership of the tasks I work on: I like
            shipping features end to end — from the database schema and API design
            to the last pixel of the interface.
          </p>
          <p v-reveal="140">
            I'm constantly learning something new and levelling up as an engineer.
            Over the years I've built ticket-tracking systems, e-commerce stores,
            booking services and internal tools — mostly with PHP, Laravel,
            Vue.js and Node.js.
          </p>

          <blockquote v-reveal="200">
            A cup of coffee and a list of interesting tasks is all it takes for a
            good, productive day — the positive attitude is already included.
          </blockquote>

          <div v-reveal="260" class="about-stats">
            <div class="stat">
              <span class="stat-num text-grad">8+</span>
              <span class="stat-label">years of experience</span>
            </div>
            <div class="stat">
              <span class="stat-num text-grad">35+</span>
              <span class="stat-label">public repositories</span>
            </div>
            <div class="stat">
              <span class="stat-num text-grad">∞</span>
              <span class="stat-label">cups of coffee</span>
            </div>
          </div>
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
