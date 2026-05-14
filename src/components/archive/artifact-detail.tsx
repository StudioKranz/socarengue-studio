import Link from "next/link";
import type { Artifact, LoreEntry, MediaAsset, Scene, Track } from "@/types/content";
import { ArtifactMedia } from "@/components/archive/artifact-media";
import { MetadataLine } from "@/components/ui/metadata-line";
import { SignalFrame } from "@/components/ui/signal-frame";

interface ArtifactDetailProps {
  artifact: Artifact;
  media?: MediaAsset;
  scenes: Scene[];
  loreEntries: LoreEntry[];
  tracks: Track[];
}

export function ArtifactDetail({ artifact, media, scenes, loreEntries, tracks }: ArtifactDetailProps) {
  const hasLinkedContext = scenes.length > 0 || loreEntries.length > 0 || tracks.length > 0;

  return (
    <div className="space-y-6">
      <SignalFrame className="p-6 md:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <ArtifactMedia media={media} priority="hero" />
          <div className="flex flex-col justify-center">
            <MetadataLine label="Archive exhibit" value={artifact.classification} />
            <h1 className="mt-4 font-display text-5xl leading-tight text-paper md:text-7xl">{artifact.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-paper/72">{artifact.publicDescription}</p>
            {artifact.transcript ? (
              <blockquote className="mt-8 border-l border-ember/50 pl-5 font-display text-2xl leading-9 text-paper/88">
                {artifact.transcript}
              </blockquote>
            ) : null}
          </div>
        </div>
      </SignalFrame>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section className={`rounded-[6px] border border-paper/12 bg-ink/48 p-6 ${hasLinkedContext ? "" : "lg:col-span-2"}`}>
          <MetadataLine label="Exhibit note" value="public reader archive" />
          <dl className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="border-l border-signal/35 pl-4">
              <dt className="text-xs uppercase tracking-[0.22em] text-signal/75">Collection</dt>
              <dd className="mt-2 font-display text-2xl text-paper">The Sticks Return</dd>
            </div>
            <div className="border-l border-ember/35 pl-4">
              <dt className="text-xs uppercase tracking-[0.22em] text-ember/75">Medium</dt>
              <dd className="mt-2 font-display text-2xl text-paper">{media?.type ?? "image"}</dd>
            </div>
            <div className="border-l border-paper/20 pl-4">
              <dt className="text-xs uppercase tracking-[0.22em] text-paper/48">Archive image</dt>
              <dd className="mt-2 text-sm leading-6 text-paper/70">{media?.title ?? "Unresolved visual source"}</dd>
            </div>
            <div className="border-l border-paper/20 pl-4">
              <dt className="text-xs uppercase tracking-[0.22em] text-paper/48">Reading mode</dt>
              <dd className="mt-2 text-sm leading-6 text-paper/70">Public preview</dd>
            </div>
          </dl>
        </section>

        {hasLinkedContext ? (
          <aside className="space-y-4">
            {scenes.length > 0 ? (
              <section className="rounded-[6px] border border-paper/12 bg-ink/48 p-5">
                <MetadataLine label="Linked scene" value={`${scenes.length} reader connection${scenes.length === 1 ? "" : "s"}`} />
                <div className="mt-4 space-y-3">
                  {scenes.map((scene) => (
                    <Link key={scene.id} href={`/reader/${scene.slug}`} className="block transition hover:text-signal">
                      <p className="font-display text-xl text-paper">{scene.title}</p>
                      <p className="mt-1 text-sm leading-6 text-paper/58">{scene.emotionalBeat}</p>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}

            {loreEntries.length > 0 ? (
              <section className="rounded-[6px] border border-paper/12 bg-ink/48 p-5">
                <MetadataLine label="World trace" value={`${loreEntries.length} linked note${loreEntries.length === 1 ? "" : "s"}`} />
                <div className="mt-4 space-y-3">
                  {loreEntries.map((entry) => (
                    <div key={entry.id}>
                      <p className="font-display text-xl text-paper">{entry.title}</p>
                      <p className="mt-1 text-sm leading-6 text-paper/58">{entry.publicText}</p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {tracks.length > 0 ? (
              <section className="rounded-[6px] border border-signal/20 bg-signal/5 p-5">
                <MetadataLine label="Sound memory" value={`${tracks.length} linked track${tracks.length === 1 ? "" : "s"}`} />
                <div className="mt-4 space-y-3">
                  {tracks.map((track) => (
                    <div key={track.id}>
                      <p className="font-display text-xl text-paper">{track.title}</p>
                      <p className="mt-1 text-sm leading-6 text-paper/62">{track.publicNotes}</p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </aside>
        ) : null}
      </div>
    </div>
  );
}
