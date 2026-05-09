# Persona 5–themed portfolio

Personal portfolio for Charlie Neale (CS student, U of Toronto). Static-exported Next.js site for GitHub Pages, styled after the video game Persona 5: jagged red bolts, per-letter chaos headings, hard offset shadows, parallelogram clip-paths, red crosshair cursor.

## Tech stack

- Next.js `14.2.35`, React 18, TypeScript 5, Tailwind 3.4
- Framer Motion 12 — zoom transitions and spring animations
- Fonts via `@fontsource/*`: Bebas Neue, Oswald (400 + 700), Permanent Marker, Bangers, Rajdhani (500/600/700) — imported in `src/app/layout.tsx:2-9`
- No CSS-in-JS lib; styling = Tailwind utilities + inline `style={}` for chaotic per-letter transforms
- Path alias `@/*` → `src/*` (`tsconfig.json`)

## Build & deploy

- Scripts: `npm run dev | build | start | lint` (`package.json:5-9`)
- `next.config.mjs` sets `output: 'export'` and `images.unoptimized: true` — outputs static HTML to `out/`
- Deploys to a **user GitHub Pages site**. `basePath` is intentionally absent (latest commit `acf8981` removed it). Don't restore it.
- After UI changes: run `npm run build` and verify `out/` renders.

## App structure

- `src/app/layout.tsx` — imports fonts, sets CSS vars (`--font-oswald`, `--font-bebas-neue`, `--font-marker`, `--font-bangers`, `--font-rajdhani`), wraps children in `<InteractiveDotCanvas />` (background) and `<FlashProvider>` (`useFlash()` hook).
- `src/app/page.tsx` — renders only `<ZoomNav />`. Entire UX lives inside that tree.
- `src/app/globals.css` — `html, body { overflow: hidden }` (locked viewport), color tokens, red crosshair cursor, `.p5-scrollbar`, `.bolt-pulse`, `.p5-heading`.

## Components (`src/components/`)

- **`ZoomNav.tsx`** — root orchestrator. Framer Motion 8× scale to a node origin; fades section panels in/out. `useRef` for stale-closure-safe timers.
- **`HomeMap.tsx`** — canvas-rendered jagged red "victory bolt" (blur-pulse layer + sharp layer). Anchors three `<MapNode>` overlays: PROJECTS / EXPERIENCE / CONTACT.
- **`LetterLabel.tsx`** — per-letter chaos primitive. Each letter gets its own rotation (-15° to +15°), skew, color, background, border. Sizes: `NAV`, `PANEL`, `MEDIUM`. **Every prominent heading uses this — never replace with plain text.**
- **`SectionPanel.tsx`** — full-screen scrollable wrapper for Projects/Experience/Contact. Skewed red Back button at top-left, chaos title at top-center.
- **`Projects.tsx`** — 3-col grid of project cards. Reads `content/projects.json`. Pads to 6 with "Coming Soon" placeholders.
- **`Experience.tsx`** — vertical-timeline scaffold. `experienceData = []` currently → renders large rotated "SOON".
- **`Contact.tsx`** — name header (chaos letters) + email (Permanent Marker) + textarea + skewed submit button. Calls `useFlash()` on submit.
- **`FlashProvider.tsx`** — React context exposing `useFlash()`. Renders 200ms red overlay (opacity 0.3, `mix-blend-mode: screen`) for the "all-out attack" feel.
- **`InteractiveDotCanvas.tsx`** — fixed background red dot grid (12px spacing, 2px radius; expands to 5.5px within 120px of cursor). Persistent texture — do not remove.

## Content

- `content/projects.json` — array of `{ title, description, tech[], link, image }`.
- **Adding a project = edit this JSON only.** No code changes. UI pads to 6 slots.

## Persona 5 visual idioms — the rules

- **Colors** (`globals.css:13-18`): `--red: #FF0000`, `--black: #000000`, `--white: #FFFFFF`, `--gold: #FFD700`. Pure primaries only. No greys, no pastels. Note: `tailwind.config.ts` doesn't expose these — use the CSS vars or raw hex.
- **Clip-paths** — parallelogram skews:
  - Section surfaces: `polygon(5% 0, 100% 0, 95% 100%, 0 100%)`
  - Buttons / map nodes: `polygon(10% 0, 100% 0, 90% 100%, 0 100%)`
  - Match these exact angles for new surfaces.
- **Typography**:
  - Oswald 700 → headings (`.p5-heading`)
  - Bebas Neue → card titles
  - Permanent Marker → handwritten accents (email, signature)
  - Bangers → playful labels
  - Rajdhani → body
  - Reference via `var(--font-*)`.
- **Text effects**: hard offset shadows only — `text-shadow: 3px 3px 0px #000` — and `-webkit-text-stroke` for outlines. **Never blur.** See `.p5-heading` (`globals.css:58-64`).
- **Per-letter chaos rule**: every prominent heading uses `<LetterLabel>`, so no two letters share rotation / skew / colors. The chaos is hand-tuned — do not auto-generate or regularize.
- **Animations**: Framer Motion spring (stiffness 100–150, damping 14–18) for snap. Zoom transitions use asymmetric easing — `[0.4, 0, 1, 1]` on entry, `[0, 0, 0.2, 1]` on exit.
- **Cursor**: red SVG crosshair on every interactive element (`globals.css:31-33`). Adding new interactive elements? Use `<a>`, `<button>`, `<input>`, `<textarea>`, or class `.p5-interactive`.
- **Flash on action**: form submits and project link clicks call `useFlash()`.

## Conventions / what NOT to do

- Don't replace `<LetterLabel>` headings with plain text or auto-generated styles.
- Don't introduce colors outside `--red` / `--black` / `--white` / `--gold`.
- Don't add blur, gradients, or rounded corners > 4px.
- Don't remove `<InteractiveDotCanvas />` or the bolt pulse — they're the persistent texture.
- Don't restore `basePath` in `next.config.mjs` (user GH Pages site).
- Don't add `images: { domains: [...] }` — `unoptimized: true` is required for static export.
