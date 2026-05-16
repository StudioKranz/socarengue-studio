# Studio Collaborator Workflow

Socarengue Studio is not a generic Kanban board.

It is a creator operating system for turning story gaps, artifacts, collaborator decisions, and archive candidates into a living mythology workflow. The board exists to surface what the story needs next, who needs to act, and what is blocked, linked, or ready. Every card carries story weight, not just task weight.

This document describes the intended collaborator experience, the nature of story dependencies, how archive boundaries work, and how emotional atmosphere coexists with operational workflow.

---

## Why This Is Not a Generic Kanban Board

Most workflow boards treat all work as equivalent units of effort moving left to right. A task is a task. A blocker is a blocker. Columns have names like To Do, In Progress, Done.

Socarengue Studio treats workflow items as story events with narrative and production meaning.

A card on the board is not just a task. It is a story gap waiting to be filled, a scene waiting for frames, a dialogue pass waiting for clarity, an artifact waiting for review, or a transmission waiting to become part of the living mythology.

The board columns reflect the real creative states of production:

1. **Gaps / Intake** — Something is missing. A scene needs script. A lore entry needs depth. An artifact has arrived but is uncatalogued. A storyboard dependency is unresolved.
2. **Needs Input** — The item is identified and understood, but it cannot move forward without a specific collaborator decision, missing asset, or story answer.
3. **Drafting** — Active creation: writing, drawing, reviewing, scoring, cataloging.
4. **Review / Approve** — The work is done and needs human confirmation before it becomes part of the canon or moves toward public view.
5. **Archive Candidate** — The item has been approved internally and may be ready to become part of the public mythology archive.

Every card on the board should answer:

- What is this story object?
- What is its current state?
- What is blocking it?
- Who owns it?
- What is the most important next action?

---

## The Collaborator Experience

### Writer Reviewing Story Gaps

Glen, a story collaborator, opens Studio and sees the workflow board.

Several cards are in the Gaps column. One reads: **Scene 04 — The Street Remembers: Dialogue Missing.** The card is linked to the scene record, shows the emotional beat description, and notes that a storyboard sequence was approved but the dialogue pass was never delivered.

Glen opens the linked scene from the card. The scene summary, emotional beat, visual notes, and character list are visible. The script text field is empty.

Glen opens a draft note in the Review / Approve lane: the artist has flagged that certain panel compositions depend on knowing the exact dialogue rhythm before final line placement.

Glen now understands the dependency: the storyboard is blocked because the dialogue is missing. This is not just a writing task. It is a story dependency that is holding visual production.

Glen writes the dialogue draft in the linked scene editor, marks the card as moved to Drafting, and attaches a note explaining the emotional pacing logic behind the rhythm choices. Glen tags the artist for review.

### Storyboard Dependency Blocking Dialogue

An artist has uploaded storyboard frames for Scene 03. The frames are in the Needs Input lane because one panel sequence references an object whose position in the story world has not been confirmed.

The linked lore entry for that object exists but its canon status is `candidate_canon`, meaning it has not been locked as world truth. If the panel shows the object in a specific location and the lore later contradicts it, the visual record will be wrong.

The card surfaces this dependency clearly: **Storyboard: Object placement requires canon confirmation. Linked lore entry is candidate_canon. Needs story review.**

The Copilot panel suggests: *Request lore confirmation from story collaborator. Open linked lore entry.*

Josh reviews the lore entry, confirms the canon position, updates the status to `canon`, and marks the blocker resolved. The storyboard card moves to Drafting.

### Collaborator Review Requests

An artifact has been cataloged: a lyric fragment referenced in Issue One that may have been written by Ovi. The artifact is in the Review / Approve lane with two open review assignments: music review (Ovi) and story review (Glen).

Ovi opens the music review lane and sees the artifact. The classification is `lyric_fragment`. The linked scene, linked track, and linked character are visible. A private operator note from Josh explains the context.

Ovi adds a music review note: *This lyric is confirmed from the 2019 session. Credit to Ovi. Approved for internal use. Not ready for public without discussing archive framing.*

Ovi marks the music review as `approved_for_internal_use`.

Glen opens the story review lane and sees the same artifact. The music review note is visible. Glen checks whether the lyric's tone matches the scene's emotional beat and confirms it deepens rather than explains the moment.

Glen marks the story review as `approved_for_internal_use`.

The artifact now has both required reviews complete. Its review state advances to `approved_for_internal_use`. It can be used in production but is not yet an archive candidate.

Josh, as the operator, reviews the artifact summary and decides it may be worth surfacing publicly later. Josh marks it `archive_candidate`. The card moves to the Archive Candidate column.

### Artifact Labeling

An incoming artifact arrives: a scan of a physical page from a live show. Josh opens the intake form and catalogs the artifact.

Labels applied:

- `artifact_type`: `live_show_material`
- `linked_issue`: none yet
- `linked_scene`: none yet
- `canon_status`: `reference_only`
- `visibility`: `private`
- `review_state`: `raw_signal`
- `private_notes`: context notes from Josh about where the page came from

The artifact exists in the archive but is invisible to collaborators and the public until it is reviewed and promoted.

Josh later links it to a specific scene where a live show image might become a visual reference. The artifact moves to `cataloged` state. Josh assigns it to the art review lane. The artist sees it in their review queue.

### Archive Candidacy

Not every approved artifact becomes public.

Archive candidacy is a deliberate editorial decision. It means: this artifact has cleared internal review, carries story weight or myth-value, and may be ready to become part of the audience-facing mythology.

An artifact becomes an archive candidate when:

- internal review is complete for all assigned review lanes
- the story value has been confirmed
- the visibility decision has been made deliberately
- spoiler clearance has been considered relative to publication timing
- rights and attribution are confirmed or pending explicit review

