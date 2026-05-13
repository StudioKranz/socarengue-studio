import type { SoundtrackCue, Track } from "@/types/content";
import { MetadataLine } from "@/components/ui/metadata-line";

interface SoundtrackCueProps {
  cue: SoundtrackCue & { track: Track };
}

function formatDuration(seconds?: number) {
  if (!seconds) {
    return "duration unknown";
  }

  const minutes = Math.floor(seconds / 60);
  const remainder = String(seconds % 60).padStart(2, "0");
  return `${minutes}:${remainder}`;
}

export function SoundtrackCueCard({ cue }: SoundtrackCueProps) {
  return (
    <aside className="rounded-[6px] border border-signal/20 bg-signal/5 p-5 shadow-signal">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-signal/80">Soundtrack cue</p>
          <h3 className="mt-2 font-display text-2xl text-paper">{cue.cueLabel}</h3>
        </div>
        <div className="h-10 w-10 shrink-0 rounded-full border border-ember/40 bg-ember/10 shadow-ember" />
      </div>
      <div className="space-y-2">
        <MetadataLine label="Track" value={`${cue.track.title} by ${cue.track.artist}`} />
        <MetadataLine label="Length" value={formatDuration(cue.track.durationSeconds)} />
        <MetadataLine label="Mood" value={cue.mood} />
      </div>
      <p className="mt-4 border-l border-ember/40 pl-4 text-sm leading-6 text-paper/76">{cue.instruction}</p>
      <p className="mt-4 text-xs uppercase tracking-[0.2em] text-paper/45">Optional listening layer</p>
    </aside>
  );
}
