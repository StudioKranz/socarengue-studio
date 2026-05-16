# AGENTS.md

# SOCARENGUE PLATFORM

## Master Development Spec

This repository is for Socarengue Studio, the first internal creator operating system for the broader Socarengue platform.

You are helping architect and build a multimedia storytelling platform called Socarengue.

This is not simply a comic hosting site.

The platform is a hybrid between:

- story universe
- collaborative creative operating system
- mythology archive
- serialized comic platform
- soundtrack-integrated reading experience
- creator workflow system
- audience participation ecosystem

The emotional tone is:

- mythic
- musical
- atmospheric
- emotionally resonant
- mysterious
- cinematic
- artifact-driven
- grounded but spiritually charged

The platform should feel like:

> a discovered archive of emotional transmissions.

## Current Project State

The project is currently in planning mode.

Do not scaffold the app, install dependencies, create package files, create routes, or begin implementation unless explicitly asked.

Current repository work should stay focused on planning, architecture, content modeling, product language, and build sequencing.

## Product North Star

Socarengue is a serialized mythology universe centered around:

- inherited rhythm
- emotional memory
- music as power
- hidden resonance
- legacy
- symbolic objects
- city memory
- emotional frequencies

The platform supports:

- creators
- artists
- writers
- musicians
- collaborators
- audience subscribers

The first product to build is **Socarengue Studio**: an internal creator operating system. The public audience platform comes later, after the creator workflow and story archive are stable.

## Development Philosophy

Prioritize:

1. creator workflow
2. emotional atmosphere
3. audience immersion
4. modular scalability

Do not:

- overengineer early
- optimize for enterprise
- build social media mechanics first
- flatten the world into a generic CMS
- let implementation convenience erase the mythology

Every feature should answer at least one of these questions:

- Does it deepen story?
- Does it improve creator flow?
- Does it make the archive more meaningful?
- Does it preserve emotional atmosphere?
- Can it be built as a module?

## Experience Direction

Avoid:

- corporate feeling UX
- generic SaaS aesthetics
- sterile dashboards
- Patreon clone design
- overexplained interfaces
- ad-heavy comic viewer patterns
- overly futuristic UI
- bright sterile interfaces

Favor:

- immersive storytelling
- cinematic presentation
- artifact textures
- layered discovery
- emotional atmosphere
- beautiful minimalism
- mystery
- resonance
- tactile feeling interfaces
- noir-neon atmosphere
- analog texture

Studio surfaces may be operational, but they should still feel like entering the world of Socarengue itself.

## Core Platform Goals

### 1. Story Development System

Build an internal collaborative environment for:

- script writing
- storyboarding
- visual generation
- mythology tracking
- continuity management
- issue planning
- soundtrack integration
- collaborative commenting

Must eventually support:

- GitHub integration
- version control
- branching story ideas
- revision history
- asset linking
- role-based permissions

### 2. Visual Generation Pipeline

The platform should support:

- AI image generation workflows
- artist collaboration workflows
- storyboard generation
- cinematic frame generation
- issue page layout review
- prompt storage and versioning
- visual continuity references

Future media organization may include:

- `/storyboards`
- `/frames`
- `/issues`
- `/characters`
- `/concepts`
- `/soundtrack`
- `/resonance`
- `/artifacts`

Each visual asset should support:

- tags
- notes
- lore references
- issue references
- emotional tone metadata
- contributor attribution

### 3. Role-Based Collaboration

Support multiple user types.

Core roles:

- **Creator:** full system access.
- **Story Collaborator:** scripts, dialogue, pacing discussions, lore comments.
- **Artist:** visual references, storyboard systems, upload/review tools, continuity tools.
- **Music Collaborator:** soundtrack integration, scene music tagging, embedded audio moments.
- **Marketing/Outreach:** teaser generation, promo scheduling, social assets, issue launch planning.
- **Audience:** tiered access based on subscription level in a later public phase.

Do not begin with enterprise permission complexity. Model the roles clearly first, then implement only the permissions needed for the active phase.

### 4. Audience Experience

The audience should not feel like users of a content platform.

They should feel like:

> participants discovering fragments of a living mythology.

The platform should eventually surface:

- curated artifacts
- soundtrack fragments
- creator notes
- symbolic imagery
- recovered archive materials
- alternate pages
- lore fragments
- visual experiments

Do not expose:

- messy production details
- repetitive AI generations
- low-signal drafts
- generic workflow admin

The audience experience should preserve mystery.

### 5. Music Integration

Music is central to Socarengue.

