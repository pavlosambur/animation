# Animation playground

Independent motion experiments, one folder each. The goal is as much the working loop as the
effects: Pavlo judges how motion feels, the code exposes everything he might want to change.
Before animating anything, read `~/.claude/motion-taste.md` and start from what it says.

## Layout

- `experiments/NN-name/` — one experiment: `index.html`, `main.ts`, `meta.ts`, `style.css`, plus
  modules for each variant and pure helpers with tests beside them. Numbered so the gallery keeps
  the order they were made in.
- `shared/` — what every experiment uses: `lab.ts` (tweak panel), `motion.ts` (eases, springs,
  reduced motion), `experiment.ts` (meta, DOM lookup), `base.css` (tokens, page, `.btn`).
- `index.html` + `gallery/` — lists every `experiments/*/meta.ts` automatically.

## Every experiment

- Builds its panel with `createLab(meta.title, params)`: playback speed (`S` toggles slow
  motion) and "Copy values" come with it. Every value that shapes the motion lives in `params`
  and has a binding — if it is hard-coded, he cannot tune it.
- Animates through GSAP, not CSS transitions, so slow motion reaches it.
- Starts with around three deliberately different variants of the idea.
- Handles `prefers-reduced-motion` from the first version.
- When he sends values back, they become the defaults in `main.ts`, and the taste file gets the
  entry.

## Commands

- `pnpm dev` — gallery at http://localhost:5173
- `pnpm check` — typecheck and tests; `pnpm build` — production build
