// Tiny procedural ambient synth — no audio files needed.
let ctx = null
let master = null

export function startAmbient() {
  if (ctx) { master.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 1); return }
  ctx = new (window.AudioContext || window.webkitAudioContext)()
  master = ctx.createGain()
  master.gain.value = 0
  master.connect(ctx.destination)

  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 320
  filter.Q.value = 0.6
  filter.connect(master)

  // slow drifting pad: A2 / E3 / C4, slightly detuned saws
  const freqs = [110, 164.81, 261.63, 110.6]
  freqs.forEach((f, i) => {
    const osc = ctx.createOscillator()
    osc.type = i % 2 ? 'sawtooth' : 'triangle'
    osc.frequency.value = f
    const g = ctx.createGain()
    g.gain.value = i % 2 ? 0.05 : 0.09
    osc.connect(g)
    g.connect(filter)
    osc.start()
  })

  // gentle filter sweep for movement
  const lfo = ctx.createOscillator()
  lfo.frequency.value = 0.05
  const lfoGain = ctx.createGain()
  lfoGain.gain.value = 140
  lfo.connect(lfoGain)
  lfoGain.connect(filter.frequency)
  lfo.start()

  master.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 2)
}

export function stopAmbient() {
  if (!ctx) return
  master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6)
}
