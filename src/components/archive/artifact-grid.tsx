import type { Artifact } from "@/types/content";
import { ArtifactCard } from "@/components/archive/artifact-card";

interface ArtifactGridProps {
  artifacts: Artifact[];
}

export function ArtifactGrid({ artifacts }: ArtifactGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {artifacts.map((artifact) => (
        <ArtifactCard key={artifact.id} artifact={artifact} />
      ))}
    </div>
  );
}