The reading experience should support:

- embedded music
- scene-synchronized audio
- ambient sound
- soundtrack playlists
- optional emotional audio layers

Audio should feel:

- cinematic
- atmospheric
- emotionally synchronized
- subtle
- immersive

Avoid:

- autoplay chaos
- intrusive media controls
- gimmicky soundtrack behavior

Support:

- per-scene audio triggers
- optional listener mode
- artist attribution
- soundtrack archives

Playback should never be required to understand the story.

### 6. Comic Reader

The comic reading experience should support:

- vertical scrolling
- traditional page layouts
- cinematic transitions
- soundtrack synchronization
- hidden lore interaction
- layered visual reveals

The reader should feel:

- immersive
- premium
- cinematic
- emotionally atmospheric

Avoid clutter and generic comic viewer layouts.

### 7. Physical And Live Event Integration

The platform may eventually support:

- QR codes inside physical comics
- city-specific variants
- live event drops
- collectible editions
- soundtrack-linked pages
- venue-exclusive content

Potential integrations:

- Ovi live shows
- music collaborations
- featured bands
- physical issue distribution

Keep this modular and future-facing. Do not let live/event features complicate the first creator-studio build.

### 8. AI-Assisted Curation

The platform should eventually use AI to:

- surface emotionally resonant artifacts
- recommend audience-safe process materials
- organize mythology
- detect continuity conflicts
- generate summaries
- assist onboarding
- connect related lore

The AI should prioritize:

- emotional density
- symbolic resonance
- mystery
- visual impact
- creator intent

AI should support creative judgment, not replace it.

## Design Language

Visual tone:

- noir neon
- analog texture
- stormlight
- warm gold accents
- deep shadows
- humid atmosphere
- archival feeling
- subtle glitch aesthetics

Typography should feel:

- cinematic
- collectible
- handcrafted
- emotionally textured

The interface should be beautiful and minimal, with enough structure for real work and enough atmosphere to preserve the myth.

## Tech Stack Preferences

Preferred stack:

- Next.js frontend
- TypeScript
- Tailwind CSS
- Supabase as the preferred backend when persistence begins
- Firebase only if explicitly chosen for a specific reason
- GitHub integration
- Vercel deployment
- Cloudflare CDN where useful
- OpenAI APIs
- local asset storage plus cloud sync

Eventual platform needs:

- authentication
- permissions
- media streaming
- markdown/lore editor
- image galleries
- soundtrack integration
- commenting and review systems

Do not add Supabase, Firebase, Vercel, OpenAI APIs, auth, or media storage setup until implementation is explicitly requested.

When persistence is explicitly requested, prefer:

- Supabase Auth
- Supabase Postgres
- Supabase Storage
- Supabase Row Level Security

For the first prototype, keep all data local and typed. Still structure interfaces, IDs, status fields, visibility fields, and query helpers so they can map cleanly to future Supabase tables.

## First Implementation Boundary

The first implementation slice should prove the shape of **Socarengue Studio** without heavy infrastructure.

Build first:

- Next.js, TypeScript, and Tailwind foundation
- typed domain models
- one hardcoded Socarengue seed project
- studio overview
- one issue/release structure
- scene list
- character, lore, artifact, media, track, and cue records from seed data
- visual asset browser from metadata only
- soundtrack cue display without complex playback
- public release/reader path
- archive object detail path

Do not build in the first implementation slice:

- authentication
- live Supabase or Firebase connections
- GitHub syncing
- collaborator invitations
- role enforcement
- comments
- payments or subscriptions
- public social feed
- AI image generation
- automated media processing
- realtime collaboration

## Broader Studio MVP Direction

After the first seed-data prototype proves the story loop, grow toward the internal creator operating system.

Broader Studio MVP goals:

- authentication
- editable studio overview
- issue management
- lore/wiki system
- visual asset browser
- storyboard viewer
- soundtrack attachment system
- collaborator roles
- narrow GitHub sync proof
- markdown editing
- artifact tagging
- curated audience-safe release surface

MVP interpretation:

- The creator workflow comes first.
- The audience surface should be curated and mystery-preserving, not social.
- GitHub syncing begins as a planned integration or narrow proof, not a sprawling version-control system.
- The MVP should already feel emotionally immersive.
- Build only the smallest coherent version of each capability.

## Documentation Map

Read these documents before making any implementation or architectural decisions:

