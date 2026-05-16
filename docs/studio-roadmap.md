# Studio Roadmap

Socarengue Studio is a creator operating system, not a generic project management tool. This roadmap sequences development in phases that preserve the mythology-first philosophy while building genuine operational capability.

Each phase should be completable as a coherent milestone. Do not skip phases. Do not reach forward into a later phase without completing the foundation of the current one.

---

## Phase 1: Believable Collaborator Workspace Proof

**Status: In progress**

### Goals

- Deliver a proof-of-concept Studio that feels atmospheric, noir-neon, and artifact-driven
- Demonstrate the workflow board shape using typed placeholder data
- Prove the two-domain routing model (socarengue.com public, socarengue.studio internal)
- Show collaborators what the operating system will feel like without committing unreleased story material
- Keep all data local and deterministic; no external APIs, no auth, no database

### Non-goals

- Real story content (placeholder only)
- Authentication or session management
- Persistent state changes
- External AI calls
- Media upload
- Real collaborator accounts

### Architecture Concerns

- Typed placeholder data must live in isolated modules (`src/lib/studio/demo-workflow.ts`) to prevent accidental mixing with future real canon records
- Workflow types must be shaped for future Supabase migration even though no Supabase connection exists yet
- Host-aware middleware must be in place but must not become a global redirect
- Public routes must remain coherent without any Studio awareness

### UX Priorities

- The board should feel calm, editorial, and operational
- Cards should make blockers and dependencies immediately legible
- Copilot panel should suggest clearly labeled next actions without feeling like an autonomous agent
- The interface must not resemble a generic SaaS dashboard
- Atmosphere and workflow coexist: the Studio feels like entering the world, not filing into an office

### Risks

- Placeholder data being mistaken for real story material by future agents or collaborators
- Scope creep into Phase 2 data without Phase 4 auth in place
- Overbuilding UI before the workflow model is validated with real collaborators

---

## Phase 2: Real Workflow and Canon Data Migration

### Goals

- Replace placeholder workflow data with real production tasks tied to actual Socarengue story work
- Migrate seed-data story records (scenes, issues, characters, lore, artifacts) from typed placeholder to real reviewed canon
- Establish a clear separation between demo-only records and real production records in the codebase
- Define the canon status taxonomy and apply it to all existing records
- Keep real canon data clearly labeled and never committed to a public repository without deliberate review

### Non-goals

- Supabase persistence (still local)
- Auth (still local only)
- Public archive promotion (still internal)
- Editing UI for story records

### Architecture Concerns

- Real story content must not live in the same module as placeholder demo data
- File structure should separate `src/lib/seed/` (demo) from `src/lib/canon/` or similar real-data path
- Canon records must include `canonStatus`, `visibility`, `spoilerLevel`, and `rightsStatus` fields from day one
- All real canon records must be reviewed before committing

### UX Priorities

- Story collaborators should see their actual work reflected in the board
- Blocked and incomplete tasks should be visually distinct from completed or approved work
- Linked scene, artifact, and lore connections should feel like real story relationships, not placeholder references

### Risks

- Real story spoilers being committed to a public or semi-public repository before auth protects them
- Canon and demo data mixing in query results
- Missing rights or spoiler review on migrated records

---

## Phase 3: Artifact Intake and Review Lifecycle

### Goals

- Build the full artifact intake flow as described in `docs/artifact-intake-workflow.md`
- Allow collaborators to move artifacts through the defined review state path: `raw_signal` → `cataloged` → review lanes → `approved_for_internal_use` → `approved_for_release`
- Implement visibility state filtering so review-lane artifacts never appear on public routes
- Surface archive candidacy as an explicit workflow state
- Make spoiler and rights review a required gate before public archive promotion

### Non-goals

- Real file uploads (still metadata and placeholder paths only until Supabase Storage is ready)
- External review workflows or email notifications
- Public-facing artifact pages for newly reviewed material (publication is Phase 7)

### Architecture Concerns

