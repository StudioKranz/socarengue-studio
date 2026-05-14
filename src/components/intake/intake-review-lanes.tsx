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

export interface RoutingSignal {
  role: string;
  intensity: "high" | "medium";
  reason: string;
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

function hasLore(loreEntries: LoreEntry[], pattern: RegExp) {
  return loreEntries.some((entry) => pattern.test(`${entry.title} ${entry.category} ${entry.publicText}`));
}

export function buildRoutingSignals(draft: ArtifactIntakeDraft, scene?: Scene, track?: Track, loreEntries: LoreEntry[] = []): RoutingSignal[] {
  const active = new Map<string, RoutingSignal>();
  const artifactType = draft.artifactType;
  const visibility = draft.collaboratorVisibility;
  const reviewState = draft.reviewState;
  const canonState = draft.canonState;
  const trackText = `${track?.title ?? ""} ${track?.moodTags.join(" ") ?? ""} ${track?.publicNotes ?? ""}`;
  const sceneText = `${scene?.title ?? ""} ${scene?.summary ?? ""} ${scene?.emotionalBeat ?? ""}`;

  function wake(role: string, intensity: RoutingSignal["intensity"], reason: string) {
    const existing = active.get(role);
    if (!existing || existing.intensity === "medium") {
      active.set(role, { role, intensity, reason });
    }
  }

  if (reviewState === "needs_music_review") {
    wake("Ovi", "high", "Music review is awake; the rhythm needs legacy listening before it travels.");
    wake("Musician or band collaborator", "high", "Song, likeness, and credit signals need a second ear.");
  }

  if (reviewState === "needs_story_review") {
    wake("Glen", "high", "Story review is awake; pacing and clarity need a close read against the scene.");
  }

  if (reviewState === "needs_art_review") {
    wake("Artist", "high", "Art review is awake; visual continuity and symbol placement need tuning.");
  }

  if (reviewState === "needs_credit_review" || reviewState === "needs_likeness_review") {
    wake("Musician or band collaborator", "high", "Credit or likeness is exposed; this signal should not move alone.");
  }

  if (reviewState === "needs_promo_review" || visibility === "promo_review" || artifactType === "marketing_fragment") {
    wake("Ovi", "high", "Promo-facing material is stirring; Ovi checks whether it feels like Socarengue, not just announcement.");
  }

  if (artifactType === "live_show_material") {
    wake("Ovi", "high", "Live show material touches stage memory and should route through the music lane.");
    wake("Musician or band collaborator", "medium", "Live material may carry performer, venue, or band presence.");
  }

  if (artifactType === "song_reference" || artifactType === "soundtrack_note") {
    wake("Ovi", "high", "A music-bearing artifact needs rhythm and legacy review.");
    wake("Musician or band collaborator", "medium", "Song references may carry credit or usage boundaries.");
  }

  if (artifactType === "comic_page" || artifactType === "dialogue_pass" || artifactType === "script_fragment" || artifactType === "story_document") {
    wake("Glen", "high", "Story material is active; dialogue, pacing, and reveal pressure need reading.");
  }

  if (artifactType === "cover" || artifactType === "issue_artwork" || artifactType === "storyboard" || artifactType === "visual_reference" || artifactType === "final_art") {
    wake("Artist", "high", "Visual material is active; image language and continuity need a visual witness.");
  }

  if (canonState === "candidate_canon" || canonState === "canon" || canonState === "public_canon" || canonState === "mythologized") {
    wake("Josh", "high", "Canon weight is gathering; Josh decides how much truth the archive can safely carry.");
  }

  if (visibility === "public" || visibility === "public_preview" || visibility === "hidden") {
    wake("Josh", "medium", "Visibility is sensitive; the operator lane should protect what can and cannot surface.");
  }

  if (track || /music|song|chorus|rhythm|sound|rail|loop/i.test(trackText)) {
    wake("Ovi", "medium", "A soundtrack thread is attached; the music lane should listen for fit.");
  }

  if (/live|stage|venue|show|band|promo/i.test(`${artifactType} ${visibility} ${trackText} ${sceneText}`)) {
    wake("Ovi", "medium", "Stage or outreach resonance is nearby.");
  }

  if (scene) {
    wake("Glen", "medium", "A linked scene gives this artifact narrative pressure.");
  }

  if (loreEntries.length > 0 || hasLore(loreEntries, /symbol|myth|resonance|city|gold|memory/i)) {
    wake("Josh", "medium", "Lore is attached; the archive needs a canon-safe reading.");
    wake("Artist", "medium", "Linked symbols and mythology may affect visual treatment.");
  }

  if (active.size === 0) {
    wake("Josh", "medium", "The signal is quiet but still needs an operator reading before it enters the archive.");
  }

  return Array.from(active.values()).sort((a, b) => {
    if (a.intensity === b.intensity) {
      return a.role.localeCompare(b.role);
    }

    return a.intensity === "high" ? -1 : 1;
  });
}

export function IntakeReviewLanes({ draft, scene, track, loreEntries }: IntakeReviewLanesProps) {
  const lanes = buildLanes(draft, scene, track, loreEntries);
  const routingSignals = buildRoutingSignals(draft, scene, track, loreEntries);

  return (
    <div className="space-y-6">
      <section className="rounded-[6px] border border-ember/20 bg-ember/5 p-6">
        <MetadataLine label="Signal routing" value="most awake lanes" />
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {routingSignals.map((signal) => (
            <article
              key={signal.role}
              className={`border-l p-4 ${
                signal.intensity === "high"
                  ? "border-ember/70 bg-ember/10"
                  : "border-signal/35 bg-signal/5"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <p className="font-display text-2xl text-paper">{signal.role}</p>
                <span className="text-xs uppercase tracking-[0.2em] text-paper/45">{signal.intensity}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-paper/66">{signal.reason}</p>
            </article>
          ))}
        </div>
      </section>

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
    </div>
  );
}
