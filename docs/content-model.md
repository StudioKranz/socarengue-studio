# Content Model

The Socarengue Studio content model should treat stories as networks of transmissions, artifacts, scenes, media, and soundtrack cues.

This document is planning guidance, not an implemented schema.

The first prototype should use local typed seed data only. Supabase is the preferred future persistence layer, so interfaces should be shaped to migrate cleanly to Supabase Auth, Supabase Postgres, Supabase Storage, and Row Level Security later.

The Studio workflow proof follows the same rule. Board columns, task cards, owners, blockers, linked records, and Copilot suggestions are typed local placeholder records. They model creator workflow shape only and must not be treated as canon, private story truth, or a persistence schema.

## Modeling Principles

- Keep creative objects distinct.
- Make relationships explicit.
- Separate private studio notes from public archive text.
- Treat soundtrack cues as structured story metadata.
- Make publication state visible.
- Let one artifact appear in multiple contexts.
- Let one track resonate across multiple scenes or releases.
- Avoid generic `Post` or `Page` objects for story material; choose the most specific narrative object that fits.
- Use Supabase-friendly field shapes: stable string IDs, `projectId` ownership, explicit `status`, explicit `visibility`, and public/private field separation.

## Content Type Glossary

Use these distinctions when implementing the first models:

- **Project:** the top-level Socarengue world or production container.
- **Issue:** a comic chapter, episode, or major installment.
- **Scene:** an ordered narrative beat inside an issue.
- **LoreEntry:** canonical or draft mythology, places, symbols, factions, rules, and world history.
- **Artifact:** a discovered object or transmission with story meaning.
- **MediaAsset:** an image, audio file, video, document, panel, cover, reference, or loop.
- **Track:** a soundtrack item with musical identity and story relationships.
- **SoundtrackCue:** an instruction connecting a track to a scene, artifact, issue, or release moment.
- **Release:** an audience-facing bundle of story material.
- **ReleaseItem:** an ordered item inside a release.
- **Relationship:** an explicit link between two story objects.
- **Note:** private or review-oriented creator commentary, not public archive material by default.

If a type feels like a generic CMS entry, rename it toward the story function it serves.

## Core Objects

### Project

A project is the top-level story world or production container.

Fields:

- `id`
- `title`
- `slug`
- `logline`
- `description`
- `tone`
- `status`
- `createdAt`
- `updatedAt`

Relationships:

- has many issues
- has many characters
- has many lore entries
- has many artifacts
- has many media assets
- has many tracks
- has many releases
- has many members

### Issue

An issue is a comic chapter, episode, or major story installment.

Fields:

- `id`
- `projectId`
- `title`
- `slug`
- `summary`
- `issueNumber`
- `status`
- `visibility`
- `coverMediaId`
- `createdAt`
- `updatedAt`

Relationships:

- belongs to project
- has many scenes
- can appear in releases
- can link tracks and artifacts

### Scene

A scene is a narrative unit inside an issue.

Fields:

- `id`
- `projectId`
- `issueId`
- `title`
- `sequenceIndex`
- `summary`
- `scriptText`
- `visualNotes`
- `emotionalBeat`
- `status`
- `visibility`

Relationships:

- belongs to issue
- links characters
- links artifacts
- links media assets
- has soundtrack cues

### Character

A character is a person, presence, entity, or mythic figure in the story world.

Fields:

- `id`
- `projectId`
- `name`
- `slug`
- `publicDescription`
- `privateNotes`
- `roleInStory`
- `status`
- `visibility`
- `portraitMediaId`

Relationships:

- appears in scenes
- links to lore
- links to artifacts
- links to tracks when relevant

### LoreEntry

A lore entry defines mythology, history, symbols, places, factions, rules, and recurring concepts.

Fields:

- `id`
- `projectId`
- `title`
- `slug`
- `category`
- `publicText`
- `privateNotes`
- `canonicalStatus`
- `visibility`

Categories may include:

- place
- faction
- symbol
- event
- myth
- technology
- ritual
- object
- phrase
- timeline

### Artifact

An artifact is a discovered object, document, signal, image, sound, letter, relic, or record.

Fields:

- `id`
- `projectId`
- `title`
- `slug`
- `classification`
- `publicDescription`
- `privateNotes`
- `transcript`
- `status`
- `visibility`
- `primaryMediaId`

Relationships:

- links media assets
- links scenes
- links issues
- links characters
- links lore entries
- links tracks
- appears in releases

### MediaAsset

A media asset stores metadata about image, audio, video, document, or reference material.

Fields:

- `id`
- `projectId`
- `title`
- `type`
- `source`
- `storagePath`
- `externalUrl`
- `credit`
- `rightsStatus`
- `altText`
- `transcript`
- `durationSeconds`
- `metadata`
- `status`
- `visibility`

