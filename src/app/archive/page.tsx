import { ArchiveNav } from "@/components/navigation/archive-nav";
import { ArtifactGrid } from "@/components/archive/artifact-grid";
import { SignalFrame } from "@/components/ui/signal-frame";
import { MetadataLine } from "@/components/ui/metadata-line";
import { getPublicArtifacts, getSceneById } from "@/lib/content/queries";

export default function ArchivePage() {
  const artifacts = getPublicArtifacts();
  const artifactRecords = artifacts.map((artifact) => ({
    artifact,
    linkedSceneSlug: getSceneById(artifact.linkedSceneIds[0] ?? "")?.slug,
  }));

  return (
    <main className="min-h-screen pb-16">
      <ArchiveNav />
      <section className="archive-shell space-y-6 pt-8">
        <SignalFrame className="p-8">
          <MetadataLine label="Artifact archive" value="released fragments and recovered traces" />
          <h1 className="mt-4 font-display text-5xl leading-tight text-paper md:text-7xl">Recovered Signals</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-paper/70">
            Objects, documents, and sonic fragments that carry the first visible edges of Socarengue mythology.
          </p>
        </SignalFrame>
        <ArtifactGrid records={artifactRecords} />
      </section>
    </main>
  );
}
