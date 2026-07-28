<script setup lang="ts">
// Three.js is ~650 kB — by far the heaviest thing on the page, and purely
// decorative. Mounting the scene only once the browser is idle keeps it out of
// the initial module graph, so the copy paints without waiting on the renderer.
const showScene = ref(false)

onMounted(() => {
  const start = () => {
    showScene.value = true
  }
  if ('requestIdleCallback' in window) {
    requestIdleCallback(start, { timeout: 1500 })
  } else {
    setTimeout(start, 200)
  }
})
</script>

<template>
  <div class="site">
    <LazyThreeScene v-if="showScene" />
    <div class="glow glow-a" aria-hidden="true" />
    <div class="glow glow-b" aria-hidden="true" />
    <TheHeader />
    <main class="site-main">
      <NuxtPage />
    </main>
    <TheFooter />
    <div class="grain" aria-hidden="true" />
  </div>
</template>
