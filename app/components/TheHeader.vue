<script setup lang="ts">
const scrolled = ref(false)
const open = ref(false)

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#work' },
  { label: 'CV', href: '#cv' },
  { label: 'Contact', href: '#contact' }
]

onMounted(() => {
  const onScroll = () => (scrolled.value = window.scrollY > 24)
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
})
</script>

<template>
  <header class="site-header" :class="{ scrolled }">
    <nav class="container nav">
      <a href="#hero" class="brand" @click="open = false">
        AP<span class="brand-dot">.</span>
      </a>

      <ul class="nav-links">
        <li v-for="link in links" :key="link.href">
          <a :href="link.href">{{ link.label }}</a>
        </li>
      </ul>

      <a class="btn btn-primary btn-sm nav-cta" :href="`mailto:${EMAIL}`">Hire me</a>

      <button
        class="burger"
        :class="{ active: open }"
        aria-label="Toggle menu"
        @click="open = !open"
      >
        <span /><span /><span />
      </button>
    </nav>

    <Transition name="menu">
      <div v-if="open" class="mobile-menu">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          @click="open = false"
        >
          {{ link.label }}
        </a>
        <a class="btn btn-primary" :href="`mailto:${EMAIL}`" @click="open = false">
          Hire me
        </a>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  transition: background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease;
  border-bottom: 1px solid transparent;
}

.site-header.scrolled {
  background: rgba(5, 5, 17, 0.88);
  border-bottom-color: var(--border);
}

.nav {
  display: flex;
  align-items: center;
  gap: 32px;
  height: var(--header-h);
}

.brand {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-right: auto;
}

.brand-dot {
  background: var(--grad);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 32px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links a {
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 500;
  color: var(--muted);
  transition: color 0.25s ease;
}

.nav-links a:hover {
  color: var(--text);
}

.btn-sm {
  padding: 10px 22px;
  font-size: 14px;
}

.burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 42px;
  height: 42px;
  padding: 10px;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 12px;
  cursor: pointer;
}

.burger span {
  display: block;
  height: 2px;
  width: 100%;
  background: var(--text);
  border-radius: 2px;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.burger.active span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.burger.active span:nth-child(2) {
  opacity: 0;
}

.burger.active span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.mobile-menu {
  display: none;
  flex-direction: column;
  gap: 8px;
  padding: 16px 24px 28px;
  background: rgba(5, 5, 17, 0.96);
  border-bottom: 1px solid var(--border);
}

.mobile-menu a {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 500;
  padding: 12px 0;
  color: var(--text);
}

.mobile-menu .btn {
  margin-top: 10px;
  justify-content: center;
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 860px) {
  .nav-links,
  .nav-cta {
    display: none;
  }

  .burger {
    display: flex;
  }

  .mobile-menu {
    display: flex;
  }
}
</style>
