import { ArchiveNav } from "@/components/navigation/archive-nav";
import { ArtifactGrid } from "@/components/archive/artifact-grid";
import { SignalFrame } from "@/components/ui/signal-frame";
import { MetadataLine } from "@/components/ui/metadata-line";
import { getMediaById, getPublicArtifacts, getSceneById } from "@/lib/content/queries";

export default function ArchivePage() {
  const artifacts = getPublicArtifacts();
  const artifactRecords = artifacts.map((artifact) => ({
    artifact,
    media: getMediaById(artifact.primaryMediaId),
    linkedSceneSlug: getSceneById(artifact.linkedSceneIds[0] ?? "")?.slug,
  }));

  return (
    <main className="min-h-screen pb-16">
      <ArchiveNav />
      <section className="archive-shell space-y-6 pt-8">
        <SignalFrame className="p-8">
          <MetadataLine label="Reader archive" value="curated mythology exhibit" />
          <h1 className="mt-4 font-display text-5xl leading-tight text-paper md:text-7xl">The Opening Exhibit</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-paper/70">
            A focused set of images from The Sticks Return, arranged as the first public window into Socarengue.
          </p>
        </SignalFrame>
        <ArtifactGrid records={artifactRecords} />
      </section>
    </main>
  );
}
