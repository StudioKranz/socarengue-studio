import type { LoreEntry, Scene, Track } from "@/types/content";
import type { ArtifactIntakeDraft } from "@/types/intake";
import { ArtifactDossierPreview } from "@/components/archive/artifact-dossier-preview";
import { buildRoutingSignals } from "@/components/intake/intake-review-lanes";

interface IntakeDossierPreviewProps {
  draft: ArtifactIntakeDraft;
  scene?: Scene;
  track?: Track;
  loreEntries: LoreEntry[];
}

function formatValue(value: string) {
  return value.replaceAll("_", " ");
}

function canonFrame(canonState: string) {
  switch (canonState) {
    case "canon":
      return "This signal is carrying locked world truth, but the archive still controls how much light reaches it.";
    case "public_canon":
      return "This truth is nearing public transmission; mystery should remain in the edges, not in missing context.";
    case "candidate_canon":
      return "The object is leaning toward canon. It needs one more listening pass before it becomes fixed memory.";
    case "mythologized":
      return "This may be emotionally true even if the record refuses a clean history.";
    case "contradicted":
      return "This signal conflicts with another account. Preserve the fracture; it may be part of the mythology.";
    default:
      return "This material is still forming. Treat it as a charged reference, not final truth.";
  }
}

export function IntakeDossierPreview({ draft, scene, track, loreEntries }: IntakeDossierPreviewProps) {
  const routingSignals = buildRoutingSignals(draft, scene, track, loreEntries);
  const classification = formatValue(draft.artifactType);

  return (
    <ArtifactDossierPreview
      data={{
        eyebrow: "staged local signal",
        title: draft.title || "Untitled recovered signal",
        classification,
        publicDescription:
          draft.publicDescription ||
          "No public description has been tuned yet. The object is present, but the archive has not decided what it can safely reveal.",
        linkedSceneTitle: scene?.title ?? "unplaced",
        linkedSceneDetail: scene?.emotionalBeat ?? "No scene has answered this object yet.",
        soundtrackTitle: track?.title ?? "silent",
        soundtrackDetail: track?.publicNotes ?? "This dossier can still be read without a listening layer.",
        canonState: formatValue(draft.canonState),
        canonFrame: canonFrame(draft.canonState),
        visibility: formatValue(draft.collaboratorVisibility),
        reviewState: formatValue(draft.reviewState),
        resonanceTags: draft.emotionalResonanceTags,
        loreTraces: loreEntries.map((entry) => ({
          id: entry.id,
          title: entry.title,
          publicText: entry.publicText,
        })),
        routingSignals,
      }}
    />
  );
}
