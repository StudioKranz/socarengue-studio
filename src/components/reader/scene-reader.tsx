import Link from "next/link";
import type { Artifact, Character, MediaAsset, Scene, SoundtrackCue, Track } from "@/types/content";
import { SoundtrackCueCard } from "@/components/reader/soundtrack-cue";
import { MetadataLine } from "@/components/ui/metadata-line";
import { SignalFrame } from "@/components/ui/signal-frame";

interface SceneReaderProps {
  scene: Scene;
  characters: Character[];
  artifacts: Artifact[];
  mediaAssets: MediaAsset[];
  cues: Array<SoundtrackCue & { track: Track }>;
}

export function SceneReader({ scene, characters, artifacts, mediaAssets, cues }: SceneReaderProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <SignalFrame className="p-6 md:p-10">
        <MetadataLine label="Reader prototype" value={`Scene ${String(scene.sequenceIndex).padStart(2, "0")}`} />
        <h1 className="mt-4 font-display text-5xl leading-tight text-paper md:text-7xl">{scene.title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-paper/70">{scene.summary}</p>
        <div className="my-8 aspect-[16/9] rounded-[6px] border border-paper/12 bg-[radial-gradient(circle_at_25%_20%,rgba(66,213,217,0.26),transparent_18%),radial-gradient(circle_at_65%_10%,rgba(214,163,74,0.2),transparent_16%),linear-gradient(135deg,rgba(23,32,47,0.96),rgba(5,7,11,0.95))] shadow-signal" />
        <div className="max-w-3xl space-y-6 font-display text-2xl leading-10 text-paper/88">
          {scene.scriptText.split(". ").map((line) => (
            <p key={line}>{line.endsWith(".") ? line : `${line}.`}</p>
          ))}
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="border-l border-ember/40 pl-4">
            <MetadataLine label="Emotional beat" value={scene.emotionalBeat} />
            <p className="mt-2 text-sm leading-6 text-paper/64">{scene.visualNotes}</p>
          </div>
          <div className="border-l border-signal/40 pl-4">
            <MetadataLine label="Characters" value={characters.map((character) => character.name).join(" / ")} />
            <p className="mt-2 text-sm leading-6 text-paper/64">
              {mediaAssets.map((asset) => asset.title).join(" / ")}
            </p>
          </div>
        </div>
      </SignalFrame>

      <aside className="space-y-4">
        {cues.map((cue) => (
          <SoundtrackCueCard key={cue.id} cue={cue} />
        ))}
        <div className="rounded-[6px] border border-paper/12 bg-ink/48 p-5">
          <MetadataLine label="Linked artifacts" value={`${artifacts.length} recovered`} />
          <div className="mt-4 space-y-4">
            {artifacts.map((artifact) => (
              <Link key={artifact.id} href="/archive" className="block transition hover:text-signal">
                <p className="font-display text-xl text-paper">{artifact.title}</p>
                <p className="mt-1 text-sm leading-6 text-paper/58">{artifact.publicDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
