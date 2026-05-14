import type { LoreEntry, Scene, Track } from "@/types/content";
import type { ArtifactIntakeDraft, IntakeReviewState } from "@/types/intake";
import {
  PublicationReadinessReading,
  type PublicationReadinessData,
  type PublicationReadinessState,
} from "@/components/archive/publication-readiness-reading";
import { buildRoutingSignals } from "@/components/intake/intake-review-lanes";

interface IntakePublicationReadinessProps {
  draft: ArtifactIntakeDraft;
  scene?: Scene;
  track?: Track;
  loreEntries: LoreEntry[];
}

const reviewStatesThatNeedListening: IntakeReviewState[] = [
  "raw_signal",
  "needs_story_review",
  "needs_music_review",
  "needs_art_review",
  "needs_credit_review",
  "needs_likeness_review",
  "needs_promo_review",
  "revision_requested",
  "blocked",
];

function formatValue(value: string) {
  return value.replaceAll("_", " ");
}

function hasPublicDescription(draft: ArtifactIntakeDraft) {
  return draft.publicDescription.trim().length >= 80;
}

function hasPrivateMemory(draft: ArtifactIntakeDraft) {
  return draft.privateNotes.trim().length >= 24;
}

function hasPublicVisibility(draft: ArtifactIntakeDraft) {
  return draft.collaboratorVisibility === "public" || draft.collaboratorVisibility === "public_preview";
}

function hasPublicCanonShape(draft: ArtifactIntakeDraft) {
  return draft.canonState === "canon" || draft.canonState === "public_canon" || draft.canonState === "mythologized";
}

function hasUnstableCanonShape(draft: ArtifactIntakeDraft) {
  return draft.canonState === "contradicted" || draft.canonState === "retired" || draft.canonState === "non_canon_process";
}

function hasReviewWeather(draft: ArtifactIntakeDraft) {
  return reviewStatesThatNeedListening.includes(draft.reviewState);
}

function soundtrackNeedsProtection(draft: ArtifactIntakeDraft, track?: Track) {
  return Boolean(
    track &&
      (draft.reviewState === "needs_music_review" ||
        draft.reviewState === "needs_credit_review" ||
        draft.reviewState === "needs_likeness_review" ||
        draft.collaboratorVisibility === "music_review" ||
        draft.collaboratorVisibility === "private" ||
        draft.collaboratorVisibility === "hidden"),
  );
}

function buildMustResolve(draft: ArtifactIntakeDraft, scene?: Scene, track?: Track, loreEntries: LoreEntry[] = []) {
  const resolve: string[] = [];

  if (!hasPublicVisibility(draft)) {
    resolve.push("Retune visibility toward public preview before audience discovery.");
  }

  if (!hasPublicCanonShape(draft)) {
    resolve.push("Name the canon weight so the audience receives mystery, not uncertainty.");
  }

  if (hasUnstableCanonShape(draft)) {
    resolve.push("Keep the fracture private until Josh decides whether contradiction belongs in the myth.");
  }

  if (hasReviewWeather(draft)) {
    resolve.push(`Let the ${formatValue(draft.reviewState)} weather pass through the right listener.`);
  }

  if (!hasPrivateMemory(draft)) {
    resolve.push("Write enough operator memory for collaborators to understand what must stay protected.");
  }

  if (!hasPublicDescription(draft)) {
    resolve.push("Tune the public description until it can carry atmosphere without leaking the studio process.");
  }

  if (!scene) {
    resolve.push("Bind the object to a scene so the archive knows where the signal echoes.");
  }

  if (loreEntries.length === 0) {
    resolve.push("Attach at least one lore trace before the object travels.");
  }

  if (!track) {
    resolve.push("Decide whether silence is intentional or whether a soundtrack cue should shadow the object.");
  }

  if (soundtrackNeedsProtection(draft, track)) {
    resolve.push("Protect the listening layer until music, credit, and likeness boundaries are clear.");
  }

  return resolve;
}

function buildSafeToShow(draft: ArtifactIntakeDraft, scene?: Scene, track?: Track, loreEntries: LoreEntry[] = []) {
  const safe: string[] = [];
  const title = draft.title.trim();

  if (title) {
    safe.push(`Title: ${title}`);
  }

  safe.push(`Classification: ${formatValue(draft.artifactType)}`);

  if (draft.publicDescription.trim()) {
    safe.push("Public description can surface as a controlled archive fragment.");
  }

  if (draft.emotionalResonanceTags.length > 0) {
    safe.push(`Resonance: ${draft.emotionalResonanceTags.join(" / ")}`);
  }

  if (scene) {
    safe.push(`Linked scene title: ${scene.title}`);
  }

  if (loreEntries.length > 0) {
    safe.push(`Lore trace${loreEntries.length === 1 ? "" : "s"}: ${loreEntries.map((entry) => entry.title).join(" / ")}`);
  }

  if (track && !soundtrackNeedsProtection(draft, track) && hasPublicVisibility(draft)) {
    safe.push(`Soundtrack cue: ${track.title}`);
  }

  if (!hasUnstableCanonShape(draft)) {
    safe.push(`Canon framing: ${formatValue(draft.canonState)}`);
  }

  return safe;
}

function chooseReadinessState(draft: ArtifactIntakeDraft, mustResolve: string[], routingCount: number): PublicationReadinessState {
  if (draft.collaboratorVisibility === "private" || draft.collaboratorVisibility === "hidden" || draft.reviewState === "blocked") {
    return "keep private";
  }

  if (hasUnstableCanonShape(draft)) {
    return "keep private";
  }

  if (hasReviewWeather(draft) || routingCount > 2) {
    return "needs listening";
  }

  if (mustResolve.length === 0 && draft.reviewState === "approved_for_release" && hasPublicVisibility(draft)) {
    return "sealed";
  }

  return "nearly ready";
}

function explanationFor(state: PublicationReadinessState) {
  switch (state) {
    case "sealed":
      return "The archive hears a steady signal. It can travel toward public preview with its mystery intact and its private memory protected.";
    case "nearly ready":
      return "The signal is close to the surface. A few shadows still need tuning before the audience receives it as recovered mythology.";
    case "needs listening":
      return "The archive hears movement in the collaborator lanes. Let the right listener answer before the object travels.";
    case "keep private":
    default:
      return "The signal should remain inside the studio chamber. Public display would expose too much uncertainty, process, or protected memory.";
  }
}

export function mapIntakePublicationReadinessData(
  draft: ArtifactIntakeDraft,
  scene?: Scene,
  track?: Track,
  loreEntries: LoreEntry[] = [],
): PublicationReadinessData {
  const routingSignals = buildRoutingSignals(draft, scene, track, loreEntries);
  const mustResolve = buildMustResolve(draft, scene, track, loreEntries);
  const safeToShow = buildSafeToShow(draft, scene, track, loreEntries);
  const state = chooseReadinessState(draft, mustResolve, routingSignals.filter((signal) => signal.intensity === "high").length);
  const nextLane = routingSignals[0] ?? {
    role: "Josh",
    reason: "The operator lane should hold the signal until the archive understands its public face.",
  };

  return {
    state,
    explanation: explanationFor(state),
    mustResolve,
    nextLane: {
      role: nextLane.role,
      reason: nextLane.reason,
    },
    safeToShow,
  };
}

export function IntakePublicationReadiness({ draft, scene, track, loreEntries }: IntakePublicationReadinessProps) {
  return <PublicationReadinessReading data={mapIntakePublicationReadinessData(draft, scene, track, loreEntries)} />;
}
