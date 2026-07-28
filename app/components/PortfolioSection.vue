<script setup lang="ts">
// Twelve cards of equal weight read as a list of claims. Lead with a shortlist
// and keep the rest one click away instead of dropping them.
const FEATURED_COUNT = 6

const showAll = ref(false)
const visibleProjects = computed(() =>
  showAll.value ? PROJECTS : PROJECTS.slice(0, FEATURED_COUNT)
)
const hiddenCount = computed(() => Math.max(0, PROJECTS.length - FEATURED_COUNT))
</script>

<template>
  <section id="work" class="section">
    <div class="container">
      <div class="section-head">
        <p v-reveal class="eyebrow">Portfolio</p>
        <h2 v-reveal="60" class="section-title">
          Projects <span class="text-grad">& sites I've built</span>
        </h2>
        <p v-reveal="120" class="section-sub">
          Selected commercial projects — fintech platforms, e-commerce systems
          and high-load services I've built for real businesses.
        </p>
      </div>

      <div class="projects-grid">
        <article
          v-for="(project, i) in visibleProjects"
          :key="project.name"
          v-reveal="(i % 3) * 90"
          v-tilt
          class="card project-card"
        >
          <div class="tilt-glare" />
          <div class="project-media">
            <ProjectCover :icon="project.icon" :category="project.category" :seed="i + 1" />
            <span class="project-category">{{ project.category }}</span>
          </div>
          <div class="project-body">
            <h3>{{ project.name }}</h3>
            <p class="project-metric" v-if="project.metric">{{ project.metric }}</p>
            <p>{{ project.desc }}</p>
            <div class="project-tags">
              <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
            </div>
          </div>
        </article>
      </div>

      <div v-if="hiddenCount" class="projects-more">
        <button type="button" class="btn btn-ghost" @click="showAll = !showAll">
          {{ showAll ? 'Show fewer projects' : `Show ${hiddenCount} more projects` }}
        </button>
      </div>

      <div class="repos-head">
        <h3 v-reveal>Open source <span class="text-grad">on GitHub</span></h3>
        <a
          v-reveal="80"
          class="repos-all"
          href="https://github.com/prog-prod"
          target="_blank"
          rel="noopener"
        >
          View all repositories ↗
        </a>
      </div>

      <div class="repos-grid">
        <a
          v-for="(repo, i) in REPOS"
          :key="repo.name"
          v-reveal="(i % 3) * 90"
          class="card repo-card"
          :href="repo.url"
          target="_blank"
          rel="noopener"
        >
          <div class="repo-top">
            <SocialIcon name="github" />
            <span class="repo-arrow">↗</span>
          </div>
          <h4>{{ repo.name }}</h4>
          <p>{{ repo.desc }}</p>
          <span class="repo-stack">{{ repo.stack }}</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.project-card {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  border-color: rgba(139, 92, 246, 0.45);
  background: var(--card-hover);
}

.project-media {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-bottom: 1px solid var(--border);
}

.project-media .cover {
  transition: transform 0.5s ease;
}

.project-card:hover .project-media .cover {
  transform: scale(1.06);
}

.project-category {
  position: absolute;
  top: 14px;
  left: 14px;
  font-family: var(--font-display);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text);
  background: rgba(5, 5, 17, 0.66);
  border: 1px solid var(--border);
  padding: 5px 12px;
  border-radius: 999px;
}

.project-body {
  padding: 22px 24px 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.project-body h3 {
  font-size: 19px;
  font-weight: 600;
}

.project-body p {
  margin-top: 10px;
  color: var(--muted);
  font-size: 14.5px;
  flex: 1;
}

/* The one line a client actually scans for — give it the weight to match. */
.project-metric {
  margin-top: 10px;
  color: var(--cyan);
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 0.01em;
}

.projects-more {
  display: flex;
  justify-content: center;
  margin-top: 34px;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 18px;
}

.project-tags span {
  font-family: var(--font-display);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--cyan);
  background: rgba(34, 211, 238, 0.08);
  border: 1px solid rgba(34, 211, 238, 0.22);
  padding: 4px 12px;
  border-radius: 999px;
}

.repos-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  margin: 72px 0 32px;
}

.repos-head h3 {
  font-size: 26px;
  font-weight: 700;
}

.repos-all {
  color: var(--muted);
  font-size: 15px;
  font-weight: 500;
  transition: color 0.25s ease;
}

.repos-all:hover {
  color: var(--cyan);
}

.repos-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.repo-card {
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.repo-card:hover {
  border-color: rgba(34, 211, 238, 0.5);
  background: var(--card-hover);
  transform: translateY(-4px);
}

.repo-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  color: var(--muted);
}

.repo-top svg {
  width: 22px;
  height: 22px;
}

.repo-arrow {
  font-size: 18px;
  transition: transform 0.25s ease, color 0.25s ease;
}

.repo-card:hover .repo-arrow {
  color: var(--cyan);
  transform: translate(2px, -2px);
}

.repo-card h4 {
  font-size: 17px;
  font-weight: 600;
  font-family: var(--font-display);
}

.repo-card p {
  margin-top: 8px;
  color: var(--muted);
  font-size: 14px;
  flex: 1;
}

.repo-stack {
  margin-top: 16px;
  font-size: 13px;
  color: var(--cyan);
  font-weight: 500;
}

@media (max-width: 1000px) {
  .projects-grid,
  .repos-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .projects-grid,
  .repos-grid {
    grid-template-columns: 1fr;
  }
}
</style>
