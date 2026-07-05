import React, { useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import World from './three/World'
import LoadingScreen from './ui/LoadingScreen'
import HUD from './ui/HUD'
import Panel from './ui/Panel'
import Site2D from './ui/Site2D'
import { useStore } from './store'

function webglSupported() {
  try {
    const c = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')))
  } catch {
    return false
  }
}

export default function App() {
  const mode = useStore((s) => s.mode)
  const phase = useStore((s) => s.phase)
  const touch = useStore((s) => s.touch)
  const webglOk = useMemo(webglSupported, [])

  if (mode === '2d' || !webglOk) return <Site2D webglOk={webglOk} />

  return (
    <div className="app-3d">
      <Canvas
        dpr={[1, touch ? 1.5 : 2]}
        camera={{ fov: 55, near: 0.1, far: 600, position: [0, 5.5, 23] }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <World />
      </Canvas>
      <LoadingScreen />
      {phase === 'playing' && <HUD />}
      <Panel />
    </div>
  )
}
