<script setup lang="ts">
import * as THREE from 'three'

const canvasRef = ref<HTMLCanvasElement | null>(null)

const NOISE_GLSL = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
`

const DISPLACE_GLSL = /* glsl */ `
float displacement(vec3 n, float t) {
  float d = snoise(n * 1.35 + t * 0.35) * 0.5;
  d += snoise(n * 3.1 - t * 0.22) * 0.22;
  return d;
}
`

const BLOB_VERT = /* glsl */ `
uniform float uTime;
varying vec3 vNormal;
varying vec3 vViewDir;
varying float vDisp;
${NOISE_GLSL}
${DISPLACE_GLSL}

void main() {
  float disp = displacement(normal, uTime);
  vec3 displaced = position + normal * disp;
  vDisp = disp;
  vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
  vNormal = normalize(normalMatrix * normal);
  vViewDir = normalize(-mvPosition.xyz);
  gl_Position = projectionMatrix * mvPosition;
}
`

const BLOB_FRAG = /* glsl */ `
uniform float uOpacity;
varying vec3 vNormal;
varying vec3 vViewDir;
varying float vDisp;

void main() {
  vec3 violet = vec3(0.545, 0.361, 0.965);
  vec3 cyan = vec3(0.133, 0.827, 0.933);
  vec3 base = vec3(0.028, 0.028, 0.085);

  float fres = pow(1.0 - max(dot(normalize(vNormal), normalize(vViewDir)), 0.0), 2.1);
  float mixv = smoothstep(-0.55, 0.65, vDisp);
  vec3 rim = mix(violet, cyan, mixv);

  vec3 color = base + rim * fres * 1.45 + rim * 0.06 + rim * max(vDisp, 0.0) * 0.18;
  gl_FragColor = vec4(color, uOpacity);
}
`

const HALO_VERT = /* glsl */ `
uniform float uTime;
uniform float uPixelRatio;
varying float vDisp;
${NOISE_GLSL}
${DISPLACE_GLSL}

void main() {
  float disp = displacement(normal, uTime);
  vec3 displaced = position * 1.04 + normal * disp;
  vDisp = disp;
  vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
  gl_PointSize = uPixelRatio * (26.0 / -mvPosition.z) * (0.8 + max(disp, 0.0));
  gl_Position = projectionMatrix * mvPosition;
}
`

const HALO_FRAG = /* glsl */ `
uniform float uOpacity;
varying float vDisp;

