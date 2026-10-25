# Animation playground

Small motion experiments, one folder each: buttons, page transitions, micro-interactions, and
later Three.js. Every experiment has a live tweak panel, so timing and easing are tuned by eye
rather than guessed.

**Live:** https://pavlosambur.github.io/animation/

## Run it

```sh
pnpm install
pnpm dev
```

Open http://localhost:5173. On an experiment page, press `S` for slow motion, tune the panel,
and use "Copy values" to take the result with you.

## Layout

- `experiments/NN-name/` — one experiment per folder; its `meta.ts` puts it in the gallery.
- `shared/` — the tweak panel, eases and springs, base styles.
- `gallery/` — the index page.

## Workflow

`main` changes only through pull requests: one branch per experiment (`exp/NN-name`), CI green,
squash-merged, so `main` reads as one commit per experiment. Every merge redeploys the site.

`pnpm check` runs the type checker and tests; `pnpm build` builds the site.