Types:

- image
- audio
- video
- document
- reference
- cover
- panel
- loop
- storyboard
- frame
- concept

MVP rule:

- The first implementation slice should render media metadata and placeholders only.
- Actual upload, streaming, AI generation, prompt versioning, and cloud storage are deferred.

### Track

A track represents a soundtrack piece, ambient cue, song, instrumental, or sonic artifact.

Fields:

- `id`
- `projectId`
- `title`
- `slug`
- `artist`
- `durationSeconds`
- `coverMediaId`
- `audioMediaId`
- `externalUrl`
- `moodTags`
- `publicNotes`
- `privateNotes`
- `status`
- `visibility`

Relationships:

- has many soundtrack cues
- links scenes
- links issues
- links artifacts
- appears in releases

### SoundtrackCue

A soundtrack cue defines how music relates to a reading or archive moment.

Fields:

- `id`
- `projectId`
- `trackId`
- `targetType`
- `targetId`
- `cueLabel`
- `sequenceIndex`
- `startAtSeconds`
- `endAtSeconds`
- `instruction`
- `mood`
- `required`

Rules:

- `required` should default to false.
- Cue instructions should be reader-friendly.
- Cues should survive even if playback is external.

### Release

A release is an audience-facing package of story material.

Fields:

- `id`
- `projectId`
- `title`
- `slug`
- `releaseType`
- `summary`
- `status`
- `visibility`
- `publishedAt`
- `coverMediaId`

Release types:

- issue
- chapter
- transmission
- dossier
- soundtrack
- event
- collection

Relationships:

- has ordered release items
- links issues
- links artifacts
- links tracks
- links lore entries

### ReleaseItem

A release item defines the order of objects inside a release.

Fields:

- `id`
- `releaseId`
- `itemType`
- `itemId`
- `sequenceIndex`
- `presentationMode`
- `publicNote`

Presentation modes:

- reader
- artifact
- track
- dossier
- interlude
- note

### Relationship

A relationship is an explicit link between two objects.

Fields:

- `id`
- `projectId`
- `fromType`
- `fromId`
- `toType`
- `toId`
- `relationshipType`
- `publicLabel`
- `privateNote`
- `visibility`

Relationship types may include:

- appears_in
- references
- reveals
- contradicts
- foreshadows
- belongs_to
- derived_from
- soundtracks
- depicts
- unlocks

### Note

A note is internal creator, collaborator, or review commentary.

Fields:

- `id`
- `projectId`
- `targetType`
- `targetId`
- `body`
- `visibility`
- `status`
- `createdBy`
- `createdAt`
- `updatedAt`

Rules:

- Notes are private by default.
- Notes should not appear on public archive or release surfaces unless explicitly converted into public commentary.
- The first implementation slice may model notes in types but should not build commenting behavior.

## Draft Database Planning

Future persistence should use Supabase. Likely Supabase tables:

```txt
profiles
projects
project_members
issues
scenes
characters
lore_entries
artifacts
media_assets
tracks
soundtrack_cues
releases
release_items
relationships
notes
```

Common columns:

- `id`
- `project_id`
- `created_by`
- `created_at`
- `updated_at`
- `status`
- `visibility`

Future Supabase services:

- Supabase Auth for identity
- Supabase Postgres for story, archive, relationship, release, and membership data
- Supabase Storage for media files
- Supabase Row Level Security to protect private lore, unreleased material, and project-scoped collaboration

Do not use Firebase unless explicitly chosen later.

## Publication Model

Publication should be explicit.

An object can be canonical but not public. An object can be public but limited in what it reveals. An object can be private but still linked to public material for creator reference.

The system should prevent accidental exposure of private notes, hidden lore, and unreleased assets.

## Seed Content Strategy

Before Supabase:

- define TypeScript interfaces
- create a small seed project
- include one issue
- include several scenes
- include characters, lore, artifacts, tracks, and cues
- use seed data to validate the reader and studio surfaces
- include at least one private note in seed data to verify it is excluded from public views

This keeps the first app build fast while preserving future database shape.

## First Implementation Data Contract

The first implementation slice should include enough seed data to prove:

- one `Project`
- one `Issue`
- three to five `Scene` records
- two to four `Character` records
- three to six `LoreEntry` records, including at least one place or symbol
- three to six `Artifact` records
- five to ten `MediaAsset` records using placeholder paths or remote-safe placeholders
- two to four `Track` records
- three to six `SoundtrackCue` records
- one `Release`
- ordered `ReleaseItem` records
- several `Relationship` records connecting scenes, artifacts, characters, lore, tracks, and release items

This is the smallest useful graph. It should reveal Socarengue as connected mythology, not as disconnected CMS rows.
