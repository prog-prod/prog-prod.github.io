<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-inner">
      <p class="footer-copy">© 2016–{{ year }} Andrii Polyvianyi</p>
      <div class="footer-socials">
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
      <p class="footer-built">Designed &amp; built with Nuxt + Three.js</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  position: relative;
  z-index: 1;
  border-top: 1px solid var(--border);
  background: rgba(5, 5, 17, 0.8);
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  padding: 28px 0;
}

.footer-copy,
.footer-built {
  color: var(--muted);
  font-size: 14px;
}

.footer-socials {
  display: flex;
  gap: 18px;
}

.footer-socials a {
  color: var(--muted);
  transition: color 0.25s ease, transform 0.25s ease;
  display: inline-flex;
}

.footer-socials a:hover {
  color: var(--cyan);
  transform: translateY(-2px);
}

.footer-socials svg {
  width: 19px;
  height: 19px;
}

@media (max-width: 640px) {
  .footer-inner {
    flex-direction: column;
    text-align: center;
  }
}
</style>
