# Artifact Intake Workflow

Socarengue Studio should treat intake as the cataloging of recovered transmissions, not as generic file upload management.

An artifact can be a comic page, cover, script fragment, music note, visual reference, live show document, collaborator comment, lyric sheet, promo image, page assignment, or final art file. What makes it an artifact is not the file type. It is that the material carries story, resonance, production meaning, or public-facing myth.

This document is planning guidance only. Do not implement Supabase, auth, uploads, editing, payments, or external APIs for the first prototype.

## Intake Principle

Every incoming object should answer:

- What is this transmission?
- Who brought it into the archive?
- What story, music, character, place, or live moment does it touch?
- Is it private process, review material, canonical world evidence, or public artifact?
- Who needs to read, hear, approve, or protect it?
- What should remain mysterious?

The workflow should preserve creative atmosphere while giving collaborators enough structure to make decisions.

## MVP Intake Using Local Seed Data

For the current seed-data prototype:

- represent artifacts as typed local records
- store local media references under `public/artifacts/` only when a committed preview asset is appropriate
- keep private notes in seed data but do not render them publicly
- model review/canon/visibility states as fields
- simulate linked scenes, lore, tracks, issues, characters, and releases through IDs
- do not build upload UI
- do not build edit forms
- do not connect Supabase
- do not enforce roles

The MVP should prove the feeling of intake: recovered materials enter the archive, gain metadata, connect to story resonance, and become reviewable without becoming a CMS grid.

## Josh Intake

Josh acts as the primary archive operator and story owner.

Josh may add:

- real comic pages
- covers
- issue artwork
- page layouts
- story documents
- scripts
- mythology notes
- music notes
- collaborator materials
- live show references
- marketing fragments
- physical comic scans
- QR-linked concepts

When Josh adds material, the intake record should capture:

- artifact title
- artifact type
- source or origin
- issue or scene connection
- lore connection
- character connection
- music or cue connection
- collaborator connection
- intended audience state
- review request
- private operator note
- public-facing description if ready

Josh should be able to mark whether the material is:

- raw signal
- reviewable fragment
- canonical evidence
- release candidate
- public transmission

Josh's private notes should never leak into public archive surfaces.

## Ovi Review

Ovi reviews materials through legacy, music, marketing, and live show relevance.

Ovi should review:

- music resonance
- song references
- live show relevance
- stage imagery
- performer likeness
- promo usefulness
- city or venue associations
- legacy sensitivity
- whether the material feels emotionally true to the music

Ovi review questions:

- Does this object carry the right rhythm?
- Does it honor the musical legacy it touches?
- Can this connect to a live show, featured band, or soundtrack moment?
- Is the likeness, credit, or usage respectful?
- Should this become public, stay internal, or wait?
- Does it feel like Socarengue, or just promotion?

Ovi may set review notes such as:

- music approved
- needs credit check
- likeness review needed
- live show relevant
- promo-safe
- keep private
- emotionally off-frequency

## Glen Review

Glen reviews dialogue, pacing, and story clarity.

Glen should review:

- script fragments
- issue pages
- scene summaries
- dialogue passes
- reader clarity
- pacing between scenes
- emotional continuity
- whether artifact reveals arrive too early or too late

Glen review questions:

- Does the scene read clearly without overexplaining?
- Does the dialogue feel alive?
- Does the pacing preserve mystery?
- Does the artifact deepen the story?
- Does the audience understand enough to care?
- Does anything feel generic, flat, or disconnected?

Glen may set review notes such as:

- dialogue approved
- pacing issue
- clarity issue
- mystery preserved
- reveal too early
- needs scene bridge
- story use unclear

## Artist Review

Artists review visual references, page assignments, revisions, and final art.

Artists should review:

- visual references
- character likeness
- page assignments
- storyboard frames
- panel composition
- page revisions
- final art
- covers
- continuity across issues
- symbol placement
- color and lighting direction

Artist review questions:

- What issue, scene, or page does this belong to?
- Is this reference approved, exploratory, or rejected?
- What must stay visually consistent?
- Which symbols, colors, or textures matter?
- Does this support the noir-neon, analog, musical tone?
- Is this final art, revision material, or private process?

Artist review notes may include:

- visual reference approved
- page assignment ready
- revision requested
- continuity concern
- final art candidate
- symbol placement approved
- color pass needed
- do not show publicly

## Musician And Band Review

Musicians or bands review likeness, song, credit, and promo usage.

They should review:

- performer likeness
- band name usage
- song title usage
- lyric or transcript excerpts
- soundtrack associations
- promotional images
- live show references
- venue-exclusive materials
- credits and attribution

Musician/band review questions:

- Is the likeness acceptable?
- Is the song or title usage approved?
- Is the credit correct?
- Can this be used in promo?
- Can this be used inside the story world?
- Can this appear near a live event or QR-linked page?
- Should the material stay internal until release?

Review notes may include:

- likeness approved
- likeness blocked
- credit approved
- credit correction needed
- promo approved
- promo restricted
- song reference approved
- live usage approved

## Artifact Types

Artifact types should stay specific and story-aware.

Core types:

