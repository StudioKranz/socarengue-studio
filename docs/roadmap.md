# Roadmap

Socarengue Studio should grow in modules. Each module should prove a specific creative capability before the platform expands.

## Phase 0: Foundation

Goal: define the platform before building.

Deliverables:

- README
- agent instructions
- platform specification
- MVP plan
- design language
- role model
- content model
- roadmap

Status: current phase.

## Phase 1: Static Prototype

Goal: prove the emotional and structural experience without infrastructure weight.

Features:

- Next.js app scaffold
- TypeScript domain models
- Tailwind design foundation
- one seed project
- studio overview
- archive object pages
- release page
- cinematic reader prototype
- soundtrack cue display without complex playback

No live Supabase connection yet, but the models and query helpers should be Supabase friendly.

Acceptance criteria:

- Runs locally from seed data only.
- Has one studio overview and one public release/reader path.
- Shows connected issue, scene, character, lore, artifact, media, track, and cue data.
- Includes one archive artifact detail surface.
- Does not include auth, live Supabase setup, Firebase, GitHub sync, comments, payments, or social feed mechanics.
- Feels like a Socarengue archive transmission, not a generic SaaS dashboard.

## Phase 2: Creator Studio MVP

Goal: make the private creator workflow usable.

Features:

- editable studio overview
- issue and scene editing
- character dossier editing
- lore entry editing
- artifact editing
- media asset metadata editing
- soundtrack track and cue editing
- release assembly
- preview mode
- markdown editing
- artifact tagging
- basic role-aware navigation if auth exists

Data may still be seed/local, but any move to persistence should prefer Supabase rather than a custom or Firebase path.

Acceptance criteria:

- Creator can edit the core story objects needed for one issue/release.
- Public-safe preview excludes private notes and unreleased lore.
- Visual assets and soundtrack cues remain connected to scenes, artifacts, and releases.
- Collaboration features are limited to the smallest useful role/review behavior.

## Phase 3: Supabase Persistence

Goal: move from prototype content to real project storage.

Features:

- Supabase project setup
- Supabase Auth
- Postgres schema
- Supabase Storage for media assets
- project membership
- row-level security
- media metadata tables
- release tables
- relationship graph table
- storage buckets for media assets

Key concern: protect private lore and unreleased material.

Firebase should remain out of scope unless explicitly chosen later.

## Phase 4: Public Archive Experience

Goal: make audience-facing discovery feel distinct and memorable.

Features:

- public release pages
- public archive pages
- artifact browsing
- issue/chapter reader
- track pages
- related transmission links
- public/private field separation
- SEO and share previews

This phase should still avoid social feed mechanics.

## Phase 5: Soundtrack Integration

Goal: make music a first-class narrative layer.

Features:

- audio player component
- cue-aware reader controls
- track metadata pages
- ambient mode
- external audio fallback
- transcript and accessibility handling
- soundtrack release bundles

Playback should remain optional.

## Phase 6: Collaboration Layer

Goal: support small creative teams.

Features:

- collaborator roles
- comments
- review status
- assignments
- change history
- invite flow
- reviewer previews

Keep collaboration story-specific. Avoid becoming generic task management.

## Phase 7: Release Operations

Goal: help creators prepare launches without turning the product into marketing software.

Features:

- release checklist
- scheduled publishing
- release notes
- bundle assembly
- preview links
- release history
- version snapshots

## Phase 8: Advanced Cinematic Systems

Goal: deepen the audience experience after the foundation is stable.

Potential features:

- panel-by-panel reading
- motion transitions
- timed interludes
- synchronized cue points
- layered artifact reveals
- map and timeline experiences
- unlockable archive sequences
- immersive collection pages

These should be introduced carefully, with accessibility and performance in mind.

## Phase 9: Creator Operating System Expansion

Goal: expand creator workflow only after the core platform proves useful.

Potential features:

- production boards
- asset review queues
- music supervision workspace
- script-to-scene planning
- exportable pitch packets
- grant/deck material assembly
- internal style bible
- rights and credit tracking

## Phase 10: Optional Audience Accounts

Goal: add accounts only if they create meaningful audience value.

Potential features:

- saved releases
- listening preferences
- reading progress
- private invitations
- collector-style artifact shelves

Avoid building a generic follower economy by default.

## Long-Term Possibilities

- multi-project creator workspace
- public creator profiles
- paid releases or memberships
- limited edition digital artifacts
- live listening events
- soundtrack drops
- collaborative world bible
- API for archive objects
- native mobile companion

These should remain future possibilities, not MVP obligations.

## Roadmap Rule

Every future feature should answer:

- Does it deepen story?
- Does it improve creator flow?
- Does it make the archive more meaningful?
- Does it preserve the emotional tone?
- Can it be built as a module?

If the answer is no, defer it.
