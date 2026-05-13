# Platform Specification

Socarengue Studio is a collaborative story development system, mythology archive, soundtrack-integrated reading experience, cinematic comic platform, creator operating system, and artifact-driven audience experience.

Its central product metaphor is not "library" or "feed." It is an archive of emotional transmissions: story materials are discovered, sequenced, annotated, performed, and released.

## Product Vision

The platform should let a creator or creative team build a story world across:

- cinematic comic issues
- scenes and chapters
- music cues and soundtrack albums
- character dossiers
- mythology entries
- visual artifacts
- production notes
- release drops
- audience-facing archive objects

The audience should feel they are entering a charged archive where every page, sound, fragment, and image belongs to a larger signal.

The creator should feel they have a quiet command room for shaping that signal.

## Product Modes

### Studio Mode

Private or collaborator-facing workspace for building the world.

Primary jobs:

- draft scenes and comic structures
- organize characters, locations, factions, symbols, and lore
- attach media references
- plan soundtrack cues
- assemble releases
- track production status
- preserve creative decisions

### Archive Mode

Structured mythology system.

Primary jobs:

- store canonical world material
- connect artifacts to story context
- distinguish public, private, draft, and hidden knowledge
- preserve narrative mystery without losing operational clarity
- make the lore feel discovered rather than filed

### Experience Mode

Audience-facing reading and listening layer.

Primary jobs:

- present comic sequences cinematically
- integrate soundtrack moments without forcing playback
- reveal artifacts around chapters, issues, and releases
- support atmosphere, pacing, and emotional continuity
- make public material feel intentionally transmitted

## Architecture Philosophy

Socarengue Studio should be designed as a modular storytelling system.

The architecture should avoid one massive "content" object. Instead, it should define small expressive objects that can combine into larger experiences.

Key architectural commitments:

- **Typed content primitives:** define scenes, issues, artifacts, tracks, characters, locations, lore entries, and releases as separate concepts.
- **Relationship-first modeling:** links between objects matter as much as the objects themselves.
- **Media as modular attachments:** images, audio, video, documents, and transcripts should attach to story objects without owning the whole model.
- **Status-aware creation:** draft, review, canonical, public, archived, and hidden states should be explicit.
- **Public/private separation:** creator operations and audience experiences should share source material, but not expose private notes by accident.
- **Supabase-ready persistence:** start with TypeScript models and local content conventions, but treat Supabase as the preferred future persistence layer.

## System Layers

### 1. Presentation Layer

Future Next.js routes and components.

Responsibilities:

- studio workspace screens
- public archive screens
- cinematic reader
- release pages
- soundtrack-aware UI
- media viewers

### 2. Domain Layer

TypeScript models, validation, and transformation functions.

Responsibilities:

- content object definitions
- relationship mapping
- publishing rules
- reading sequence assembly
- media cue interpretation
- archive visibility logic

### 3. Persistence Layer

Initially local typed seed data. Future persistence should use Supabase.

Responsibilities:

- Supabase Postgres tables
- Supabase Row Level Security policies
- Supabase Storage buckets for media
- Supabase Auth identity
- collaboration events
- release history

### 4. Media Layer

Abstractions for images, audio, video, documents, transcripts, and derived assets.

Responsibilities:

- media metadata
- attribution
- processing status
- audio cue metadata
- thumbnail and preview strategy
- future storage adapter

### 5. Workflow Layer

Creator operating system features.

Responsibilities:

- production status
- assignment and review
- release planning
- editorial notes
- collaboration
- change history

## Database Planning

Supabase is the preferred backend for Socarengue Studio, but it should not be connected in the first seed-data prototype.

Future persistence should use:

- Supabase Auth
- Supabase Postgres
- Supabase Storage
- Supabase Row Level Security

Firebase should not be introduced unless explicitly chosen later for a specific reason.

Planned database themes:

- projects/worlds
- users and memberships
- roles and permissions
- story units
- archive entries
- media assets
- soundtrack tracks and cues
- releases and publication state
- annotations and notes
- relationship graph

The database should support a story graph rather than a flat CMS.

Early schema design should answer:

- What is canonical versus draft?
- What is public versus private?
- What can be reused across releases?
- How are soundtrack cues attached to reading sequences?
- How can artifacts appear in multiple contexts?
- How do collaborators safely work without exposing hidden lore?

## Media Systems

Media is a first-class part of the platform, not decoration.

Planned media categories:

- comic panels and pages
- covers and key art
- soundtrack tracks
- cue excerpts
- ambient loops
- video fragments
- scanned notes
- letters and documents
- maps
- symbols and sigils
- production references

Media should always carry context:

- title
- type
- creator or source
- rights/usage status
- linked story objects
- publication status
- alt text or transcript where relevant
- emotional or narrative purpose

## Soundtrack Integration Philosophy

Sound should deepen reading, not trap it.

The platform should support soundtrack integration in layers:

- **Suggested listening:** a chapter or artifact recommends a track.
- **Timed cues:** a scene defines optional cue points.
- **Ambient mode:** the reader can enable a background loop or track.
- **Release pairing:** a comic issue and soundtrack release launch together.
- **Archive resonance:** a track appears as an artifact with notes, lyrics, cover art, and narrative meaning.

Rules:

- Playback should never be required to understand the story.
- Audio should have graceful fallback states.
- Reader control matters: play, pause, mute, skip, and continue without audio.
- Soundtrack metadata should be structured before any complex player is built.
- The emotional pacing of music should inform page and scene design.

## User Experience Philosophy

The experience should avoid generic feeds and subscription-wall aesthetics.

Private studio surfaces should feel:

- calm
- tactile
- organized
- editorial
- focused
- capable

Public surfaces should feel:

- cinematic
- mysterious
- intimate
- archival
- musical
- signal-like

The audience should encounter artifacts as part of the story world, not as marketing extras.

## GitHub Workflow

Recommended branch model:

- `main`: stable documentation and build baseline
- `docs/<topic>`: documentation changes
- `feature/<module>`: implementation work once approved
- `experiment/<idea>`: isolated prototypes that may be discarded

Pull requests should identify:

- affected mode: studio, archive, experience, media, workflow, or infrastructure
- user-facing impact
- data model impact
- media handling impact
- follow-up decisions

## Non-Goals For The First Build

- Full creator monetization
- Public marketplace
- Complex realtime collaboration
- Enterprise permissions
- Fully automated media processing
- Native mobile apps
- Social feed mechanics
- Algorithmic discovery

These may become future considerations, but they should not shape the initial architecture.
