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

## Data Classification Policy

Not all records in the system carry the same weight, origin, or audience risk. Mixing placeholder data with real canon, or internal production records with public archive objects, is the most likely source of serious errors in this project.

Every agent, developer, and collaborator must understand these five record classes before writing, reading, or modifying data.

### Placeholder Workflow Data

Placeholder workflow data is fake. It exists only to demonstrate the shape and feel of the Studio workflow.

Location: `src/lib/studio/demo-workflow.ts`

Characteristics:

- Generic task names and descriptions that do not reference real Socarengue story content
- Invented collaborator names or role-placeholder names
- Review states, blockers, and linked records that demonstrate workflow logic only
- Copilot suggestions that demonstrate the Copilot shell behavior
- No real character names, scene reveals, lore depth, or unreleased story events

Rules:

- Never treat placeholder workflow data as canon
- Never extract placeholder task names or descriptions and use them as real story content
- Never commit more detailed or story-specific content to demo workflow files
- Label every placeholder data file with a comment confirming its demo-only status

### Demo-Only Records

Demo-only records are seed data records that demonstrate the shape of story objects without containing real story truth.

These may appear in:

- `src/lib/seed/` or similar seed data files
- Local typed seed content used to validate studio surfaces
- Example characters, scenes, lore entries, or artifacts used during prototype development

Characteristics:

- Real enough to validate UI components and data relationships
- Not real enough to reveal story secrets, character arcs, or plot events
- Should be replaced with real canon records in Phase 2 when real story data migration begins

Rules:

- Do not commit demo-only records to a public repository that contains real canon records in the same namespace
- Do not use demo character names or scene descriptions in marketing or collaborator review materials
- Replace demo records with real canon records deliberately, not by layering on top of them

### Real Canon Records

Real canon records contain accepted world truth. A canon record is story evidence that has been confirmed by the project owner as accurate within the Socarengue mythology.

Canon records include:

- confirmed character identities, histories, and relationships
- confirmed lore entries describing places, symbols, rituals, factions, and events
- confirmed scene content including approved dialogue, emotional beats, and visual direction
- confirmed artifact classifications and public descriptions
- confirmed soundtrack cue relationships and scene associations

Canon state values:

- `candidate_canon`: likely true, under review, not yet locked
- `canon`: accepted and locked world truth
- `public_canon`: accepted, locked, and cleared for audience discovery
- `contradicted`: intentionally conflicts with another account (unreliable narrator, mythologized memory)
- `mythologized`: emotionally true, historically unstable
- `non_canon_process`: process material, not story truth
- `reference_only`: informs creative direction but is not world evidence
- `retired`: formerly canon, no longer active

Rules:

- Only the project owner may promote a record to `canon` or `public_canon`
- `candidate_canon` records must not be used as production dependencies without explicit confirmation
- Real canon records must never be stored in placeholder data files
- Real canon records must not be committed to a public repository without deliberate review of spoiler and rights implications

### Collaborator Notes

Collaborator notes are internal production commentary. They are not story truth. They are not archive material. They are the working conversation of a creative team.

Notes may contain:

- review decisions and reasoning
- pacing and clarity feedback
- revision requests
- story questions and open decisions
- emotional tone observations
- production blockers and context

Rules:

- Notes are private by default
- Notes must never appear in public archive views
- Notes must never be treated as canon evidence
- A note that contains a story insight or lore observation must be explicitly converted by the project owner into a real canon record before it can influence production

### Public Archive Candidates

A public archive candidate is a record that has completed internal review and may be ready for audience discovery. It is not yet public.

An archive candidate has:

- passed all required review lanes (story, music, art, credit, rights, as applicable)
- been given an audience-safe description that reveals enough to be meaningful without overexplaining
- passed spoiler review confirming the timing of its public revelation is deliberate
- been explicitly marked `archive_candidate` by the operator

An archive candidate becomes public only after the operator explicitly promotes it through the publication gate.

