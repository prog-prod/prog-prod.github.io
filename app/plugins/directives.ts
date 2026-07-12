export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    getSSRProps: () => ({}),
    mounted(el: HTMLElement, binding) {
      el.classList.add('reveal')
      if (binding.value) el.style.setProperty('--reveal-delay', `${binding.value}ms`)
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              el.classList.add('is-visible')
              io.disconnect()
            }
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      )
      io.observe(el)
    }
  })

  nuxtApp.vueApp.directive('tilt', {
    getSSRProps: () => ({}),
    mounted(el: HTMLElement) {
      if (window.matchMedia('(hover: none)').matches) return
      el.classList.add('tilt')
      let raf = 0
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width
        const py = (e.clientY - r.top) / r.height
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(() => {
          el.style.setProperty('--rx', `${(0.5 - py) * 7}deg`)
          el.style.setProperty('--ry', `${(px - 0.5) * 9}deg`)
          el.style.setProperty('--mx', `${px * 100}%`)
          el.style.setProperty('--my', `${py * 100}%`)
        })
      }
      const onLeave = () => {
        cancelAnimationFrame(raf)
        el.style.setProperty('--rx', '0deg')
        el.style.setProperty('--ry', '0deg')
      }
      el.addEventListener('mousemove', onMove, { passive: true })
      el.addEventListener('mouseleave', onLeave)
    }
  })
})