Even as an archive candidate, the artifact is still internal. The final promotion to `public` or `public_preview` requires explicit operator approval and passes through the full publication gate described in `docs/artifact-intake-workflow.md`.

### Copilot Suggestions

The Copilot panel surfaces next-action suggestions based on the current board state.

In Phase 1, suggestions are deterministic and local. They read from the demo workflow data and suggest pre-written actions. They do not call any external AI service.

Example suggestions in the current implementation:

- *Scene 04 is missing dialogue. Request draft from story collaborator.*
- *Artifact: Lyric Fragment awaiting music review. Assign Ovi.*
- *Storyboard frame: object placement unresolved. Confirm lore entry before art proceeds.*
- *Three tasks in Needs Input column. Review blockers before end of sprint.*

The Copilot panel is clearly labeled as a local suggestion shell. It does not act. It suggests. The operator or collaborator decides whether to follow the suggestion.

In future phases, the Copilot may be connected to a real AI model with controlled, approved tool actions. See `docs/studio-copilot.md` for the full Copilot architecture and philosophy.

---

## How Story Dependencies Work

Story dependencies are explicit links, not inferred relationships.

A card can be blocked by:

- a missing asset (storyboard, dialogue pass, visual reference, music cue)
- an unconfirmed lore entry (the canon state must reach `canon` before production depends on it)
- a pending review (music review, art review, story review, rights review)
- an upstream scene or artifact that is itself blocked
- a rights or likeness clearance that has not been received

Dependencies appear on the card surface. A blocked card shows what it is waiting for, who owns the blocker, and what the next action is.

Dependencies are story events, not just project management metadata. The storyboard cannot show a specific object placement if the lore says the object's location is uncertain. The dialogue cannot be locked if the scene's emotional beat is still in revision. The artifact cannot go public if the music review has not cleared the associated track.

The system should surface dependency chains, not just individual card state.

---

## How Archive Boundaries Work

The archive is the public mythology record of Socarengue.

Not every artifact, scene, or lore entry enters the archive. Many internal production materials are process, not mythology.

The archive boundary determines what is story truth that the audience can discover versus what is production process that collaborators need but the audience does not.

Objects on the internal side of the archive boundary:

- rough storyboard frames with revision notes
- dialogue drafts with pacing annotations
- visual references used for character consistency
- internal lore debates and candidate canon entries
- private operator notes
- music review history
- rights and likeness documentation

Objects that may cross the archive boundary (as archive candidates):

- final art pages approved for public view
- canonical lore entries written for audience discovery
- artifacts with clear story meaning and approved audience-safe descriptions
- soundtrack cues linked to public reading moments
- creator notes that have been curated for mystery and audience experience
- scene or issue summaries written for audience context, not production tracking

Crossing the archive boundary requires:

1. Explicit archive candidacy marking by the operator
2. Spoiler review confirming narrative timing is appropriate
3. Rights and attribution clearance for all included material
4. An audience-safe description that reveals enough to be meaningful without overexplaining the mythology
5. Explicit `visibility: public` or `visibility: public_preview` state set by the operator

The audience should encounter the archive as discovered fragments, not as published records.

---

## How Emotional Atmosphere and Workflow Coexist

The Studio is operational. It needs to work. Collaborators need to find what is blocked, who owns it, what needs attention, and what is ready to move.

But the Studio must never feel like office software.

Every interface element should carry the tone of the world it serves. Cards on the board are not tickets. They are transmissions in progress, scenes waiting for their moment, artifacts waiting to be named.

Design principles for maintaining atmosphere in operational surfaces:

- Use Socarengue vocabulary in labels and states: `raw_signal` not `new`, `archive_candidate` not `ready to publish`, `cataloged` not `processed`
- Typography should feel editorial and deliberate, not table-formatted
- Status indicators should use the noir-neon color language: states are not just green/red but carry emotional tone
- Empty states should feel atmospheric, not generic: if the board has no cards in a column, the empty state should reflect the world, not show a default icon with placeholder text
- Copilot suggestions should be written in the voice of a thoughtful collaborator, not a chatbot
- The intake surface should feel like cataloging recovered transmissions, not uploading files

The atmosphere is not decoration. It is part of the operational experience. Collaborators working in a system that feels like the world they are building will make better creative decisions than collaborators working in a system that feels like office infrastructure with a neon skin.

---

## Roles and Access in the Collaborator Workflow

Until authentication is implemented in Phase 4, all collaborators access Studio through direct URL. Role-based filtering is a future constraint.

Intended role behaviors when auth is in place:

| Role | Board access | Review lanes | Archive action |
|---|---|---|---|
| Creator (Josh) | Full board, all cards | All review lanes | Archive promotion and publication |
| Story Collaborator (Glen) | Story-relevant cards | Story review lane | None; can suggest archive candidacy |
| Artist | Visual and storyboard cards | Art review lane | None |
| Music Collaborator (Ovi) | Music and soundtrack cards | Music review lane | None |
| Marketing / Outreach | Promo and release cards | Promo review lane | None; can see approved public materials |
| Reviewer (general) | Assigned cards only | Assigned review lane | None |

Role access is not yet enforced. When auth is implemented, these scopes should be enforced at the data layer (Supabase RLS) and reflected in the UI to reduce noise rather than purely hide records.

---

## Collaborator Onboarding Notes

When introducing a new collaborator to the Studio:

1. Explain that the board represents the living state of story production, not a task management system
2. Show them their relevant review lane first, not the full board
3. Explain the difference between canon state and review state
4. Explain that moving a card to Archive Candidate requires operator confirmation
5. Explain that private notes and internal review history never appear on the public archive
6. Confirm they understand that placeholder data in the current proof-of-concept is not real story material

The Studio is a tool for protecting the myth as much as building it.
