# Socarengue Studio

Socarengue Studio is a multimedia storytelling platform for cinematic comics, mythology archives, soundtrack-integrated reading, collaborative story development, creator operations, and artifact-driven audience experiences.

It is not a comic hosting platform. It is a discovered archive of emotional transmissions: a place where scenes, songs, fragments, dossiers, relics, and reader-facing releases gather into a living mythology.

## Vision

Socarengue Studio exists to help creators build stories that feel atmospheric, mythic, musical, emotionally immersive, cinematic, mysterious, textured, analog, and noir-neon.

The platform should support three intertwined modes:

- **Creation:** a focused workspace for developing worlds, scenes, characters, issues, albums, artifacts, and release plans.
- **Archive:** a mythology system where story materials are preserved as discovered evidence, not just backend records.
- **Experience:** a public reading layer where comics, music, motion, notes, and artifacts are sequenced into emotional encounters.

The product should feel less like a dashboard and more like an archive room with signal bleed: organized enough to work in, strange enough to remember.

## Architecture Philosophy

The system should be modular from the beginning, but not overbuilt.

Core principles:

- **Story first:** every technical structure should serve narrative clarity, emotional pacing, and creator workflow.
- **Artifacts over generic posts:** audience-facing objects should feel like transmissions, records, dossiers, reels, letters, field notes, tracks, fragments, or comic chapters.
- **Composable media:** image, text, sound, animation, metadata, and release state should be modeled so they can combine without becoming tangled.
- **Creator elegance:** the private studio must make complex story development feel calm, tactile, and legible.
- **Public immersion:** the reading experience should foreground mood, rhythm, sequence, and discovery.
- **Supabase-ready infrastructure:** begin with local typed seed data, but shape models and query helpers so they can migrate cleanly to Supabase Auth, Supabase Postgres, Supabase Storage, and Row Level Security.

## Tech Assumptions

Planned stack:

- Next.js
- TypeScript
- Tailwind CSS
- Supabase as the preferred future backend for auth, Postgres, storage, and Row Level Security
- GitHub based workflow
- Vercel deployment later

This repository currently contains the first seed-data prototype. Supabase is not connected yet.

## Documentation Map

- [AGENTS.md](./AGENTS.md): contributor and agent operating instructions
- [docs/platform-spec.md](./docs/platform-spec.md): product architecture and system philosophy
- [docs/mvp.md](./docs/mvp.md): first shippable scope
- [docs/design-language.md](./docs/design-language.md): visual, interaction, and sound language
- [docs/roles.md](./docs/roles.md): user roles and permissions philosophy
- [docs/content-model.md](./docs/content-model.md): story, archive, media, and database planning
- [docs/roadmap.md](./docs/roadmap.md): modular feature roadmap
- [docs/world/](./docs/world/): mythology, characters, resonance rules, visual symbolism, and soundtrack philosophy

## Repo Structure

Current structure:

```txt
socarengue-studio/
  README.md
  AGENTS.md
  package.json
  pnpm-lock.yaml
  next.config.ts
  tailwind.config.ts
  tsconfig.json
  docs/
    platform-spec.md
    mvp.md
    design-language.md
    roles.md
    content-model.md
    roadmap.md
    world/
      README.md
      mythology.md
      characters.md
      resonance-rules.md
      visual-symbolism.md
      soundtrack-philosophy.md
  src/
    app/
      page.tsx
      studio/
      archive/
      reader/
    components/
    lib/
      content/
      seed/
    types/
```

Commit `pnpm-lock.yaml`. Do not commit `node_modules/`, `.next/`, `.vercel/`, `*.tsbuildinfo`, local `.env*` files, or OS files.

## Local Development

Install and run:

```bash
pnpm install
pnpm dev
```

Validate before sharing:

```bash
pnpm typecheck
pnpm build
```

## Reader Mode vs Studio Mode

The public surface is **Reader Mode**. It is designed to be shareable now: cinematic, comic first, and focused on the curated preview at `/preview/issue-one`, with the public archive available at `/archive`.

Primary public navigation should stay simple:

- `Preview` -> `/preview/issue-one`
- `Archive` -> `/archive`
- `Studio` -> `/studio` as a subtle, de-emphasized link

The internal tools are **Studio Mode**. Routes such as `/studio`, `/studio/intake`, and `/studio/issues/the-street-remembers` still work when visited directly, but they are operator-facing and should not be promoted as the primary public experience.

## Clean Preview Routine

Use this routine before showing the prototype to collaborators:

```bash
# Stop any running `pnpm dev` process first.
pnpm typecheck
pnpm build
pnpm dev
```

Then open:

- `http://localhost:3000/`
- `http://localhost:3000/preview/issue-one`
- `http://localhost:3000/archive`

For Studio Mode review, open the internal routes directly:

- `http://localhost:3000/studio`
- `http://localhost:3000/studio/intake`
- `http://localhost:3000/studio/issues/the-street-remembers`

Do not run `next build` while the dev server is active; restart the dev server after a production build so the local preview uses a clean `.next` manifest.

## Collaborator Preview

Ask public readers to review these routes in order:

- `/`: Reader Mode landing and emotional first impression
- `/preview/issue-one`: The Sticks Return
- `/archive`: recovered files and artifact atmosphere

Ask collaborators reviewing Studio Mode to open internal routes directly:

- `/studio`: internal studio overview and signal index
- `/studio/intake`: artifact intake prototype
- `/studio/issues/the-street-remembers`: issue structure, scene sequence, and linked resonance

Preview questions:

- Does it feel like a discovered archive of emotional transmissions?
- Does Reader Mode feel public, cinematic, and comic first?
- Does the studio feel operational without becoming a generic dashboard?
- Do artifacts, scenes, and soundtrack cues feel connected?
- Does any visible copy feel too placeholder-like, corporate, or overexplained?

## GitHub Setup

From the project root:

```bash
git status
git add .gitignore README.md AGENTS.md docs next-env.d.ts next.config.ts package.json pnpm-lock.yaml postcss.config.mjs src tailwind.config.ts tsconfig.json
git commit -m "Scaffold Socarengue Studio prototype"
git branch -M main
git remote add origin git@github.com:<owner>/<repo>.git
git push -u origin main
```

Before committing, confirm `git status --short --ignored` shows generated folders such as `node_modules/`, `.next/`, `.vercel/`, and `*.tsbuildinfo` as ignored rather than staged.

## Vercel Preview Deployment

Use Vercel Git integration for previews:

1. Push the repository to GitHub.
2. In Vercel, create a new project and import the GitHub repository.
3. Keep the framework preset as `Next.js`.
4. Use pnpm. Vercel should detect `pnpm-lock.yaml`; if fields are requested, use:
   - Install Command: `pnpm install`
   - Build Command: `pnpm build`
   - Output Directory: leave default for Next.js
5. Do not add environment variables for this prototype. There is no Supabase client, auth provider, upload service, payment provider, or external API.
6. Deploy from the default branch to create the first preview.
7. Use a non-production branch for follow-up collaborator previews; Vercel will create preview URLs for pull requests and branch pushes.

Do not commit `.vercel/` if you run `vercel link` locally.

## Current Status

Phase: first seed-data prototype.

Current implementation uses local typed seed data only. Supabase remains the preferred future persistence layer, but it is not connected yet.

The prototype currently includes:

- Next.js, TypeScript, and Tailwind foundation
- typed domain models for the MVP objects
- one hardcoded Socarengue seed project
- landing, studio overview, issue detail, archive, and scene reader routes
- soundtrack cue component
- Supabase-ready query helper boundary using local seed data
- no Supabase connection, auth, editing, payments, comments, or external APIs
