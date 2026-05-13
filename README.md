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

No application scaffold exists yet. This repository currently starts with planning and architecture documentation only.

## Documentation Map

- [AGENTS.md](./AGENTS.md): contributor and agent operating instructions
- [docs/platform-spec.md](./docs/platform-spec.md): product architecture and system philosophy
- [docs/mvp.md](./docs/mvp.md): first shippable scope
- [docs/design-language.md](./docs/design-language.md): visual, interaction, and sound language
- [docs/roles.md](./docs/roles.md): user roles and permissions philosophy
- [docs/content-model.md](./docs/content-model.md): story, archive, media, and database planning
- [docs/roadmap.md](./docs/roadmap.md): modular feature roadmap
- [docs/world/](./docs/world/): mythology, characters, resonance rules, visual symbolism, and soundtrack philosophy

## Proposed Repo Structure

Initial planning structure:

```txt
socarengue-studio/
  README.md
  AGENTS.md
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
```

Future app structure should be added only after the documentation phase is accepted.

Likely future structure:

```txt
socarengue-studio/
  app/
  components/
  content/
  docs/
  lib/
  public/
  styles/
  types/
```

## Current Status

Phase: foundational planning.

Next recommended step: scaffold a minimal Next.js prototype with typed seed content only after these docs are approved.

The first implementation task should be:

- create the Next.js, TypeScript, and Tailwind foundation
- add typed domain models for the MVP objects
- add one hardcoded Socarengue seed project
- render a studio overview and one public release/reader path from seed data
- avoid Supabase connections, auth, GitHub sync, payments, comments, and social mechanics in the first prototype
