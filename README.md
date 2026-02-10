# 💡 Face Light

**Turn your screen into a professional face light for photography, video calls, and content creation.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vite.dev/)

---

## About

**Face Light** is a web-based face lighting tool that transforms your monitor into a configurable light source. It renders CSS-based light effects over a black background, giving you precise control over color, intensity, softness, and light style — all from your browser.

**Use cases:**

- 📸 Photography lighting
- 📹 Video calls & conferencing
- 🎬 Content creation & streaming
- 🖥️ General-purpose screen lighting

---

## Features

- 🎨 **Color Picker** — Full HSL color picker with hex input and 7 preset swatches (White, Warm White, Cool White, Soft Yellow, Soft Blue, Soft Pink, Soft Green)
- 🔆 **Intensity Control** — 0–100% brightness slider
- 🌫️ **Softness Control** — 0–100% softness slider (per-style interpretation)
- 💡 **Light On/Off Toggle** — Quick power button
- 🖥️ **Fullscreen Mode** — Native Fullscreen API for maximum light output
- 🫥 **Auto-Hide Panel** — Control panel auto-hides after 3 seconds of inactivity in fullscreen
- 💾 **Settings Persistence** — All settings saved to `localStorage` automatically
- 🎨 **Glass-Morphism UI** — Dark glass-morphism aesthetic control panel
- ⌨️ **Keyboard Shortcuts** — Quick access to common actions
- 🧩 **Extensible Style System** — Add new light styles via a self-registration pattern

---

## Light Styles

Face Light ships with **6 built-in light styles**:

| #   | Style           | Category | Description                                                        | Options                                                                                       |
| --- | --------------- | -------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| 1   | **Full Window** | Fill     | Fills the entire viewport with a solid color. No softness support. | —                                                                                             |
| 2   | **Edge Light**  | Edge     | Glowing light strips along viewport edges.                         | Edge selection (All / Vertical / Horizontal / Top / Bottom / Left / Right), Thickness (5–40%) |
| 3   | **Ring Light**  | Shape    | Centered circular ring with glow.                                  | Size (20–90%), Thickness (2–30%)                                                              |
| 4   | **Spotlight**   | Effect   | Radial gradient spotlight at a configurable position.              | Size (20–100%), Horizontal Position (0–100%), Vertical Position (0–100%)                      |
| 5   | **Split Light** | Effect   | Viewport divided into two halves with independent intensity.       | Orientation (Vertical / Horizontal), Split Position (10–90%), Light Both Halves toggle        |
| 6   | **Corner Glow** | Effect   | Radial gradient glows at selected corners.                         | Corner selection (All / Top / Bottom / Diagonal TL+BR / Diagonal TR+BL), Size (15–60%)        |

---

## ⌨️ Keyboard Shortcuts

| Key     | Action                          |
| ------- | ------------------------------- |
| `F`     | Toggle fullscreen               |
| `Space` | Toggle light on/off             |
| `[`     | Decrease intensity by 5%        |
| `]`     | Increase intensity by 5%        |
| `H`     | Toggle control panel visibility |

---

## Getting Started

```bash
git clone https://github.com/Guliveer/face-light.git
cd face-light
npm install
npm run dev
```

### Available Scripts

| Script            | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

---

## Tech Stack

| Technology     | Purpose                                                              |
| -------------- | -------------------------------------------------------------------- |
| React 19       | UI framework                                                         |
| TypeScript     | Type safety                                                          |
| Vite 7         | Build tool & dev server                                              |
| Tailwind CSS 4 | Utility-first styling                                                |
| Zustand        | State management with persistence                                    |
| Radix UI       | Accessible UI primitives (Slider, ToggleGroup, Collapsible, Tooltip) |
| react-colorful | Color picker                                                         |
| lucide-react   | Icons                                                                |

---

## Project Structure

```
face-light/
├── src/
│   ├── components/     # UI components (ControlPanel, LightLayer)
│   ├── hooks/          # Custom hooks (fullscreen, keyboard, auto-hide)
│   ├── lib/            # Utilities (color conversion, style registry)
│   ├── store/          # Zustand store with persistence
│   ├── styles/         # Light style definitions (self-registering)
│   ├── types/          # TypeScript type definitions
│   └── App.tsx         # Root component
├── plans/              # Architecture documentation
└── index.html          # Entry HTML with SEO meta tags
```

---

## Adding New Light Styles

The style system is designed for easy extensibility. No modifications to existing UI components are required — new styles are automatically discovered through the registry.

1. **Create a new file** in [`src/styles/`](src/styles/)
2. **Implement a renderer component** that accepts [`LightRendererProps`](src/types/index.ts) (`color`, `intensity`, `softness`, `options`)
3. **Define a `LightStyleDefinition`** with `id`, `name`, `icon`, `category`, `options`, and `renderer`
4. **Call `registerLightStyle()`** at module scope to register the style
5. **Import the file** in [`src/styles/index.ts`](src/styles/index.ts)
6. _(Optional)_ Add the icon to the `iconMap` in [`StyleSelector.tsx`](src/components/ControlPanel/StyleSelector.tsx)

The UI automatically picks up registered styles — no other files need modification.

---

## License

MIT License © [Oliwer Pawelski (Guliveer)](https://github.com/Guliveer)

See [LICENSE](LICENSE) for details.
