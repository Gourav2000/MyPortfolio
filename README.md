<h1 align="center">
  Gourav Sarkar — 3D Portfolio · Neon District
</h1>

<p align="center">
  An explorable 3D cyberpunk city built from my resume. Walk the streets with a hover-bot,
  visit nine neon districts — Experience Towers, a Publication Archive, a Trophy Plaza,
  a Crystal Garden of skills and more — and open any district to read the details.
</p>

<p align="center">
  Live at <a href="https://gourav2000.github.io/MyPortfolio/" target="_blank">gourav2000.github.io/MyPortfolio</a>
  · Built with <a href="https://docs.pmnd.rs/react-three-fiber">React Three Fiber</a> + <a href="https://threejs.org/">Three.js</a> + <a href="https://vitejs.dev/">Vite</a>
</p>

## Features

- 🏙️ **Open-world neon city** — fully procedural (buildings, window lights, roads, signs: zero downloaded 3D assets)
- 🤖 **Third-person hover-bot** — WASD / arrow keys, `SHIFT` to boost, collisions, follow camera
- 🗂️ **9 interactive districts** — About, Experience, Skills, Projects, Publications, Achievements, Certifications, Education, Contact
- 🗺️ **Minimap + fast travel** (`M`) and `E` to open a district panel
- 📱 **Mobile support** — virtual joystick, reduced effects
- 🖥️ **Classic 2D fallback** — full one-page site for non-WebGL devices (and people in a hurry)
- ✨ Bloom post-processing, procedural ambient audio (toggle), EmailJS contact form

## Controls

| Input | Action |
| --- | --- |
| `W A S D` / arrows | Move |
| `SHIFT` | Boost |
| `E` / `Enter` | Open nearby district |
| `M` | Fast-travel map |
| `ESC` | Close panel / menu |
| Touch | Joystick + VIEW button |

## Development

```bash
npm install
npm run dev      # http://localhost:5173/MyPortfolio/
npm run build    # production build to /dist
npm run deploy   # publish to GitHub Pages
```

## Structure

```
src/
  data/content.js      # every section's content (single source of truth)
  three/               # 3D world: city, zones, player, colliders, effects
  ui/                  # HUD, minimap, panels, loading screen, 2D site
  store.js             # zustand app state
```

## License

MIT
