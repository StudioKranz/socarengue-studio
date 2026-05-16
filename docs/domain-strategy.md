# Domain Strategy

Socarengue operates across two distinct domains with separate audience intentions, routing behaviors, and access philosophies. Understanding the boundary between them is critical for every implementation decision.

## The Two Domains

### socarengue.com

The public domain is the audience-facing mythology experience.

Intended visitors:

- readers discovering the story world for the first time
- returning readers tracking serialized issues
- archive explorers following lore threads
- listeners following the soundtrack
- general audience discovering Socarengue through social or live event references

Experience posture: discovered, cinematic, emotionally immersive. The visitor should feel like they are entering a living mythology, not signing up for a content platform.

Public surfaces include:

- Reader Mode landing page
- `/preview/issue-one` and future serialized issue previews
- `/archive` for recovered artifact and lore exploration
- Soundtrack-synchronized reading moments
- Public artifact and lore detail pages

What must never appear on `socarengue.com`:

- internal workflow boards
- collaborator task state
- story bible gaps and production blockers
- draft content, revision requests, or placeholder labels
- artifact records marked as private, internal, or in review
- Copilot suggestions or operator notes
- unreviewed or unapproved materials

### socarengue.studio

The Studio domain is the internal creator operating system.

Intended visitors:

- Josh as primary story architect and production operator
- story collaborators such as writers and dialogue reviewers
- artists reviewing page assignments, storyboards, and visual references
- music collaborators and band/performer representatives
- marketing and outreach contributors
- future AI-assisted tools operating within approved scopes

Experience posture: operational, calm, artifact-driven, noir-neon. The Studio should feel focused and atmospheric without becoming a generic SaaS dashboard.

Studio surfaces include:

- `/studio`: workflow board overview and signal index
- `/studio/intake`: artifact intake and cataloging surface
- `/studio/issues/:slug`: issue structure, scene sequence, and linked resonance
- Future: collaborator review lanes, archive candidate queues, lore editor

What must never be promoted on `socarengue.studio` as a primary public surface:

- audience-facing reading experience
- public marketing language
- general publication announcements without collaborator context

## Routing Philosophy

### Host-Aware Middleware

The current middleware implementation is host-aware, not a global redirect.

How it works:

- When a request arrives with the host `socarengue.studio` or `www.socarengue.studio`, the middleware rewrites the root path `/` to `/studio`.
- All other paths on `socarengue.studio` pass through unchanged.
- Requests on `socarengue.com`, `localhost`, or any other host receive no rewrite.
- `localhost:3000/` continues to serve the public Reader Mode homepage unless a local proxy provides the `socarengue.studio` host header.

Implementation location: `src/middleware.ts`

### Why a Global Redirect Is Prohibited

A global redirect from `/` to `/studio` would break the public experience for `socarengue.com` visitors. It would make the audience homepage permanently inaccessible unless a second route override was added, creating a fragile layered redirect chain.

The host-aware approach keeps both domains independently coherent:

- `socarengue.com/` resolves to the public Reader Mode homepage
- `socarengue.studio/` resolves to the Studio dashboard
- `/studio` remains directly visitable for local development and collaborator review sessions without requiring a custom host proxy

Do not add a global root redirect. Do not modify the middleware to expand beyond root-path host-aware rewrites without explicit architectural review.

### Direct Route Access

Studio routes such as `/studio`, `/studio/intake`, and `/studio/issues/:slug` remain directly visitable at any host for local development and collaborator review. This is intentional. These routes are operator-facing but not yet protected by authentication.

This means the current separation is a routing convention, not a security boundary.

## Separation of Public Archive and Private Workflow

The public archive and the private workflow surfaces have different data contracts.

| Surface | Data source | Visibility | Audience |
|---|---|---|---|
| Public archive | Published, approved, public-safe records only | `public` | General audience |
| Public preview | Curated issue releases | `public_preview` or `public` | Invited and general |
| Studio board | Local placeholder workflow records | Internal only | Collaborators |
| Artifact intake | Full artifact records including private notes | Internal only | Operators and reviewers |
| Lore editor | Canon and draft lore including private notes | Internal only | Story collaborators |

The system must never accidentally surface private notes, hidden lore, internal blockers, or unapproved artifacts on public routes.

At the current seed-data stage, this is enforced by keeping placeholder workflow data in isolated modules (`src/lib/studio/demo-workflow.ts`) and filtering seed data for public views at the query helper boundary.

When Supabase is introduced, this boundary must be enforced with Row Level Security policies, not just frontend filtering.

## Future Auth Considerations

The current middleware is routing only. It is not authentication.

Before real private story data, collaborator notes, unreleased canon, rights-sensitive materials, or production decisions enter the Studio, authentication must be implemented.

Planned auth model:

- Supabase Auth as the preferred identity provider
- Role-based access matching the collaborator roles in `docs/roles.md`
- Row Level Security policies enforcing project-scoped data access
- Studio routes protected behind authenticated session checks
- Public routes remaining open without auth

Auth must be implemented before:

- real unreleased story content is stored in Studio
- collaborators submit review notes against real artifacts
- artifact review state changes affect live records
- any private lore or production data leaves local seed data form

Until auth is in place, treat all Studio data as placeholder only.

## Why socarengue.com Stays Public

The public domain must remain accessible, beautiful, and emotionally coherent without requiring login or Studio awareness.

Audience members discovering Socarengue through social, live events, or search should land on a cinematic mythology experience, not a login prompt or dashboard shell.

The creator system is internal infrastructure. The audience experience is the product.

## Future Considerations

### Subdomain Expansion

Future subdomain strategy may include:

- `api.socarengue.com`: data API for authenticated audience tiers
- `cdn.socarengue.com` or Cloudflare CDN: static asset delivery
- `archive.socarengue.com`: dedicated public archive surface if volume warrants separation

Do not implement additional subdomains until the primary two-domain architecture is stable and auth-protected.

### Studio Access URL

The Studio URL (`socarengue.studio`) should remain unlisted from public-facing marketing until auth is in place. Sharing it directly with collaborators is appropriate during proof-of-concept review phases.

### Route Protection

When auth is introduced, all `/studio/*` routes should require an authenticated session with a valid project membership role. Public routes at `socarengue.com` should remain open.

Do not implement auth as middleware path-matching alone. Use Supabase session validation at the server component or layout level for Studio routes.

## Implementation Warnings for Future Agents

- Do not add a global redirect from `/` to `/studio`. This will break the public homepage.
- Do not remove host-aware logic from `src/middleware.ts` without understanding the two-domain routing model.
- Do not serve Studio routes as the primary public landing page.
- Do not assume the current routing separation is security. It is convention only until auth is implemented.
- Do not expose `src/lib/studio/demo-workflow.ts` data on public archive routes.
- Do not merge the public archive data contract with the internal workflow data contract.
