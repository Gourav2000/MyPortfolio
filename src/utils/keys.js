// Module-singleton keyboard state (read every frame by Player).
export const keys = {
  forward: false,
  back: false,
  left: false,
  right: false,
  run: false,
  interact: false, // one-shot, consumed by HUD/Player
}

const MAP = {
  KeyW: 'forward', ArrowUp: 'forward',
  KeyS: 'back', ArrowDown: 'back',
  KeyA: 'left', ArrowLeft: 'left',
  KeyD: 'right', ArrowRight: 'right',
  ShiftLeft: 'run', ShiftRight: 'run',
}

let interactListeners = []
export function onInteract(fn) {
  interactListeners.push(fn)
  return () => { interactListeners = interactListeners.filter((f) => f !== fn) }
}

if (typeof window !== 'undefined') {
  window.__keys = keys // debug/automation handle
  window.addEventListener('keydown', (e) => {
    // don't hijack typing in the contact form
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return
    const k = MAP[e.code]
    if (k) { keys[k] = true; e.preventDefault() }
    if (e.code === 'KeyE' || e.code === 'Enter') interactListeners.forEach((f) => f('interact'))
    if (e.code === 'Escape') interactListeners.forEach((f) => f('escape'))
    if (e.code === 'KeyM') interactListeners.forEach((f) => f('menu'))
  })
  window.addEventListener('keyup', (e) => {
    const k = MAP[e.code]
    if (k) keys[k] = false
  })
  window.addEventListener('blur', () => {
    Object.keys(keys).forEach((k) => (keys[k] = false))
  })
}
