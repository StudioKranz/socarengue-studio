# MVP

The MVP should prove Socarengue Studio as a cinematic story archive and creator workspace, not as a full publishing empire.

The first version should answer one question:

Can a creator assemble a mythic comic release with connected lore, artifacts, visual material, and soundtrack cues, then present it as an immersive archive experience?

## Final MVP Boundary

There are two intentionally separate milestones:

- **First implementation slice:** a non-authenticated seed-data prototype that proves the story loop and archive feeling.
- **Studio MVP:** the later editable internal creator operating system with auth, roles, persistence, review, and sync features.

Unless a task explicitly says otherwise, "first build" means the first implementation slice, not the full Studio MVP.

## MVP Principles

- Build the smallest complete story loop.
- Make the archive concept visible immediately.
- Treat music as metadata and experience, not just an external link.
- Keep creator workflow elegant and understandable.
- Avoid monetization, feeds, and social mechanics.
- Avoid heavy collaboration until the core content model works.

## MVP User Stories

### Creator

As a creator, I can:

- define a story world or project
- create an issue or chapter
- add scenes or sequence notes
- add character and lore entries
- attach image and audio metadata
- define soundtrack cues for a reading sequence
- assemble a public release
- preview the release experience

### Collaborator

As a future collaborator, I can:

- view assigned story materials
- add notes or edits
- inspect linked lore and artifacts
- understand what is draft, canonical, private, or public

For the first implementation slice, collaborator behavior is modeled in types and documentation only. Auth-based permissions, assignments, comments, and invitations are deferred.

### Audience

As a reader/listener, I can:

- open a public release
- read a cinematic comic sequence
- see linked archive artifacts
- optionally play or follow soundtrack cues
- move through the story without needing an account

## MVP Scope

### Include In First Implementation Slice

- Project/world overview
- Issue or chapter structure
- Scene list
- Character dossiers
- Lore/archive entries
- Artifact entries
- Media asset records
- Soundtrack track records
- Soundtrack cue metadata
- Public release page
- Cinematic reader prototype
- Manual publishing state
- Seed data only
- Read-only studio overview
- Read-only archive/detail surfaces

### Defer From First Implementation Slice

- Authentication
- live Supabase persistence
- Firebase persistence
- Role enforcement
- GitHub syncing
- Markdown editing
- Comments and review threads
- Editable CMS behavior
- Payments
- Subscriptions
- Curated audience feed
- Public comments
- Social following
- Advanced analytics
- Realtime multiplayer editing
- Complex permissions
- Automated audio synchronization
- Automated image processing
- Native apps
- Marketplace or multi-creator discovery

### Include In Later Studio MVP

- Authentication
- Editable studio overview
- Issue and scene management
- Lore/wiki editing
- Visual asset browser
- Storyboard viewer
- Soundtrack attachment editing
- Artifact tagging
- Collaborator role model
- Markdown editing
- Narrow GitHub sync proof if the content workflow needs it

## First Information Architecture

Future routes may look like:

```txt
/
/studio
/studio/projects
/studio/projects/[projectId]
/studio/projects/[projectId]/issues
/studio/projects/[projectId]/archive
/studio/projects/[projectId]/media
/studio/projects/[projectId]/soundtrack
/releases/[releaseSlug]
/archive/[artifactSlug]
```

These routes are planning targets only. They should not be created until app implementation begins.

## MVP Content Objects

Minimum content objects:

- `Project`
- `Issue`
- `Scene`
- `Character`
- `LoreEntry`
- `Artifact`
- `MediaAsset`
- `Track`
- `SoundtrackCue`
- `Release`

Optional content objects that should remain metadata-only in the first implementation slice:

- `ReleaseItem`
- `Relationship`
- `Note`

Do not introduce a generic `Post` model. Audience-facing material should be modeled as releases, artifacts, tracks, dossiers, scenes, or transmissions.

## MVP Database Planning

The MVP begins with TypeScript interfaces and seed content only. Supabase is the preferred future persistence layer, but the first prototype should not connect to it.

Future persistence should use Supabase Auth, Supabase Postgres, Supabase Storage, and Row Level Security.

The TypeScript interfaces should remain Supabase friendly:

- stable string IDs
- `projectId` ownership fields
- explicit `visibility` fields
- explicit `status` fields
- public/private text separation
- relationship records instead of generic post bodies

When Supabase is connected, likely tables include:

- `projects`
- `project_members`
- `issues`
- `scenes`
- `characters`
- `lore_entries`
- `artifacts`
- `media_assets`
- `tracks`
- `soundtrack_cues`
- `releases`
- `release_items`
- `relationships`
- `notes`

Initial relational priorities:

- project owns story objects
- issue contains scenes
- release contains ordered release items
- media assets attach to many content objects
- soundtrack cues attach to scenes, pages, or release moments
- artifacts can link to lore, characters, scenes, issues, tracks, and releases

## MVP Media System

The MVP should support media metadata before complex storage.

For each media asset:

- title
- type
- source URL or local path placeholder
- creator/source credit
- rights status
- alt text or transcript
- linked content object IDs
- publication status

Supported initial types:

- image
- audio
- video
- document
- reference

## MVP Soundtrack System

The first soundtrack system should be simple and expressive.

Support:

- track title
- artist/creator
- duration
- cover image
- external URL or placeholder
- mood tags
- linked issue, scene, artifact, or release
- cue label
- cue timing note
- reader-facing instruction

Example cue language:

- "Begin with Track 01 before opening the chapter."
- "Let the loop continue through Scene 03."
- "Optional: play the instrumental version for the artifact reveal."

## MVP Success Criteria

The first implementation slice succeeds if:

- the creator can assemble one coherent multimedia release
- the public reader can experience story, archive, and soundtrack as one system
- content objects are typed and reusable
- future Supabase tables are obvious from the models
- the platform feels specific to Socarengue Studio, not like a generic CMS
- the studio surface feels operational without becoming a sterile dashboard
- no private notes appear in public seed-data views
- audio cues are optional and understandable without playback
- the reader can move from release to artifact and back without losing context
- visual assets are treated as story evidence, not as a generic gallery
- the first build can run without network services, auth providers, or database setup

## Acceptance Criteria

The first implementation slice is acceptable when:

- A developer can run the app locally with seed data only.
- The home/studio view clearly identifies the Socarengue project and current issue/release.
- The studio overview shows issue, scenes, characters, lore, artifacts, media assets, tracks, and cues as connected story material.
- The release/reader path presents a cinematic sequence with at least one artifact link and one soundtrack cue.
- The archive detail path presents an artifact as a discovered transmission with public-safe text only.
- The data model separates `publicDescription` or public notes from private creator notes.
- The UI avoids generic SaaS patterns as the dominant impression: no marketing landing page, no subscription-first framing, no generic feed.
- The implementation contains no live Supabase client, auth, payment, comment, Firebase, or GitHub sync setup.

## Suggested First Build Step

After these docs are approved, build a non-authenticated Next.js prototype with:

- one hardcoded project
- one issue/release
- a cinematic reader route
- a small studio overview route
- typed seed data
- no database yet
- no payment or social systems

Exact first implementation task:

Create the Next.js + TypeScript + Tailwind foundation and add typed seed-data rendering for one Socarengue project, one issue/release, one studio overview, one cinematic reader route, and one artifact detail route.
