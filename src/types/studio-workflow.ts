export type StudioWorkflowColumnId =
  | "gaps_intake"
  | "needs_input"
  | "drafting"
  | "review_approve"
  | "archive_candidate";

export type StudioWorkflowPriority = "low" | "medium" | "high";

export type StudioWorkflowOwnerRole =
  | "Creator"
  | "Story Collaborator"
  | "Artist"
  | "Music Collaborator"
  | "Marketing/Outreach";

export type StudioWorkflowLinkType = "issue" | "scene" | "artifact" | "lore" | "track" | "release";

export interface StudioWorkflowColumn {
  id: StudioWorkflowColumnId;
  title: string;
  signal: string;
}

export interface StudioWorkflowLink {
  type: StudioWorkflowLinkType;
  label: string;
  href?: string;
}

export interface StudioWorkflowTask {
  id: string;
  projectId: string;
  title: string;
  summary: string;
  columnId: StudioWorkflowColumnId;
  ownerRole: StudioWorkflowOwnerRole;
  priority: StudioWorkflowPriority;
  nextAction: string;
  blockedBy?: string;
  linkedRecords: StudioWorkflowLink[];
  tags: string[];
  updatedAt: string;
  isPlaceholder: true;
}

export interface StudioCopilotSuggestion {
  id: string;
  title: string;
  body: string;
  actionLabel: string;
  href?: string;
  sourceTaskIds: string[];
}

export interface StudioWorkflowBoardData {
  projectId: string;
  title: string;
  warning: string;
  columns: StudioWorkflowColumn[];
  tasks: StudioWorkflowTask[];
  copilotSuggestions: StudioCopilotSuggestion[];
}
