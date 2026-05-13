import type { Artifact } from "@/types/content";
import { ArtifactCard } from "@/components/archive/artifact-card";
import { EmptyState } from "@/components/ui/empty-state";

interface ArtifactGridProps {
  records: Array<{
    artifact: Artifact;
    linkedSceneSlug?: string;
  }>;
}

export function ArtifactGrid({ records }: ArtifactGridProps) {
  if (records.length === 0) {
    return (
      <EmptyState
        title="No recovered objects are tuned yet."
        detail="When artifacts are marked public or review-ready, they will appear here as archive fragments."
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {records.map(({ artifact, linkedSceneSlug }) => (
        <ArtifactCard key={artifact.id} artifact={artifact} linkedSceneSlug={linkedSceneSlug} />
      ))}
    </div>
  );
}