- comic page
- cover
- issue artwork
- storyboard
- frame
- panel
- script fragment
- dialogue pass
- story document
- mythology note
- lore fragment
- character reference
- visual reference
- final art
- revision note
- soundtrack note
- song reference
- lyric fragment
- cue sheet
- live show material
- marketing fragment
- promo image
- collaborator note
- physical scan
- QR-linked object
- venue-exclusive fragment

Avoid a generic `file` or `post` type when a more meaningful artifact type exists.

## Visibility Levels

Visibility controls who can see the artifact.

- `private`: Josh/operator only or core internal archive
- `collaborator_review`: visible to assigned collaborators
- `music_review`: visible to Ovi, musicians, bands, or music reviewers
- `art_review`: visible to artists and visual reviewers
- `story_review`: visible to Glen and story reviewers
- `promo_review`: visible to marketing/outreach reviewers
- `public_preview`: safe for invited preview audiences
- `public`: released archive material
- `hidden`: deliberately concealed, even from most collaborators

Visibility is not the same as canon. A private artifact can be canonical. A public artifact can still reveal only partial truth.

## Review States

Review state describes the workflow condition of the artifact.

- `raw_signal`: received but not interpreted
- `cataloged`: basic metadata added
- `needs_story_review`
- `needs_music_review`
- `needs_art_review`
- `needs_credit_review`
- `needs_likeness_review`
- `needs_promo_review`
- `revision_requested`
- `approved_for_internal_use`
- `approved_for_release`
- `blocked`
- `archived`

Review states should help the team move, not turn the archive into generic task management.

## Canon States

Canon state describes story truth.

- `non_canon_process`: useful process material, not story truth
- `reference_only`: informs visual, music, or story direction
- `candidate_canon`: likely true but not locked
- `canon`: accepted world truth
- `public_canon`: safe to reveal as world truth
- `contradicted`: intentionally conflicts with another account
- `mythologized`: emotionally true, historically unstable
- `retired`: no longer active

Canon should preserve mystery. Not every canonical thing should be public.

## Future Supabase Tables

When persistence is explicitly approved, use Supabase as the preferred backend.

Likely tables:

- `profiles`
- `projects`
- `project_members`
- `artifacts`
- `artifact_media`
- `artifact_reviews`
- `artifact_review_assignments`
- `artifact_relationships`
- `artifact_versions`
- `issues`
- `scenes`
- `characters`
- `lore_entries`
- `tracks`
- `soundtrack_cues`
- `releases`
- `release_items`
- `credits`
- `usage_permissions`

Important artifact columns:

- `id`
- `project_id`
- `title`
- `slug`
- `artifact_type`
- `classification`
- `public_description`
- `private_notes`
- `transcript`
- `primary_media_id`
- `visibility`
- `review_state`
- `canon_state`
- `created_by`
- `created_at`
- `updated_at`

Review columns:

- `id`
- `artifact_id`
- `project_id`
- `reviewer_id`
- `reviewer_role`
- `review_state`
- `note`
- `created_at`
- `updated_at`

Permission/usage columns:

- `id`
- `artifact_id`
- `project_id`
- `subject_type`
- `subject_name`
- `permission_type`
- `permission_state`
- `credit_text`
- `restrictions`
- `created_at`
- `updated_at`

## Future Supabase Storage Buckets

Likely buckets:

- `artifact-originals`
- `artifact-previews`
- `comic-pages`
- `covers`
- `story-documents`
- `visual-references`
- `final-art`
- `soundtrack-notes`
- `promo-materials`
- `live-show-materials`
- `private-operator-notes`

Storage rules:

- originals should default private
- previews can be generated or curated later
- public archive assets should be explicitly promoted
- private process files should never share a public bucket by accident
- musician/band materials may need restricted access before approval

## Future Row Level Security Needs

RLS should enforce project-scoped access and review boundaries.

Policy needs:

- project members can see only their project materials
- Josh/owner can manage all project artifacts
- reviewers can see only assigned artifacts or role-visible artifacts
- artists can see visual review materials
- Glen/story reviewers can see story review materials
- Ovi/music reviewers can see music, legacy, promo, and live show materials
- musicians/bands can see only assigned likeness/song/credit/promo materials
- public users can see only `public` artifacts and public-safe fields
- private notes are never selected for public views
- hidden artifacts require explicit owner access

RLS should protect:

- private notes
- unreleased pages
- likeness-sensitive materials
- music credit and usage review materials
- live show or venue-exclusive content
- hidden canon

## Later Supabase Version

The later Supabase version should use:

- Supabase Auth for identity
- Supabase Postgres for artifact, relationship, review, and canon records
- Supabase Storage for media files
- Supabase Row Level Security for access control

The intake flow can then become:

1. Josh creates an artifact record.
2. Josh attaches media in Supabase Storage.
3. Josh links story, scene, issue, music, character, lore, or release context.
4. Josh assigns review lanes.
5. Reviewers add role-specific notes.
6. Artifact state moves from raw signal to approved, blocked, canonical, or public.
7. Public archive views select only public-safe fields and public media.

Even then, the interface should feel like cataloging transmissions, not managing uploads in a CMS.
