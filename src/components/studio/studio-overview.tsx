import { ArtifactUploadShell } from "@/components/studio/artifact-upload-shell";
import { CollaboratorSessionPanel } from "@/components/studio/collaborator-session-panel";
import { IssuePanel } from "@/components/studio/issue-panel";
import { StudioCopilotPanel } from "@/components/studio/studio-copilot-panel";
import { WorkflowBoard } from "@/components/studio/workflow-board";
import { SignalFrame } from "@/components/ui/signal-frame";
import { MetadataLine } from "@/components/ui/metadata-line";
import { EmptyState } from "@/components/ui/empty-state";
import { getStudioOverview } from "@/lib/content/queries";
import type { StudioWorkflowBoardData } from "@/types/studio-workflow";

type StudioOverviewData = ReturnType<typeof getStudioOverview>;

interface StudioOverviewProps {
  data: StudioOverviewData;
  workflow: StudioWorkflowBoardData;
}

export function StudioOverview({ data, workflow }: StudioOverviewProps) {
  const inventory = [
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
        <MetadataLine label="Studio transmission" value={data.release.title} />
        <div className="mt-5 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h1 className="font-display text-5xl leading-tight text-paper md:text-6xl">{data.project.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-paper/74">{data.project.description}</p>
            <p className="mt-4 max-w-3xl border-l border-ember/40 pl-4 text-sm leading-6 text-ember/82">
              Studio Mode is the internal workspace for socarengue.studio. This proof uses placeholder workflow data only;
              public reader/archive pages on socarengue.com remain separate.
            </p>
          </div>
          <div>
            <MetadataLine label="Signal index" value="archive inventory" />
            <div className="mt-4 grid grid-cols-2 gap-3">
              {inventory.map(([label, value]) => (
                <div key={label} className="border border-paper/12 bg-ink/42 p-4">
                  <p className="font-display text-3xl text-ember">{value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-paper/50">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SignalFrame>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <IssuePanel issue={data.issue} scenes={data.scenes} />
        <div className="space-y-4 rounded-[6px] border border-paper/12 bg-ink/45 p-6">
          <MetadataLine label="Archive pulse" value="connected story material" />
          {data.artifacts.length > 0 ? (
            data.artifacts.slice(0, 3).map((artifact) => (
              <div key={artifact.id} className="border-b border-paper/10 pb-4 last:border-b-0 last:pb-0">
                <p className="font-display text-xl text-paper">{artifact.title}</p>
                <p className="mt-2 text-sm leading-6 text-paper/62">{artifact.publicDescription}</p>
              </div>
            ))
          ) : (
            <EmptyState
              title="No artifacts have surfaced."
              detail="Recovered objects will gather here once the issue begins to transmit evidence."
            />
          )}
        </div>
      </div>

      <div className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_360px]">
        <WorkflowBoard workflow={workflow} />
        <div className="space-y-6">
          <CollaboratorSessionPanel session={workflow.collaboratorSession} />
          <StudioCopilotPanel suggestions={workflow.copilotSuggestions} />
          <ArtifactUploadShell shell={workflow.artifactUploadShell} />
        </div>
      </div>
    </div>
  );
}
