"use client";

import { useMemo, useState } from "react";
import type { Issue, LoreEntry, Scene, Track } from "@/types/content";
import type {
  ArtifactIntakeDraft,
  IntakeArtifactType,
  IntakeCanonState,
  IntakeReviewState,
  IntakeVisibility,
} from "@/types/intake";
import { IntakeEmptyState } from "@/components/intake/intake-empty-state";
import { IntakeDossierPreview } from "@/components/intake/intake-dossier-preview";
import { IntakeField } from "@/components/intake/intake-field";
import { IntakePublicationReadiness } from "@/components/intake/intake-publication-readiness";
import { IntakeReviewLanes } from "@/components/intake/intake-review-lanes";
import { IntakeTransmissionPreview } from "@/components/intake/intake-transmission-preview";
import { MetadataLine } from "@/components/ui/metadata-line";
import { SignalFrame } from "@/components/ui/signal-frame";

const artifactTypes: Array<{ value: IntakeArtifactType; label: string }> = [
  { value: "comic_page", label: "Comic page" },
  { value: "cover", label: "Cover" },
  { value: "issue_artwork", label: "Issue artwork" },
  { value: "storyboard", label: "Storyboard" },
  { value: "script_fragment", label: "Script fragment" },
  { value: "dialogue_pass", label: "Dialogue pass" },
  { value: "story_document", label: "Story document" },
  { value: "mythology_note", label: "Mythology note" },
  { value: "visual_reference", label: "Visual reference" },
  { value: "final_art", label: "Final art" },
  { value: "soundtrack_note", label: "Soundtrack note" },
  { value: "song_reference", label: "Song reference" },
  { value: "live_show_material", label: "Live show material" },
  { value: "marketing_fragment", label: "Marketing fragment" },
  { value: "collaborator_note", label: "Collaborator note" },
  { value: "physical_scan", label: "Physical scan" },
  { value: "qr_linked_object", label: "QR-linked object" },
];

const visibilityOptions: Array<{ value: IntakeVisibility; label: string }> = [
  { value: "private", label: "Private operator signal" },
  { value: "collaborator_review", label: "Collaborator review" },
  { value: "music_review", label: "Music review" },
  { value: "art_review", label: "Art review" },
  { value: "story_review", label: "Story review" },
  { value: "promo_review", label: "Promo review" },
  { value: "public_preview", label: "Public preview" },
  { value: "public", label: "Public transmission" },
  { value: "hidden", label: "Hidden resonance" },
];

const reviewOptions: Array<{ value: IntakeReviewState; label: string }> = [
  { value: "raw_signal", label: "Raw signal" },
  { value: "cataloged", label: "Cataloged" },
  { value: "needs_story_review", label: "Needs story review" },
  { value: "needs_music_review", label: "Needs music review" },
  { value: "needs_art_review", label: "Needs art review" },
  { value: "needs_credit_review", label: "Needs credit review" },
  { value: "needs_likeness_review", label: "Needs likeness review" },
  { value: "needs_promo_review", label: "Needs promo review" },
  { value: "revision_requested", label: "Revision requested" },
  { value: "approved_for_internal_use", label: "Approved for internal use" },
  { value: "approved_for_release", label: "Approved for release" },
  { value: "blocked", label: "Blocked" },
  { value: "archived", label: "Archived" },
];

const canonOptions: Array<{ value: IntakeCanonState; label: string }> = [
  { value: "non_canon_process", label: "Non-canon process" },
  { value: "reference_only", label: "Reference only" },
  { value: "candidate_canon", label: "Candidate canon" },
  { value: "canon", label: "Canon" },
  { value: "public_canon", label: "Public canon" },
  { value: "contradicted", label: "Contradicted account" },
  { value: "mythologized", label: "Mythologized truth" },
  { value: "retired", label: "Retired signal" },
];

const resonanceOptions = ["memory", "warning", "devotion", "city memory", "gold ink", "rain", "legacy", "rupture"];

const inputClass =
  "w-full rounded-[4px] border border-paper/14 bg-ink/72 px-4 py-3 text-sm text-paper outline-none transition placeholder:text-paper/28 focus:border-signal focus:bg-signal/5";