- Review state and canon state are separate fields: an artifact can be canonically true but still in review for rights or spoiler clearance
- Visibility state must filter at the query helper boundary, not only at the component level
- The intake form is internal only; public users must never see or interact with it
- Rights and likeness review requires human approval before any artifact with real people, bands, or licensed material is promoted

### UX Priorities

- The intake surface should feel like cataloging transmissions, not uploading files to a CMS
- Review lanes should be assigned clearly: story review, music review, art review, credit review
- Archive candidacy should feel like a meaningful elevation, not a checkbox
- Blockers and pending reviews should be immediately visible in the board

### Risks

- Rights-sensitive materials (band likenesses, licensed music references, performer images) being promoted to public archive before clearance
- Spoiler-sensitive artifacts being visible to the wrong collaborator role before visibility filtering is enforced
- Intake complexity blocking the creative workflow rather than supporting it

---

## Phase 4: Authentication and Collaborator Access

### Goals

- Implement Supabase Auth as the identity layer for Studio Mode
- Protect all `/studio/*` routes behind authenticated session checks
- Enforce collaborator roles: Creator, Story Collaborator, Artist, Music Collaborator, Marketing, Reviewer
- Allow Josh to invite named collaborators by email with role assignments
- Keep public routes (`socarengue.com`, `/archive`, `/preview/*`) completely open without auth

### Non-goals

- Audience-facing authentication or subscription tiers (later phase)
- Complex RBAC or enterprise permissions
- OAuth social login beyond the minimum useful identity method
- Self-service collaborator registration without invite

### Architecture Concerns

- Supabase Auth must be set up before any real private story data enters production infrastructure
- Middleware must not be treated as the auth layer; session validation must happen at the server layout or component level
- Row Level Security must be enabled on all Studio-facing Supabase tables before data is committed
- Public routes must remain open without session checks; Studio routes must require a valid session

### UX Priorities

- Collaborators should experience a minimal, clear login flow that feels consistent with Studio atmosphere
- Role visibility should be clear: a story collaborator should see story-relevant lanes only
- Session expiry should be handled gracefully without disrupting open review work

### Risks

- Routing the auth check through middleware alone, leaving API routes or direct data access unprotected
- Implementing auth before Supabase persistence is ready, creating a partially protected system
- Collaborator invitations being shared publicly before role scoping is confirmed

---

## Phase 5: Persistence and Backend Architecture

### Goals

- Connect Supabase Postgres for all story, workflow, and archive records
- Connect Supabase Storage for media files
- Migrate all typed local seed data to Supabase tables using the field shapes designed in earlier phases
- Enforce Row Level Security for all project-scoped data access
- Replace query helper stubs with real Supabase client queries

### Non-goals

- Public API endpoints for audience data access (separate milestone)
- Real-time presence or collaborative editing (Phase 6 or later)
- Data export or backup workflows at this stage

### Architecture Concerns

- Supabase table names and column shapes should match the Supabase-ready interfaces defined in `docs/content-model.md` and `docs/artifact-intake-workflow.md`
- Row Level Security policies must cover: project membership scope, role-based artifact visibility, private note exclusion from public queries, and hidden artifact protection
- Storage buckets must use separate private and public policies; originals must default private
- The query helper boundary (`src/lib/`) should remain the single abstraction layer between UI components and Supabase, so components never call Supabase directly

### UX Priorities

- The transition to real persistence should be invisible to collaborators in terms of experience
- Load states, error states, and empty states should feel designed, not default browser behavior
- Collaborators should see real-time reflection of state changes without needing to reload

### Risks

- RLS misconfiguration exposing private notes or unreleased artifacts to the wrong roles
- Supabase Storage public bucket policies being set too permissively during initial setup
- Query helper abstraction being bypassed in component code, creating direct Supabase calls that bypass RLS

---

## Phase 6: Controlled AI Assistant Tooling

### Goals