---

## Visibility States

Visibility controls who can see a record at any given moment. Visibility is orthogonal to canon state: a canonical record can be private, and a public record may reveal only partial truth.

| Visibility | Who can see it |
|---|---|
| `private` | Operator only or core internal archive |
| `collaborator_review` | Assigned collaborators |
| `music_review` | Music and legacy reviewers |
| `art_review` | Artists and visual reviewers |
| `story_review` | Story collaborators |
| `promo_review` | Marketing and outreach reviewers |
| `public_preview` | Invited preview audience |
| `public` | General audience |
| `hidden` | Deliberately concealed, even from most collaborators |

Rules:

- Public routes must query only records with `visibility: public` or `visibility: public_preview`
- Private notes must never be selected in public queries, even if the parent record is public
- `hidden` records require explicit operator access and should not appear in collaborator review lanes without deliberate assignment

---

## Approval States

Approval state describes the workflow lifecycle of a record as it moves through review.

| State | Meaning |
|---|---|
| `draft` | In progress, not ready for review |
| `needs_input` | Missing a required asset, decision, or collaborator action |
| `in_review` | Assigned to one or more review lanes |
| `approved_internal` | All required internal reviews passed; not yet archive candidate |
| `approved_for_release` | Cleared for publication through the publication gate |
| `rejected` | Reviewed and deliberately not approved; reason should be noted |
| `superseded` | Replaced by a newer version; retained as production history |
| `archived` | Closed, no longer active in production |

Approval state is separate from canon state and visibility state. A record may be `approved_internal` but still `private`, or `canon` but still `draft` in terms of its publication approval.

---

## Spoiler Handling

Spoiler handling is a distinct review gate applied before any archive candidate is approved for public view.

A spoiler risk exists when a record:

- reveals a character's fate, identity, or arc before that reveal appears in a published issue
- describes a plot event that occurs after the most recently published issue
- shows an artifact whose significance has not yet been established in the public story
- references a lore truth that is intended to be discovered gradually by the audience
- contains audio, visual, or textual fragments from unreleased scenes

Spoiler review questions:

- Does this record reveal something the audience is not yet supposed to know?
- Is the timing of this revelation consistent with the publication schedule?
- If published now, does it reduce mystery rather than increase it?
- Can a partial version be published that preserves the audience discovery experience?

Spoiler review must be completed by the project owner before any archive candidate is promoted to `public` or `public_preview`.

---

## Rights Metadata

Rights metadata tracks the usage permissions, attribution requirements, and clearance state for any record that includes material with third-party rights considerations.

Rights-sensitive materials include:

- performer likenesses and photographic portraits
- song titles, lyrics, and musical compositions
- band names, logos, or branded imagery
- venue names and location references tied to specific events
- licensed artwork, photography, or illustrations
- collaborator-owned creative contributions that require attribution

Rights fields on records:

| Field | Purpose |
|---|---|
| `rightsStatus` | Overall rights clearance state |
| `creditRequired` | Whether a credit line is required for use |
| `creditText` | The approved credit string |
| `usageRestrictions` | Specific restrictions on use (no promo, internal only, etc.) |
| `rightsNotes` | Internal notes about the rights situation |
| `likenessClearance` | Whether performer likeness has been approved |
| `permissionType` | The type of permission: licensed, commissioned, fair use, original, etc. |

Rights status values:

- `unreviewed`: rights have not yet been checked
- `needs_credit_check`: attribution requirements unclear
- `needs_likeness_review`: performer or person likeness requires approval
- `needs_music_clearance`: song, lyric, or track clearance required
- `cleared_for_internal`: approved for internal production use
- `cleared_for_release`: approved for public archive and release
- `restricted`: explicitly restricted; must not be used without further review
- `rejected`: not approved for use

Rights metadata must be resolved to `cleared_for_release` before any archive candidate is promoted to public visibility.

---

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
