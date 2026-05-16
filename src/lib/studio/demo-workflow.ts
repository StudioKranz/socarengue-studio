import type {
  StudioArtifactUploadShell,
  StudioCollaboratorSession,
  StudioCopilotSuggestion,
  StudioWorkflowBoardData,
  StudioWorkflowColumn,
  StudioWorkflowTask,
} from "@/types/studio-workflow";

const placeholderStamp = "2026-05-15T09:00:00.000Z";

export const studioWorkflowColumns: StudioWorkflowColumn[] = [
  {
    id: "gaps_intake",
    title: "Gaps / Intake",
    signal: "Loose transmissions that need shape, owner, or story context.",
  },
  {
    id: "needs_input",
    title: "Needs Input",
    signal: "Blocked work waiting for a collaborator, missing detail, or decision.",
  },
  {
    id: "drafting",
    title: "Drafting",
    signal: "Material actively being written, sequenced, labeled, or prepared.",
  },
  {
    id: "review_approve",
    title: "Review / Approve",
    signal: "Signals ready for story, art, music, or release approval.",
  },
  {
    id: "archive_candidate",
    title: "Archive Candidate",
    signal: "Material that may become audience-safe after final curation.",
  },
];

export const demoStudioWorkflowTasks: StudioWorkflowTask[] = [
  {
    id: "demo_task_missing_scene_bridge",
    projectId: "project_socarengue",
    title: "Name the missing scene bridge",
    summary: "Placeholder task for deciding how a demo scene moves from discovery into confrontation without exposing real canon.",
    columnId: "gaps_intake",
    ownerRole: "Story Collaborator",
    priority: "high",
    nextAction: "Glen should add a one-paragraph bridge note, mark the issue beat it supports, and leave the wording as draft-only.",
    linkedRecords: [
      { type: "issue", label: "Demo Issue Structure", href: "/studio/issues/the-street-remembers" },
      { type: "scene", label: "Placeholder bridge beat", href: "/studio/issues/the-street-remembers" },
    ],
    tags: ["story gap", "sequence"],
    updatedAt: placeholderStamp,
    isPlaceholder: true,
  },
  {
    id: "demo_task_frame_order",
    projectId: "project_socarengue",
    title: "Request frame order for uploaded studies",
    summary: "Demo placeholder for arranging storyboard references before any public archive decision.",
    columnId: "needs_input",
    ownerRole: "Artist",
    priority: "high",
    nextAction:
      "Ask the artist for a simple first, second, third frame order and note whether any frame must stay private process material.",
    blockedBy: "Awaiting collaborator ordering note before dialogue pacing can be trusted.",
    linkedRecords: [
      { type: "artifact", label: "Placeholder storyboard batch", href: "/studio/intake" },
      { type: "scene", label: "Demo pacing dependency", href: "/studio/issues/the-street-remembers" },
    ],
    tags: ["storyboard", "privacy"],
    updatedAt: placeholderStamp,
    isPlaceholder: true,
  },
  {
    id: "demo_task_cue_language",
    projectId: "project_socarengue",
    title: "Draft cue language for silent reading",
    summary: "Demo task for making soundtrack references readable without requiring playback.",
    columnId: "drafting",
    ownerRole: "Music Collaborator",
    priority: "medium",
    nextAction: "Write a two-line cue note that explains mood, not plot, so silent readers still understand the emotional cue.",
    linkedRecords: [{ type: "track", label: "Demo cue placeholder" }],
    tags: ["soundtrack", "accessibility"],
    updatedAt: placeholderStamp,
    isPlaceholder: true,
  },
  {
    id: "demo_task_archive_label",
    projectId: "project_socarengue",
    title: "Approve archive label tone",
    summary: "Placeholder review item for deciding whether a label feels public, mysterious, and clear.",
    columnId: "review_approve",
    ownerRole: "Creator",
    priority: "medium",
    nextAction: "Approve the label tone or request a plainer audience-facing version that preserves mystery without sounding like internal process.",
    linkedRecords: [{ type: "artifact", label: "Demo artifact label", href: "/archive" }],
    tags: ["archive", "copy"],
    updatedAt: placeholderStamp,
    isPlaceholder: true,
  },
  {
    id: "demo_task_public_candidate",
    projectId: "project_socarengue",
    title: "Mark one demo object as audience-safe",
    summary: "Demo candidate for practicing the boundary between internal process and public exhibit.",
    columnId: "archive_candidate",
    ownerRole: "Marketing/Outreach",
    priority: "low",
    nextAction:
      "Confirm the object has no private notes, unreleased story details, unresolved spoiler timing, or rights questions before public language is drafted.",
    blockedBy: "Needs final rights and mystery check.",
    linkedRecords: [{ type: "release", label: "Public preview surface", href: "/preview/issue-one" }],
    tags: ["release", "curation"],
    updatedAt: placeholderStamp,
    isPlaceholder: true,
  },
];

