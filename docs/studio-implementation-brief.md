# Socarengue Studio Implementation Brief

Status: Active implementation brief
Decision state: Directional, not final product lock
Audience: Codex, Claude Code, and human collaborators

## Domain Decision

Socarengue has two intended domains:

- socarengue.com: public reader, archive, preview, audience-facing mythology experience
- socarengue.studio: internal creator operating system for planning, writing, review, artifacts, and collaborator workflow

Do not globally redirect `/` to `/studio`.

Implement host-aware routing:

- socarengue.com `/` should remain the public Reader Mode homepage.
- socarengue.studio `/` should show the Studio dashboard or rewrite to `/studio`.
- `/studio` should remain directly visitable for local development and review.
- Future auth may restrict Studio Mode; do not assume current routing is security.

Current implementation note:

- `src/middleware.ts` rewrites only the root path for `socarengue.studio` and `www.socarengue.studio`.
- The rewrite is host-aware, not a global `/` redirect.
- `localhost:3000/` remains the public Reader Mode homepage unless a local proxy supplies the `socarengue.studio` host.

## Current Content Warning

Current story, scene, task, character, and artifact examples are demo placeholders unless explicitly marked as real by the project owner.

Do not treat placeholder data as canon.

Do not commit private story content, unreleased canon, collaborator notes, licensed assets, or reveal-sensitive materials unless the repo privacy and publishing decision has been confirmed.

Use demo data only for workflow proof-of-concept.

The workflow proof currently stores its placeholder board data in `src/lib/studio/demo-workflow.ts` and its types in `src/types/studio-workflow.ts`. Keep this data generic, labeled as placeholder, and free of real unreleased canon.

## Product Goal

Build Socarengue Studio as a clean creator workflow system for:

- story bible gaps
- writing tasks
- storyboard/art blockers
- collaborator comments
- approval and review
- artifact upload/intake
- public archive/lore candidacy
- AI-assisted next-step surfacing

The Studio should feel operational, calm, cinematic, noir-neon, analog, and artifact-driven. It should not look like a generic SaaS dashboard.

## Studio Workflow Board

The initial Studio board should have these columns:

1. Gaps / Intake
2. Needs Input
3. Drafting
4. Review / Approve
5. Archive Candidate

Cards should make dependencies obvious:

- What is missing?
- Who owns it?
- What is blocked?
- What scene, artifact, lore entry, or issue is linked?
- What is the next action?

## AI Copilot Direction

The first AI assistant surface is a UI shell, not a fully autonomous agent.

It should suggest next steps such as:

- request missing frame order
- draft collaborator request
- open linked scene
- label artifact
- request approval
- summarize blockers

Do not connect paid external AI APIs until the product owner explicitly approves the architecture, costs, auth model, and data privacy model.

Current implementation note:

- The Studio Copilot panel is deterministic and reads local placeholder suggestions only.
- It does not call OpenAI, Vercel AI SDK, Supabase, or any other external service.

## Implementation Rules

Use the existing stack:

- Next.js
- TypeScript
- Tailwind CSS
- existing component style where possible
- existing docs and content model as source of project direction

The proof-of-concept files under Product Design / Proofs of Concept are reference material only.

Do not serve the standalone HTML file as the production Studio app.
Rebuild the interface inside the Next.js app.

Suggested implementation files:

- src/types/studio-workflow.ts
- src/lib/studio/demo-workflow.ts
- src/components/studio/workflow-board.tsx
- src/components/studio/workflow-card.tsx
- src/components/studio/studio-copilot-panel.tsx
- src/components/studio/artifact-intake-summary.tsx
- src/app/studio/page.tsx
- src/middleware.ts for host-aware routing if staying on Next 15

## Acceptance Criteria

Before committing, run:

```bash
pnpm typecheck
pnpm build