void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float a = smoothstep(0.5, 0.0, d) * 0.5 * uOpacity;
  vec3 violet = vec3(0.545, 0.361, 0.965);
  vec3 cyan = vec3(0.133, 0.827, 0.933);
  vec3 color = mix(violet, cyan, smoothstep(-0.5, 0.6, vDisp));
  gl_FragColor = vec4(color, a);
}
`

let disposeScene: (() => void) | undefined

onMounted(() => {
  // .client components finish rendering after mount — wait a tick for the template ref
  nextTick(() => {
    disposeScene = initScene()
  })
})

onBeforeUnmount(() => {
  disposeScene?.()
})

function initScene() {
  const canvas = canvasRef.value
  if (!canvas) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const pixelRatio = Math.min(window.devicePixelRatio, 2)

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setPixelRatio(pixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  )
  camera.position.set(0, 0, 9)

  /* ---- morphing blob + particle halo ---- */
  const blobGroup = new THREE.Group()
  scene.add(blobGroup)

  const blobMat = new THREE.ShaderMaterial({
    vertexShader: BLOB_VERT,
    fragmentShader: BLOB_FRAG,
    transparent: true,
    uniforms: {
      uTime: { value: 0 },
      uOpacity: { value: 1 }
    }
  })
  const blob = new THREE.Mesh(new THREE.IcosahedronGeometry(1.9, 48), blobMat)
  blobGroup.add(blob)

  const haloMat = new THREE.ShaderMaterial({
    vertexShader: HALO_VERT,
    fragmentShader: HALO_FRAG,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uOpacity: { value: 1 },
      uPixelRatio: { value: pixelRatio }
    }
  })
  const halo = new THREE.Points(new THREE.IcosahedronGeometry(1.9, 24), haloMat)
  blobGroup.add(halo)

  /* ---- starfield ---- */
  const STAR_COUNT = 1400
  const starPositions = new Float32Array(STAR_COUNT * 3)
  const starColors = new Float32Array(STAR_COUNT * 3)
  const violet = new THREE.Color(0x8b5cf6)
  const cyan = new THREE.Color(0x22d3ee)
  const white = new THREE.Color(0xdadff0)
  for (let i = 0; i < STAR_COUNT; i++) {
    const r = 14 + Math.random() * 26
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    starPositions[i * 3 + 2] = r * Math.cos(phi) - 10
    const roll = Math.random()
    const c = roll < 0.6 ? white : roll < 0.82 ? violet : cyan
    starColors[i * 3] = c.r
    starColors[i * 3 + 1] = c.g
    starColors[i * 3 + 2] = c.b
  }
  const starGeo = new THREE.BufferGeometry()
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
  starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3))
  const starMat = new THREE.PointsMaterial({
    size: 0.06,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
  })
  const stars = new THREE.Points(starGeo, starMat)
  scene.add(stars)

  /* ---- responsive placement ---- */
  const applyLayout = () => {
    const w = window.innerWidth
    if (w < 768) {
      blobGroup.position.x = 0
      blobGroup.position.z = -2.5
      blobGroup.scale.setScalar(0.72)
    } else {
      blobGroup.position.x = 2.5
      blobGroup.position.z = 0
      blobGroup.scale.setScalar(1)
    }
  }
  applyLayout()

  /* ---- interaction state ---- */
  const mouse = { x: 0, y: 0 }
  let scrollY = window.scrollY

  const onMouseMove = (e: MouseEvent) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.y = (e.clientY / window.innerHeight) * 2 - 1
  }

  const onScroll = () => {
    scrollY = window.scrollY
    if (reduced) renderOnce()
  }

  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    applyLayout()
    if (reduced) renderOnce()
  }

  const clock = new THREE.Clock()
  let raf = 0
  let running = true

  const update = () => {
    const t = clock.getElapsedTime()
    blobMat.uniforms.uTime!.value = t
    haloMat.uniforms.uTime!.value = t

    blob.rotation.y = t * 0.12
    blob.rotation.z = t * 0.05
    halo.rotation.copy(blob.rotation)
    stars.rotation.y = t * 0.008

    // scroll: blob drifts up and fades to an ambient presence
    const vh = window.innerHeight
    blobGroup.position.y = scrollY * 0.0016
    stars.position.y = scrollY * 0.0006
    const fade = 1 - Math.min(scrollY / (vh * 1.35), 1)
    const isMobile = window.innerWidth < 768
    blobMat.uniforms.uOpacity!.value = (isMobile ? 0.35 : 1) * (0.22 + fade * 0.78)
    haloMat.uniforms.uOpacity!.value = (isMobile ? 0.45 : 1) * (0.25 + fade * 0.75)

    // mouse parallax
    camera.position.x += (mouse.x * 0.55 - camera.position.x) * 0.035
    camera.position.y += (-mouse.y * 0.35 - camera.position.y) * 0.035
    camera.lookAt(0, 0, 0)

    renderer.render(scene, camera)
  }

  const tick = () => {
    if (!running) return
    update()
    raf = requestAnimationFrame(tick)
  }

  const renderOnce = () => {
    blobMat.uniforms.uTime!.value = 1.5
    haloMat.uniforms.uTime!.value = 1.5
    blobGroup.position.y = scrollY * 0.0016
    renderer.render(scene, camera)
  }

  const onVisibility = () => {
    if (document.hidden) {
      running = false
      cancelAnimationFrame(raf)
    } else if (!reduced) {
      running = true
      clock.start()
      tick()
    }
  }

  window.addEventListener('resize', onResize)
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('visibilitychange', onVisibility)

  if (reduced) {
    renderOnce()
  } else {
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    tick()
  }

  return () => {
    running = false
    cancelAnimationFrame(raf)
    window.removeEventListener('resize', onResize)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('visibilitychange', onVisibility)
    blob.geometry.dispose()
    halo.geometry.dispose()
    starGeo.dispose()
    blobMat.dispose()
    haloMat.dispose()
    starMat.dispose()
    renderer.dispose()
  }
}
</script>

<template>
  <canvas ref="canvasRef" class="scene-canvas" aria-hidden="true" />
</template>

<style scoped>
.scene-canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}
</style>
