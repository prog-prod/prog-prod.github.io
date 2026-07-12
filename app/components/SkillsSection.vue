<template>
  <section id="skills" class="section">
    <div class="container">
      <div class="section-head">
        <p v-reveal class="eyebrow">Skills</p>
        <h2 v-reveal="60" class="section-title">
          My tools <span class="text-grad">of development</span>
        </h2>
        <p v-reveal="120" class="section-sub">
          The stack I use daily to take products from an idea to production.
        </p>
      </div>

      <div class="skills-grid">
        <div
          v-for="(group, i) in SKILL_GROUPS"
          :key="group.title"
          v-reveal="i * 90"
          v-tilt
          class="card skill-card"
        >
          <div class="tilt-glare" />
          <h3>{{ group.title }}</h3>
          <p class="skill-hint">{{ group.hint }}</p>
          <div class="skill-chips">
            <span v-for="item in group.items" :key="item" class="chip">
              {{ item }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.skill-card {
  position: relative;
  padding: 32px 28px;
}

.skill-card:hover {
  border-color: rgba(139, 92, 246, 0.45);
  background: var(--card-hover);
}

.skill-card h3 {
  font-size: 22px;
  font-weight: 600;
}

.skill-hint {
  margin-top: 6px;
  margin-bottom: 22px;
  color: var(--muted);
  font-size: 14px;
}

.skill-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

@media (max-width: 900px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>
