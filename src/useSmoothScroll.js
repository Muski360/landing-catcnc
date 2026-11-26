import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

const scrollKeys = new Set(['Tab', 'Home', 'End', 'PageUp', 'PageDown', 'ArrowUp', 'ArrowDown', ' '])

export function useSmoothScroll() {
  useEffect(() => {
    if (typeof window.ResizeObserver !== 'function' || typeof window.matchMedia !== 'function') return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let lenis

    function syncPreference() {
      if (reducedMotion.matches) {
        lenis?.destroy()
        lenis = undefined
      } else if (!lenis) {
        lenis = new Lenis({ autoRaf: true, lerp: 0.12 })
      }
    }

    // Give native jumps and focus changes priority over a wheel animation in progress.
    function endWheelScroll() {
      if (lenis?.isScrolling === 'smooth') lenis.scrollTo(window.scrollY, { immediate: true })
    }

    function onClick(event) {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      if (event.target instanceof Element && event.target.closest('a[href^="#"]')) endWheelScroll()
    }

    function onKeyDown(event) {
      if (scrollKeys.has(event.key)) endWheelScroll()
    }

    syncPreference()
    reducedMotion.addEventListener?.('change', syncPreference)
    window.addEventListener('click', onClick)
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('popstate', endWheelScroll)

    return () => {
      reducedMotion.removeEventListener?.('change', syncPreference)
      window.removeEventListener('click', onClick)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('popstate', endWheelScroll)
      lenis?.destroy()
    }
  }, [])
}
