export type IntakeArtifactType =
  | "comic_page"
  | "cover"
  | "issue_artwork"
  | "storyboard"
  | "script_fragment"
  | "dialogue_pass"
  | "story_document"
  | "mythology_note"
  | "visual_reference"
  | "final_art"
  | "soundtrack_note"
  | "song_reference"
  | "live_show_material"
  | "marketing_fragment"
  | "collaborator_note"
  | "physical_scan"
  | "qr_linked_object";

export type IntakeVisibility =
  | "private"
  | "collaborator_review"
  | "music_review"
  | "art_review"
  | "story_review"
  | "promo_review"
  | "public_preview"
  | "public"
  | "hidden";

export type IntakeReviewState =
  | "raw_signal"
  | "cataloged"
  | "needs_story_review"
  | "needs_music_review"
  | "needs_art_review"
  | "needs_credit_review"
  | "needs_likeness_review"
  | "needs_promo_review"
  | "revision_requested"
  | "approved_for_internal_use"
  | "approved_for_release"
  | "blocked"
  | "archived";

export type IntakeCanonState =
  | "non_canon_process"
  | "reference_only"
  | "candidate_canon"
  | "canon"
  | "public_canon"
  | "contradicted"
  | "mythologized"
  | "retired";

export interface ArtifactIntakeDraft {
  title: string;
  artifactType: IntakeArtifactType;
  issueId: string;
  sceneId: string;
  collaboratorVisibility: IntakeVisibility;
  canonState: IntakeCanonState;
  reviewState: IntakeReviewState;
  publicDescription: string;
  privateNotes: string;
  soundtrackTrackId: string;
  linkedLoreIds: string[];
  emotionalResonanceTags: string[];
}
