# Roles

Socarengue Studio has creator, collaborator, and audience roles. Permissions should stay simple at first and grow only when collaboration requires it.

## Role Philosophy

The platform should not begin with enterprise permission complexity.

Start with clear creative responsibility:

- Who owns the world?
- Who can edit the story?
- Who can view private lore?
- Who can prepare releases?
- Who can publish?
- What can the audience access?

## Core Roles

### Owner

The owner controls the project.

Can:

- create and archive projects
- manage collaborators
- edit all content
- publish releases
- change visibility
- manage media
- approve canonical lore

### Editor

The editor shapes story and release quality.

Can:

- edit issues, scenes, lore, artifacts, and release notes
- review content status
- add comments or notes
- prepare releases for owner approval
- suggest canonical changes

Should not automatically:

- delete projects
- manage billing if billing ever exists
- publish without owner permission unless explicitly granted

### Artist / Media Contributor

The artist or media contributor works with visual, audio, or production assets.

Can:

- upload or reference media
- update media metadata
- link assets to scenes, artifacts, tracks, or releases
- add production notes

May have limited access to hidden lore depending on project needs.

### Writer

The writer works on narrative material.

Can:

- draft scenes
- edit character and lore notes
- propose issue structure
- create artifacts
- add internal notes

### Composer / Sound Contributor

The composer or sound contributor works with soundtrack records and cue planning.

Can:

- add track metadata
- add cue notes
- link tracks to scenes, artifacts, and releases
- provide listening instructions
- attach cover art or audio placeholders

### Viewer / Reviewer

A private reviewer can inspect work without editing.

Can:

- view assigned materials
- leave comments if enabled
- preview releases if invited

### Audience

The audience experiences published material.

Can:

- read public releases
- view public archive entries
- play optional soundtrack material
- follow public artifact links

Should not need an account for the first public release experience.

Audience subscriptions, tiers, and accounts are future possibilities. They should not shape the first implementation slice.

## Permission States

Content should carry visibility and status independent of user role.

Visibility:

- `private`: internal only
- `review`: visible to invited collaborators/reviewers
- `public`: audience-facing
- `hidden`: internal, intentionally concealed from most collaborators if needed

Status:

- `draft`
- `in_review`
- `canonical`
- `scheduled`
- `published`
- `archived`

## MVP Permission Plan

For the first implementation slice:

- model roles in documentation and TypeScript types
- do not build complex auth immediately
- use one creator/admin assumption for studio surfaces
- make public routes read-only
- prepare the data model for future Supabase row-level security
- do not enforce permissions in the UI beyond separating public-safe seed data from private notes

## Future Supabase Auth Plan

Supabase is the preferred future auth and persistence path.

When Supabase is connected:

- use Supabase Auth for identity
- store project membership in `project_members`
- assign one role per project membership at first
- use row-level security to prevent cross-project access
- keep publication visibility explicit on content rows
- use Supabase Storage policies for media access when media uploads begin

Potential tables:

- `profiles`
- `projects`
- `project_members`
- `roles` if roles become configurable
- content tables with `project_id`, `visibility`, and `status`

## Collaboration Boundaries

Collaboration should support the creative process without turning the product into generic project management.

Future collaboration features may include:

- comments
- change history
- assignments
- review queues
- release checklists
- editorial status
- presence indicators

These should serve story production, not become the center of the product.