const initialDraft: ArtifactIntakeDraft = {
  title: "",
  artifactType: "issue_artwork",
  issueId: "",
  sceneId: "",
  collaboratorVisibility: "private",
  canonState: "reference_only",
  reviewState: "raw_signal",
  publicDescription: "",
  privateNotes: "",
  soundtrackTrackId: "",
  linkedLoreIds: [],
  emotionalResonanceTags: [],
};

interface IntakeConsoleProps {
  issues: Issue[];
  scenes: Scene[];
  loreEntries: LoreEntry[];
  tracks: Track[];
}

export function IntakeConsole({ issues, scenes, loreEntries, tracks }: IntakeConsoleProps) {
  const [draft, setDraft] = useState<ArtifactIntakeDraft>(() => ({
    ...initialDraft,
    issueId: issues[0]?.id ?? "",
    sceneId: scenes[0]?.id ?? "",
    soundtrackTrackId: tracks[0]?.id ?? "",
    linkedLoreIds: loreEntries.slice(0, 1).map((entry) => entry.id),
    emotionalResonanceTags: ["memory", "city memory"],
  }));

  const [stagedDraft, setStagedDraft] = useState<ArtifactIntakeDraft | null>(null);

  const selectedIssue = useMemo(() => issues.find((issue) => issue.id === draft.issueId), [draft.issueId, issues]);
  const selectedScene = useMemo(() => scenes.find((scene) => scene.id === draft.sceneId), [draft.sceneId, scenes]);
  const selectedTrack = useMemo(() => tracks.find((track) => track.id === draft.soundtrackTrackId), [draft.soundtrackTrackId, tracks]);
  const selectedLore = useMemo(
    () => loreEntries.filter((entry) => draft.linkedLoreIds.includes(entry.id)),
    [draft.linkedLoreIds, loreEntries],
  );
  const stagedScene = useMemo(
    () => scenes.find((scene) => scene.id === stagedDraft?.sceneId),
    [stagedDraft?.sceneId, scenes],
  );
  const stagedTrack = useMemo(
    () => tracks.find((track) => track.id === stagedDraft?.soundtrackTrackId),
    [stagedDraft?.soundtrackTrackId, tracks],
  );
  const stagedLore = useMemo(
    () => loreEntries.filter((entry) => stagedDraft?.linkedLoreIds.includes(entry.id)),
    [stagedDraft?.linkedLoreIds, loreEntries],
  );

  function updateDraft<K extends keyof ArtifactIntakeDraft>(key: K, value: ArtifactIntakeDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function toggleValue(key: "linkedLoreIds" | "emotionalResonanceTags", value: string) {
    setDraft((current) => {
      const existing = current[key];
      return {
        ...current,
        [key]: existing.includes(value) ? existing.filter((item) => item !== value) : [...existing, value],
      };
    });
  }

  return (
    <div className="space-y-6">
      <SignalFrame className="p-6 md:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <MetadataLine label="Intake chamber" value="local signal staging only" />
            <h1 className="mt-4 font-display text-5xl leading-tight text-paper md:text-7xl">
              Catalog a Recovered Transmission
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-paper/72">
              Place a fragment into the Socarengue archive, tune its resonance, and mark who must read, hear, or protect it before it becomes canon.
            </p>
          </div>
          <div className="rounded-[6px] border border-ember/20 bg-ember/5 p-5">
            <MetadataLine label="Boundary" value="no save operation" />
            <p className="mt-4 text-sm leading-6 text-paper/68">
              This chamber uses local React state only. The staged signal disappears on refresh and does not touch Supabase, storage, auth, or external services.
            </p>
          </div>
        </div>
      </SignalFrame>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <section className="space-y-5 rounded-[6px] border border-paper/12 bg-ink/48 p-6">
          <div className="transmission-line" />
          <div className="grid gap-5 md:grid-cols-2">
            <IntakeField label="Artifact title" signal="Name the object as it should appear in the archive.">
              <input
                className={inputClass}
                value={draft.title}
                onChange={(event) => updateDraft("title", event.target.value)}
                placeholder="Example: Ovi Underpass Cover Study"
              />
            </IntakeField>

            <IntakeField label="Artifact type" signal="Choose the closest story function.">
              <select
                className={inputClass}
                value={draft.artifactType}
                onChange={(event) => updateDraft("artifactType", event.target.value as IntakeArtifactType)}
              >
                {artifactTypes.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </IntakeField>

            <IntakeField label="Issue connection" signal="Where this signal first belongs.">
              <select className={inputClass} value={draft.issueId} onChange={(event) => updateDraft("issueId", event.target.value)}>
                {issues.map((issue) => (
                  <option key={issue.id} value={issue.id}>
                    {issue.title}
                  </option>
                ))}
              </select>
            </IntakeField>

            <IntakeField label="Scene connection" signal="The scene that answers back.">
              <select className={inputClass} value={draft.sceneId} onChange={(event) => updateDraft("sceneId", event.target.value)}>
                {scenes.map((scene) => (
                  <option key={scene.id} value={scene.id}>
                    {scene.title}
                  </option>
                ))}
              </select>
            </IntakeField>

            <IntakeField label="Collaborator visibility" signal="Who is allowed to receive the signal.">
              <select
                className={inputClass}
                value={draft.collaboratorVisibility}
                onChange={(event) => updateDraft("collaboratorVisibility", event.target.value as IntakeVisibility)}
              >
                {visibilityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </IntakeField>

            <IntakeField label="Canon state" signal="How close this object sits to story truth.">
              <select
                className={inputClass}
                value={draft.canonState}
                onChange={(event) => updateDraft("canonState", event.target.value as IntakeCanonState)}
              >
                {canonOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </IntakeField>

            <IntakeField label="Review state" signal="Which review lane should wake up next.">
              <select
                className={inputClass}
                value={draft.reviewState}
                onChange={(event) => updateDraft("reviewState", event.target.value as IntakeReviewState)}
              >
                {reviewOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </IntakeField>

            <IntakeField label="Soundtrack connection" signal="Attach the rhythm that shadows the object.">
              <select
                className={inputClass}
                value={draft.soundtrackTrackId}
                onChange={(event) => updateDraft("soundtrackTrackId", event.target.value)}
              >
                {tracks.map((track) => (
                  <option key={track.id} value={track.id}>
                    {track.title}
                  </option>
                ))}
              </select>
            </IntakeField>
          </div>

          <IntakeField label="Public description" signal="What the archive may reveal without giving away the private truth.">
            <textarea
              className={`${inputClass} min-h-32 resize-y leading-6`}
              value={draft.publicDescription}
              onChange={(event) => updateDraft("publicDescription", event.target.value)}
              placeholder="Describe the fragment as recovered evidence, not as a production upload."
            />
          </IntakeField>

          <IntakeField label="Private notes" signal="Operator memory. This stays out of public archive surfaces.">
            <textarea
              className={`${inputClass} min-h-28 resize-y leading-6`}
              value={draft.privateNotes}
              onChange={(event) => updateDraft("privateNotes", event.target.value)}
              placeholder="What Josh, Ovi, Glen, artists, or musicians need to know before this moves."
            />
          </IntakeField>

          <div className="grid gap-5 md:grid-cols-2">
            <fieldset className="rounded-[6px] border border-paper/12 bg-ink/38 p-4">
              <legend className="px-2 text-xs uppercase tracking-[0.22em] text-signal/75">Linked lore</legend>
              <div className="mt-3 space-y-3">
                {loreEntries.length > 0 ? (
                  loreEntries.map((entry) => (
                    <label key={entry.id} className="flex items-start gap-3 text-sm leading-6 text-paper/70">
                      <input
                        type="checkbox"
                        checked={draft.linkedLoreIds.includes(entry.id)}
                        onChange={() => toggleValue("linkedLoreIds", entry.id)}
                        className="mt-1 accent-cyan-300"
                      />
                      <span>
                        <span className="block font-display text-lg text-paper">{entry.title}</span>
                        <span className="text-paper/48">{entry.category}</span>
                      </span>
                    </label>
                  ))
                ) : (
                  <IntakeEmptyState title="No lore fragments are awake." detail="Lore links will appear here as the mythology expands." />
                )}
              </div>
            </fieldset>

            <fieldset className="rounded-[6px] border border-paper/12 bg-ink/38 p-4">
              <legend className="px-2 text-xs uppercase tracking-[0.22em] text-ember/75">Emotional resonance</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {resonanceOptions.map((tag) => {
                  const selected = draft.emotionalResonanceTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleValue("emotionalResonanceTags", tag)}
                      className={`rounded-full border px-3 py-2 text-xs uppercase tracking-[0.16em] transition ${
                        selected
                          ? "border-ember/60 bg-ember/14 text-ember"
                          : "border-paper/14 bg-ink/40 text-paper/52 hover:border-signal/50 hover:text-signal"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </div>

          <button
            type="button"
            onClick={() => setStagedDraft(draft)}
            className="border border-ember/50 bg-ember/12 px-5 py-3 text-xs uppercase tracking-[0.24em] text-ember transition hover:border-signal hover:text-signal"
          >
            Stage local signal
          </button>
        </section>

        <aside className="space-y-5">
          <section className="rounded-[6px] border border-paper/12 bg-ink/48 p-5">
            <MetadataLine label="Current tuning" value="unsaved archive reading" />
            <h2 className="mt-4 font-display text-3xl leading-tight text-paper">
              {draft.title || "Untitled recovered signal"}
            </h2>
            <div className="mt-5 space-y-3 text-sm leading-6 text-paper/65">
              <p>
                <span className="text-signal/80">Issue:</span> {selectedIssue?.title ?? "No issue selected"}
              </p>
              <p>
                <span className="text-signal/80">Scene:</span> {selectedScene?.title ?? "No scene selected"}
              </p>
              <p>
                <span className="text-signal/80">Sound:</span> {selectedTrack?.title ?? "No track selected"}
              </p>
              <p>
                <span className="text-signal/80">Canon:</span> {draft.canonState.replaceAll("_", " ")}
              </p>
              <p>
                <span className="text-signal/80">Review:</span> {draft.reviewState.replaceAll("_", " ")}
              </p>
            </div>
          </section>

          <section className="rounded-[6px] border border-paper/12 bg-ink/48 p-5">
            <MetadataLine label="Mythic links" value={`${selectedLore.length} active`} />
            <div className="mt-4 space-y-3">
              {selectedLore.length > 0 ? (
                selectedLore.map((entry) => (
                  <div key={entry.id} className="border-l border-ember/35 pl-4">
                    <p className="font-display text-xl text-paper">{entry.title}</p>
                    <p className="mt-1 text-sm leading-6 text-paper/58">{entry.publicText}</p>
                  </div>
                ))
              ) : (
                <IntakeEmptyState title="No mythology is attached." detail="Choose lore fragments to anchor the signal inside the world." />
              )}
            </div>
          </section>

          <section className="rounded-[6px] border border-signal/20 bg-signal/5 p-5">
            <MetadataLine label="Local staging" value="not persisted" />
            {stagedDraft ? (
              <div className="mt-4">
                <p className="font-display text-2xl text-paper">{stagedDraft.title || "Untitled signal staged"}</p>
                <p className="mt-3 text-sm leading-6 text-paper/62">
                  This signal is staged in browser memory only. A future Supabase pass would turn this into an artifact row, relationship rows, review assignments, and storage-backed media.
                </p>
              </div>
            ) : (
              <IntakeEmptyState
                title="No signal has been staged."
                detail="Tune the fields, then stage the local signal to preview how intake will feel."
              />
            )}
          </section>
        </aside>
      </div>

      {stagedDraft ? (
        <>
          <IntakeDossierPreview draft={stagedDraft} scene={stagedScene} track={stagedTrack} loreEntries={stagedLore} />
          <IntakeTransmissionPreview draft={stagedDraft} scene={stagedScene} track={stagedTrack} loreEntries={stagedLore} />
          <IntakePublicationReadiness draft={stagedDraft} scene={stagedScene} track={stagedTrack} loreEntries={stagedLore} />
          <IntakeReviewLanes draft={stagedDraft} scene={stagedScene} track={stagedTrack} loreEntries={stagedLore} />
        </>
      ) : null}
    </div>
  );
}