- Connect a real AI model to the Studio Copilot shell built in Phase 1
- Restrict AI actions to a defined set of safe, reviewable tool calls
- Require human approval for any AI-generated action that changes story records, creates review requests, or modifies canon state
- Ensure no private story material leaves the application without deliberate export authorization
- Mark all AI-generated copy as draft until human review

### Non-goals

- Autonomous story generation without human review
- AI image generation connected to live production workflows (separate, careful milestone)
- AI making changes to canon state without explicit human approval
- External AI calls before privacy and data handling are reviewed with the project owner

### Architecture Concerns

- AI actions should map to defined tool functions: `summarize_blockers`, `draft_collaborator_request`, `suggest_labels`, `create_task`, `link_artifact`, `prepare_review_note`
- Each tool function must be scoped, reversible, and produce output that requires human confirmation before committing
- Private story content, unreleased lore, and draft canon must not be sent to external AI APIs without explicit opt-in and privacy review
- AI-generated text should be stored with a `generatedBy: 'ai'` flag and reviewed before merging into canon records

### UX Priorities

- The Copilot should feel like a thoughtful collaborator, not an autonomous agent
- Suggestions should be clearly labeled as generated, not presented as decisions
- Approving or dismissing a Copilot action should feel intentional and low-friction
- The AI tool surface should not dominate the interface; it surfaces when relevant

### Risks

- Private or unreleased story content being sent to external AI APIs without clear user consent
- AI-generated copy being treated as canon without review
- Copilot suggestions creating task clutter that obscures real workflow state
- Rate limits or costs from external AI APIs disrupting collaborator workflow

---

## Phase 7: Public Archive Publishing Workflows

### Goals

- Build the editorial flow for promoting internal artifacts to the public archive
- Implement publication gating: spoiler review, rights clearance, audience-safe description, and visibility promotion
- Allow Josh to approve archive candidates and schedule or trigger publication
- Surface published artifacts on `socarengue.com/archive` with full audience-facing presentation
- Support publication types: issue releases, artifact transmissions, lore fragments, soundtrack moments, dossier drops

### Non-goals

- Audience subscription tiers or paywalled content at this stage (separate milestone)
- Fully automated publishing pipelines
- Social sharing mechanics or community comment systems

### Architecture Concerns

- The publication flow is the final gate before audience exposure; no shortcut path should exist from raw intake to public archive
- Published artifacts must have: audience-safe description, spoiler clearance, rights clearance, and explicit `visibility: public` state
- Publication should be a deliberate operator action, not an automatic state transition
- Public archive queries must select only public-safe fields; private notes, internal review history, and rights documentation must never appear in public responses

### UX Priorities

- The archive promotion surface should feel ceremonial, not bureaucratic: publishing a transmission to the public archive is a meaningful creative decision
- Archive candidates should be visually distinct in the workflow board
- The public archive presentation should feel atmospheric and discovery-oriented, not like a release notes list
- Audience-facing artifact pages should feel like recovered documents, not CMS entries

### Risks

- Spoiler-sensitive story content being published before narrative timing is deliberate
- Rights-restricted materials (performer likenesses, licensed music references) being promoted without clearance
- Archive candidates being published directly from the board without passing through the full review gate
- Public archive presentation drifting toward generic CMS aesthetics as more content accumulates

---

## Cross-Phase Architectural Principles

These apply throughout all phases and must not be compromised for implementation convenience.

**Placeholder data isolation:** Demo workflow data must never merge with real canon records in any query, component, or Supabase table.

**Atmosphere preservation:** Every new surface, from intake forms to review queues to archive pages, must maintain the noir-neon, artifact-driven, emotionally immersive design language.

**Public mystery:** The audience must never see production process, internal blockers, draft content, or incomplete artifacts. The mystery of the mythology is part of the product.

**Canon protection:** No real story canon, unreleased plot, or reveal-sensitive material should ever be committed to a public or semi-public location without explicit review and deliberate authorization.

**Human approval:** Any system action that changes story records, promotes artifacts, or generates copy must require human review and approval. No silent mutations.

**Modular growth:** Each phase should be completable as a coherent slice without requiring future phases to be partially in place.
