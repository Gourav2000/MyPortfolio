import React, { Suspense } from 'react'
import { Stars } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import City from './City'
import Zones from './Zones'
import Player from './Player'
import MoveArrows from './MoveArrows'
import { useStore } from '../store'

export default function World() {
  const touch = useStore((s) => s.touch)
  const quality = touch ? 'low' : 'high'

  return (
    <>
      <color attach="background" args={['#05060f']} />
      <fogExp2 attach="fog" args={['#070a18', 0.0105]} />

      <ambientLight intensity={0.35} color="#8090c0" />
      <hemisphereLight args={['#26315e', '#0a0c18', 0.55]} />
      <directionalLight position={[40, 60, -30]} intensity={0.25} color="#7aa0ff" />

      <Stars radius={220} depth={60} count={quality === 'high' ? 2600 : 1200} factor={5} saturation={0.4} fade speed={0.6} />

      <Suspense fallback={null}>
        <City quality={quality} />
        <Zones />
        <Player />
        <MoveArrows />
      </Suspense>

      {quality === 'high' && (
        <EffectComposer disableNormalPass multisampling={0}>
          <Bloom mipmapBlur intensity={1.15} luminanceThreshold={0.32} luminanceSmoothing={0.15} radius={0.72} />
          <Vignette eskil={false} offset={0.18} darkness={0.78} />
        </EffectComposer>
      )}
    </>
  )
}