- [README.md](./README.md): project overview, architecture philosophy, and local development
- [docs/platform-spec.md](./docs/platform-spec.md): product architecture and system philosophy
- [docs/design-language.md](./docs/design-language.md): visual, interaction, and sound language
- [docs/content-model.md](./docs/content-model.md): story objects, data classification policy, visibility states, approval states, and spoiler handling
- [docs/domain-strategy.md](./docs/domain-strategy.md): two-domain routing model, middleware behavior, why global redirects are prohibited, and future auth requirements
- [docs/studio-roadmap.md](./docs/studio-roadmap.md): phased Studio development plan — read this before proposing new features
- [docs/studio-collaborator-workflow.md](./docs/studio-collaborator-workflow.md): collaborator experience, story dependencies, archive boundaries, and atmosphere philosophy
- [docs/studio-copilot.md](./docs/studio-copilot.md): Copilot architecture, safe action patterns, privacy rules, and canon protection
- [docs/studio-implementation-brief.md](./docs/studio-implementation-brief.md): active implementation spec for the Studio workflow board
- [docs/artifact-intake-workflow.md](./docs/artifact-intake-workflow.md): full artifact lifecycle from upload through publication
- [docs/roles.md](./docs/roles.md): collaborator roles and permissions philosophy
- [docs/mvp.md](./docs/mvp.md): first shippable scope

## Critical Warnings for Agents

These are the most common ways an agent can make a serious mistake in this project.

**Do not treat placeholder data as canon.**
`src/lib/studio/demo-workflow.ts` contains demo-only workflow records. They are not real story content. Do not extract, expand, or reference them as Socarengue story truth.

**Do not add a global redirect from `/` to `/studio`.**
The host-aware middleware in `src/middleware.ts` rewrites only the root path for `socarengue.studio`. A global redirect would break the public Reader Mode homepage on `socarengue.com`. See `docs/domain-strategy.md`.

**Do not connect the Copilot to external AI APIs.**
The Studio Copilot panel is a deterministic local shell. Do not connect it to OpenAI, Anthropic, Vercel AI SDK, or any other external service without explicit instruction from the project owner.

**Do not commit real unreleased story material.**
Real character arcs, scene reveals, lore depth, unreleased plot events, and private canon must not be committed to any file in this repository without explicit review and authorization.

**Do not add Supabase, auth, media upload, or external APIs until explicitly requested.**
The current prototype is local and deterministic. All persistence, authentication, and external integrations are deferred to later phases. See `docs/studio-roadmap.md`.

**Do not mix placeholder data with real canon records in any file or query.**
Placeholder seed data and real canon data must live in separate modules and must never merge in a query result or component prop.

**Do not expose internal workflow state on public routes.**
Public routes (`socarengue.com`, `/archive`, `/preview/*`) must never surface workflow board data, private notes, review states, draft content, or unapproved artifacts.

## Documentation Standards

Planning docs should:

- define user-facing and creator-facing concepts clearly
- call out MVP boundaries
- identify future modules without pretending they already exist
- distinguish content model planning from database implementation
- preserve the platform tone: mythic, musical, cinematic, analog, noir-neon
- separate internal production mess from audience-safe archive presentation

## Git Workflow

Recommended workflow once implementation begins:

- `main` is the stable branch.
- Feature work happens in short-lived branches named `feature/<module-name>` or `docs/<topic>`.
- Experiments can use `experiment/<idea>`.
- Each PR should describe the story or platform capability it changes.
- Keep commits small and thematic.
- Do not mix app scaffolding, visual design, database schema, and content migration in one PR unless explicitly approved.

## Implementation Guardrails

When implementation begins:

- Build from the content model outward.
- Keep frontend components modular.
- Keep media systems abstract until storage is chosen.
- Prefer typed interfaces before database tables.
- Add Supabase only when explicitly requested, using Supabase Auth, Postgres, Storage, and Row Level Security as the default persistence path.
- Do not introduce Firebase unless the user explicitly chooses it later.
- Add Vercel deployment only when there is something meaningful to preview.
- Treat emotional tone, media sequencing, and archive structure as architectural concerns.
- Keep public mystery separate from private production detail.

## Tone Guardrails

Use words like:

- archive
- transmission
- artifact
- dossier
- signal
- scene
- chapter
- issue
- relic
- mythology
- cue
- sequence
- release
- studio
- resonance
- frequency
- city memory
- inherited rhythm
- recovered material
- symbolic object

Use caution with words like:

- monetization
- funnel
- conversion
- customer success
- enterprise
- content farm
- user generated content
- dashboard
- admin panel
- subscribers

This project can become a creator operating system, but it should never feel like office software wearing a neon skin.
