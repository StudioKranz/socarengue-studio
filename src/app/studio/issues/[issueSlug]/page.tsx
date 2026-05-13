import Link from "next/link";
import { notFound } from "next/navigation";
import { ArchiveNav } from "@/components/navigation/archive-nav";
import { SoundtrackCueCard } from "@/components/reader/soundtrack-cue";
import { SignalFrame } from "@/components/ui/signal-frame";
import { MetadataLine } from "@/components/ui/metadata-line";
import { EmptyState } from "@/components/ui/empty-state";
import {
  getArtifactsByIds,
  getCharactersByIds,
  getIssueBySlug,
  getLoreByIds,
  getMediaByIds,
  getScenesForIssue,
  getSoundtrackCuesByIds,
} from "@/lib/content/queries";

interface IssueDetailPageProps {
  params: Promise<{ issueSlug: string }>;
}

export default async function IssueDetailPage({ params }: IssueDetailPageProps) {
  const { issueSlug } = await params;
  const issue = getIssueBySlug(issueSlug);

  if (!issue) {
    notFound();
  }

  const scenes = getScenesForIssue(issue.id);
  const characterIds = Array.from(new Set(scenes.flatMap((scene) => scene.characterIds)));
  const artifactIds = Array.from(new Set(scenes.flatMap((scene) => scene.artifactIds)));
  const mediaIds = Array.from(new Set(scenes.flatMap((scene) => scene.mediaAssetIds)));
  const cueIds = Array.from(new Set(scenes.flatMap((scene) => scene.soundtrackCueIds)));

  const characters = getCharactersByIds(characterIds);
  const artifacts = getArtifactsByIds(artifactIds);
  const lore = getLoreByIds(Array.from(new Set(artifacts.flatMap((artifact) => artifact.linkedLoreIds))));
  const media = getMediaByIds(mediaIds);
  const cues = getSoundtrackCuesByIds(cueIds);

  return (
    <main className="min-h-screen pb-16">
      <ArchiveNav />
      <section className="archive-shell space-y-6 pt-8">
        <SignalFrame className="p-8">
          <MetadataLine label="Issue detail" value={`${issue.visibility} / ${issue.status}`} />
          <h1 className="mt-4 font-display text-5xl leading-tight text-paper md:text-7xl">{issue.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-paper/70">{issue.summary}</p>
        </SignalFrame>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            {scenes.length > 0 ? (
              scenes.map((scene) => (
                <Link
                  href={`/reader/${scene.slug}`}
                  key={scene.id}
                  className="block rounded-[6px] border border-paper/12 bg-ink/50 p-6 transition hover:border-signal/40 hover:bg-signal/5"
                >
                  <MetadataLine label={`Scene ${scene.sequenceIndex}`} value={scene.emotionalBeat} />
                  <h2 className="mt-3 font-display text-3xl text-paper">{scene.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-paper/64">{scene.summary}</p>
                </Link>
              ))
            ) : (
              <EmptyState
                title="This issue has no sequenced scenes yet."
                detail="Scene records will appear here once the transmission has a reading order."
              />
            )}
          </div>

          <aside className="space-y-4">
            <div className="rounded-[6px] border border-paper/12 bg-ink/45 p-5">
              <MetadataLine label="Linked resonance" value="archive inventory" />
              <p className="mt-4 text-sm leading-6 text-paper/65">
                {characters.length} characters, {artifacts.length} artifacts, {lore.length} lore entries,{" "}
                {media.length} media records.
              </p>
            </div>
            {cues.length > 0 ? (
              cues.slice(0, 2).map((cue) => <SoundtrackCueCard key={cue.id} cue={cue} />)
            ) : (
              <EmptyState
                title="No soundtrack cues are tuned."
                detail="Music instructions will surface here when this issue receives listening layers."
              />
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}