export const demoCopilotSuggestions: StudioCopilotSuggestion[] = [
  {
    id: "demo_suggestion_request_order",
    title: "Ask for the missing frame order",
    body: "The storyboard placeholder is blocked. Ask for frame order before dialogue work depends on the wrong visual sequence.",
    actionLabel: "Open intake",
    href: "/studio/intake",
    sourceTaskIds: ["demo_task_frame_order"],
  },
  {
    id: "demo_suggestion_review_blockers",
    title: "Review blockers before archive curation",
    body: "Two demo tasks still carry blockers. Resolve privacy, rights, and ordering notes before anything moves into public archive language.",
    actionLabel: "Scan board",
    sourceTaskIds: ["demo_task_frame_order", "demo_task_public_candidate"],
  },
  {
    id: "demo_suggestion_silent_cue",
    title: "Write the silent-reader cue",
    body: "The soundtrack task can advance without an audio integration. Draft mood language now and keep playback optional.",
    actionLabel: "Open issue",
    href: "/studio/issues/the-street-remembers",
    sourceTaskIds: ["demo_task_cue_language"],
  },
  {
    id: "demo_suggestion_artifact_candidate",
    title: "Label the archive candidate",
    body: "The candidate object needs a plain public label, spoiler level, and rights status before it can move beyond internal review.",
    actionLabel: "Stage metadata",
    href: "/studio/intake",
    sourceTaskIds: ["demo_task_public_candidate"],
  },
  {
    id: "demo_suggestion_story_gap",
    title: "Review the story gap",
    body: "The missing bridge task is high priority. Add the smallest useful story note, then decide whether it belongs in drafting or review.",
    actionLabel: "Open issue",
    href: "/studio/issues/the-street-remembers",
    sourceTaskIds: ["demo_task_missing_scene_bridge"],
  },
];

export const demoCollaboratorSession: StudioCollaboratorSession = {
  name: "Glen",
  role: "Story Collaborator",
  currentFocus: "Dialogue rhythm, scene bridges, and blocker review",
  todaysSignal: "The storyboard ordering note is the cleanest unlock for the next writing pass.",
  reviewMode: "Demo session only. Identity is illustrative; there is no auth, permission enforcement, or saved profile.",
  isPlaceholder: true,
};

export const demoArtifactUploadShell: StudioArtifactUploadShell = {
  title: "Artifact Intake Shell",
  description:
    "A future upload path for recovered material. This shell previews the cataloging workflow only; it does not upload, save, persist, or contact storage.",
  fields: [
    { label: "Type", value: "Storyboard / frame / script fragment" },
    { label: "Linked issue or scene", value: "Demo issue workflow / optional scene link" },
    { label: "Canon status", value: "Reference only / candidate canon / canon" },
    { label: "Visibility", value: "Private / collaborator review / public preview" },
    { label: "Spoiler level", value: "None / soft reveal / internal reveal" },
    { label: "Rights status", value: "Owned / needs credit check / blocked" },
    { label: "Archive candidate", value: "No / maybe / operator review" },
    { label: "Notes", value: "Origin, context, review lane, and what must remain mysterious." },
  ],
  actionLabel: "Open intake shell",
  href: "/studio/intake",
  isPlaceholder: true,
};

export const demoStudioWorkflow: StudioWorkflowBoardData = {
  projectId: "project_socarengue",
  title: "Studio Workflow Proof",
  warning:
    "Demo workflow data only. These task, scene, artifact, and cue examples are placeholders for product testing and are not Socarengue canon.",
  columns: studioWorkflowColumns,
  tasks: demoStudioWorkflowTasks,
  copilotSuggestions: demoCopilotSuggestions,
  collaboratorSession: demoCollaboratorSession,
  artifactUploadShell: demoArtifactUploadShell,
};

export function getDemoStudioWorkflow(): StudioWorkflowBoardData {
  return demoStudioWorkflow;
}
