import type { LoreEntry, Scene, Track } from "@/types/content";
import type { ArtifactIntakeDraft } from "@/types/intake";
import { MetadataLine } from "@/components/ui/metadata-line";

interface IntakeReviewLanesProps {
  draft: ArtifactIntakeDraft;
  scene?: Scene;
  track?: Track;
  loreEntries: LoreEntry[];
}

interface Lane {
  role: string;
  signal: string;
  reading: string;
}

function formatValue(value: string) {
  return value.replaceAll("_", " ");
}

function buildLanes(draft: ArtifactIntakeDraft, scene?: Scene, track?: Track, loreEntries: LoreEntry[] = []): Lane[] {
  const artifactType = formatValue(draft.artifactType);
  const visibility = formatValue(draft.collaboratorVisibility);
  const canonState = formatValue(draft.canonState);
  const reviewState = formatValue(draft.reviewState);
  const sceneName = scene?.title ?? "an unplaced scene";
  const trackName = track?.title ?? "no attached track";
  const loreSignal = loreEntries.length > 0 ? loreEntries.map((entry) => entry.title).join(" / ") : "no linked lore";
  const resonance =
    draft.emotionalResonanceTags.length > 0 ? draft.emotionalResonanceTags.join(" / ") : "no resonance tags";

  return [
    {
      role: "Josh",
      signal: "Archive operator",
      reading: `Decide whether this ${artifactType} should stay ${visibility}, move beyond ${reviewState}, and carry ${canonState} weight before it touches ${sceneName}. Protect the private notes until the public signal is clean.`,
    },
    {
      role: "Ovi",
      signal: "Music and legacy lane",
      reading: `Listen for whether ${trackName} actually belongs to this object. The signal carries ${resonance}; Ovi decides if that rhythm honors the legacy, helps the live mythology, or should remain quiet.`,
    },
    {
      role: "Glen",
      signal: "Story clarity lane",
      reading: `Read the object against ${sceneName}. Glen decides whether the reveal deepens pacing and dialogue, or whether the archive is speaking too early, too plainly, or without enough emotional pressure.`,
    },
    {
      role: "Artist",
      signal: "Visual continuity lane",
      reading: `Check the ${artifactType} against ${loreSignal}. The artist decides what must remain consistent: symbols, page energy, likeness, color temperature, and whether this is reference, revision, or final visual truth.`,
    },
    {
      role: "Musician or band collaborator",
      signal: "Credit and likeness lane",
      reading: `If ${trackName} or a performer identity is near this artifact, this lane decides credit, likeness, song reference, and promo safety before the signal moves from ${visibility} toward any public transmission.`,
    },
  ];
}

export function IntakeReviewLanes({ draft, scene, track, loreEntries }: IntakeReviewLanesProps) {
  const lanes = buildLanes(draft, scene, track, loreEntries);

  return (
    <section className="rounded-[6px] border border-paper/12 bg-ink/48 p-6">
      <MetadataLine label="Collaborator signal lanes" value="local staged reading" />
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {lanes.map((lane) => (
          <article key={lane.role} className="border-l border-signal/30 bg-signal/5 p-4">
            <p className="font-display text-2xl text-paper">{lane.role}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-ember/70">{lane.signal}</p>
            <p className="mt-4 text-sm leading-6 text-paper/66">{lane.reading}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
