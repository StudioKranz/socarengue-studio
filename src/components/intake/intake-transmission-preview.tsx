import type { LoreEntry, Scene, Track } from "@/types/content";
import type { ArtifactIntakeDraft, IntakeCanonState, IntakeReviewState, IntakeVisibility } from "@/types/intake";
import {
  TransmissionPrivacyPreview,
  type TransmissionPrivacyPreviewData,
} from "@/components/archive/transmission-privacy-preview";
import { buildRoutingSignals } from "@/components/intake/intake-review-lanes";

interface IntakeTransmissionPreviewProps {
  draft: ArtifactIntakeDraft;
  scene?: Scene;
  track?: Track;
  loreEntries: LoreEntry[];
}

function formatValue(value: string) {
  return value.replaceAll("_", " ");
}

function canonFraming(canonState: IntakeCanonState) {
  switch (canonState) {
    case "canon":
      return "The object carries story truth, but the archive can still choose how much shadow remains around it.";
    case "public_canon":
      return "This truth can face the audience, provided the mystery is preserved as atmosphere rather than confusion.";
    case "candidate_canon":
      return "The signal may become canon, but it should be heard once more before the archive fixes it in public memory.";
    case "mythologized":
      return "The emotional truth is stronger than the clean record; public language should honor the charged uncertainty.";
    case "contradicted":
      return "The fracture is part of the transmission. Public language should reveal tension without resolving it too early.";
    case "retired":
      return "This signal should remain a trace of the process unless Josh chooses to surface it as recovered residue.";
    case "non_canon_process":
      return "This belongs to the making-of shadow, not the public mythology, unless curated as a process artifact.";
    case "reference_only":
    default:
      return "This is a charged reference. It can guide the archive without declaring itself as final truth.";
  }
}

function canonUncertainty(canonState: IntakeCanonState) {
  switch (canonState) {
    case "canon":
      return "Canon weight is strong. The remaining question is not whether it is true, but how openly it should speak.";
    case "public_canon":
      return "Public truth is near the surface. The operator memory should still protect private context and collaborator sensitivities.";
    case "candidate_canon":
      return "The object is leaning toward story truth, but the archive has not locked the signal.";
    case "mythologized":
      return "The record may be unstable while the emotional memory remains true.";
    case "contradicted":
      return "Another account pushes against this one. Preserve the contradiction until Josh decides what the fracture means.";
    case "retired":
      return "The signal has gone quiet and should not be mistaken for active canon.";
    case "non_canon_process":
      return "Useful to the studio, unsafe to treat as story fact.";
    case "reference_only":
    default:
      return "The object can guide tone, visuals, or music without becoming fixed lore.";
  }
}

function isPublicVisibility(visibility: IntakeVisibility) {
  return visibility === "public" || visibility === "public_preview";
}

function hasRightsOrCreditRisk(reviewState: IntakeReviewState) {
  return reviewState === "needs_credit_review" || reviewState === "needs_likeness_review" || reviewState === "blocked";
}

function soundtrackIsSafe(draft: ArtifactIntakeDraft, track?: Track) {
  return Boolean(track && isPublicVisibility(draft.collaboratorVisibility) && !hasRightsOrCreditRisk(draft.reviewState));
}

function unresolvedQuestions(draft: ArtifactIntakeDraft, loreEntries: LoreEntry[], track?: Track) {
  const questions: string[] = [];

  if (!draft.title.trim()) {
    questions.push("What name should the archive remember?");
  }

  if (!draft.publicDescription.trim()) {
    questions.push("What can the audience receive without exposing the studio memory?");
  }

  if (draft.collaboratorVisibility === "private" || draft.collaboratorVisibility === "hidden") {
    questions.push("Who is allowed to hear this signal before it surfaces?");
  }

  if (hasRightsOrCreditRisk(draft.reviewState)) {
    questions.push("Whose likeness, credit, or song presence must be protected before public transmission?");
  }

  if (draft.canonState === "candidate_canon" || draft.canonState === "mythologized" || draft.canonState === "contradicted") {
    questions.push("Does the mystery deepen the mythology, or is the archive hiding missing clarity?");
  }

  if (loreEntries.length === 0) {
    questions.push("Which mythic trace anchors this object inside Socarengue?");
  }

  if (track && !soundtrackIsSafe(draft, track)) {
    questions.push("Can the listening layer be named publicly, or should the cue remain below the surface?");
  }

  return questions.length > 0 ? questions : ["Does this object deepen the transmission, or only decorate it?"];
}

export function mapIntakeTransmissionPreviewData(
  draft: ArtifactIntakeDraft,
  scene?: Scene,
  track?: Track,
  loreEntries: LoreEntry[] = [],
): TransmissionPrivacyPreviewData {
  const routingSignals = buildRoutingSignals(draft, scene, track, loreEntries);
  const publicTitle = draft.title.trim() || "Untitled recovered signal";
  const safeSoundtrack = soundtrackIsSafe(draft, track);
  const sensitiveRouting = routingSignals
    .filter((signal) => signal.intensity === "high" || /credit|likeness|promo|public|canon|song|music/i.test(signal.reason))
    .map((signal) => `${signal.role}: ${signal.reason}`);

  return {
    publicTransmission: {
      title: publicTitle,
      classification: formatValue(draft.artifactType),
      publicDescription:
        draft.publicDescription.trim() ||
        "The archive has recovered the object, but its audience-facing language has not been tuned yet.",
      resonanceTags: draft.emotionalResonanceTags,
      linkedSceneTitle: scene?.title ?? "No scene title can surface yet.",
      linkedLoreTitles: loreEntries.map((entry) => entry.title),
      soundtrackCueTitle: safeSoundtrack ? track?.title : undefined,
      soundtrackCueNote: track
        ? "A listening layer is present, but its title remains private until the signal is safe."
        : "No listening layer has attached itself to this object.",
      canonFraming: canonFraming(draft.canonState),
    },
    operatorMemory: {
      privateNotes:
        draft.privateNotes.trim() ||
        "No private operator note has been written yet. The studio memory is waiting for the first true reading.",
      reviewState: formatValue(draft.reviewState),
      canonUncertainty: canonUncertainty(draft.canonState),
      collaboratorLanes: routingSignals.map((signal) => `${signal.role} / ${signal.intensity}`),
      sensitiveRouting,
      internalVisibility: formatValue(draft.collaboratorVisibility),
      unresolvedQuestions: unresolvedQuestions(draft, loreEntries, track),
    },
  };
}

export function IntakeTransmissionPreview({ draft, scene, track, loreEntries }: IntakeTransmissionPreviewProps) {
  return <TransmissionPrivacyPreview data={mapIntakeTransmissionPreviewData(draft, scene, track, loreEntries)} />;
}
