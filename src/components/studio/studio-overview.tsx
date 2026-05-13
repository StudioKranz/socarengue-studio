import { IssuePanel } from "@/components/studio/issue-panel";
import { SignalFrame } from "@/components/ui/signal-frame";
import { MetadataLine } from "@/components/ui/metadata-line";
import { getStudioOverview } from "@/lib/content/queries";

type StudioOverviewData = ReturnType<typeof getStudioOverview>;

interface StudioOverviewProps {
  data: StudioOverviewData;
}

export function StudioOverview({ data }: StudioOverviewProps) {
  const counts = [
    ["Scenes", data.scenes.length],
    ["Artifacts", data.artifacts.length],
    ["Lore", data.loreEntries.length],
    ["Tracks", data.tracks.length],
    ["Cues", data.soundtrackCues.length],
    ["Media", data.mediaAssets.length],
  ];

  return (
    <div className="space-y-6">
      <SignalFrame className="p-8">
        <MetadataLine label="Internal prototype" value={data.release.title} />
        <div className="mt-5 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h1 className="font-display text-5xl leading-tight text-paper md:text-6xl">{data.project.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-paper/74">{data.project.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {counts.map(([label, value]) => (
              <div key={label} className="border border-paper/12 bg-ink/42 p-4">
                <p className="font-display text-3xl text-ember">{value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-paper/50">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </SignalFrame>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <IssuePanel issue={data.issue} scenes={data.scenes} />
        <div className="space-y-4 rounded-[6px] border border-paper/12 bg-ink/45 p-6">
          <MetadataLine label="Archive pulse" value="connected story material" />
          {data.artifacts.slice(0, 3).map((artifact) => (
            <div key={artifact.id} className="border-b border-paper/10 pb-4 last:border-b-0 last:pb-0">
              <p className="font-display text-xl text-paper">{artifact.title}</p>
              <p className="mt-2 text-sm leading-6 text-paper/62">{artifact.publicDescription}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
