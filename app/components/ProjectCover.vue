<script setup lang="ts">
const props = defineProps<{
  icon: string
  variant: number
  seed: number
}>()

/* Feather-style stroke icons, 24×24 */
const ICONS: Record<string, string[]> = {
  search: ['M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16z', 'M21 21l-4.35-4.35'],
  cube: [
    'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z',
    'M3.27 6.96L12 12.01l8.73-5.05',
    'M12 22.08V12'
  ],
  calculator: [
    'M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z',
    'M8 6h8',
    'M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h.01M12 19h.01M16 19h.01'
  ],
  play: ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z', 'M10 8l6 4-6 4V8z'],
  users: [
    'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2',
    'M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
    'M23 21v-2a4 4 0 0 0-3-3.87',
    'M16 3.13a4 4 0 0 1 0 7.75'
  ],
  wallet: [
    'M20 7H4a2 2 0 0 1-2-2 2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2z',
    'M2 5v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2',
    'M16 13h.01'
  ],
  layers: ['M12 2L2 7l10 5 10-5-10-5z', 'M2 12l10 5 10-5', 'M2 17l10 5 10-5'],
  trending: ['M23 6l-9.5 9.5-5-5L1 18', 'M17 6h6v6'],
  globe: [
    'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z',
    'M2 12h20',
    'M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z'
  ],
  chart: ['M12 20v-8', 'M18 20V4', 'M6 20v-4'],
  activity: ['M22 12h-4l-3 9L9 3l-3 9H2'],
  bag: [
    'M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z',
    'M3 6h18',
    'M16 10a4 4 0 0 1-8 0'
  ]
}

/* gradient palettes per variant */
const PALETTES = [
  { a: '#8b5cf6', b: '#22d3ee' },
  { a: '#22d3ee', b: '#6366f1' },
  { a: '#a855f7', b: '#38bdf8' }
]

const palette = computed(() => PALETTES[props.variant % PALETTES.length]!)
const paths = computed(() => ICONS[props.icon] ?? ICONS.cube!)
const gid = computed(() => `cover-g-${props.seed}`)

/* deterministic decorative circles per seed */
const circles = computed(() => {
  let s = props.seed * 2654435761
  const rand = () => {
    s = (s ^ (s << 13)) >>> 0
    s = (s ^ (s >> 17)) >>> 0
    s = (s ^ (s << 5)) >>> 0
    return (s >>> 0) / 4294967295
  }
  return Array.from({ length: 3 }, () => ({
    cx: 80 + rand() * 640,
    cy: 60 + rand() * 380,
    r: 60 + rand() * 130
  }))
})
</script>

<template>
  <svg class="cover" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" role="img">
    <defs>
      <linearGradient :id="gid" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" :stop-color="palette.a" />
        <stop offset="1" :stop-color="palette.b" />
      </linearGradient>
      <radialGradient :id="`${gid}-halo`" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" :stop-color="palette.a" stop-opacity="0.35" />
        <stop offset="1" :stop-color="palette.a" stop-opacity="0" />
      </radialGradient>
    </defs>

    <rect width="800" height="500" fill="#0b0b1f" />

    <!-- grid -->
    <g stroke="#ffffff" stroke-opacity="0.045">
      <line v-for="x in 15" :key="`v${x}`" :x1="x * 50" y1="0" :x2="x * 50" y2="500" />
      <line v-for="y in 9" :key="`h${y}`" x1="0" :y1="y * 50" x2="800" :y2="y * 50" />
    </g>

    <!-- decorative blobs -->
    <circle
      v-for="(c, i) in circles"
      :key="i"
      :cx="c.cx"
      :cy="c.cy"
      :r="c.r"
      :fill="`url(#${gid}-halo)`"
    />
    <circle
      v-for="(c, i) in circles"
      :key="`s${i}`"
      :cx="c.cx"
      :cy="c.cy"
      :r="c.r * 0.55"
      fill="none"
      :stroke="`url(#${gid})`"
      stroke-opacity="0.18"
      stroke-width="1.5"
    />

    <!-- icon -->
    <g
      transform="translate(400 250) scale(7.5) translate(-12 -12)"
      fill="none"
      :stroke="`url(#${gid})`"
      stroke-width="1.4"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path v-for="(d, i) in paths" :key="i" :d="d" />
    </g>
  </svg>
</template>

<style scoped>
.cover {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
