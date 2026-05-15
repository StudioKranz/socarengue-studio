import { ArchiveNav } from "@/components/navigation/archive-nav";
import { PublicSiteShell } from "@/components/navigation/public-site-shell";
import { ArtifactGrid } from "@/components/archive/artifact-grid";
import { SignalFrame } from "@/components/ui/signal-frame";
import { MetadataLine } from "@/components/ui/metadata-line";
import {
  getDevelopmentVaultArtifacts,
  getMediaById,
  getOpeningExhibitArtifacts,
  getSceneById,
} from "@/lib/content/queries";

export default function ArchivePage() {
  const openingExhibitRecords = getOpeningExhibitArtifacts().map((artifact) => ({
    artifact,
    media: getMediaById(artifact.primaryMediaId),
    linkedSceneSlug: getSceneById(artifact.linkedSceneIds[0] ?? "")?.slug,
  }));
  const developmentVaultRecords = getDevelopmentVaultArtifacts().map((artifact) => ({
    artifact,
    media: getMediaById(artifact.primaryMediaId),
    linkedSceneSlug: getSceneById(artifact.linkedSceneIds[0] ?? "")?.slug,
  }));

  return (
    <PublicSiteShell>
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
          <ArtifactGrid records={openingExhibitRecords} />

          <section className="space-y-5 pt-8">
            <div className="border-t border-paper/12 pt-8">
              <MetadataLine label="Development Vault" value="early concepts and visual studies" />
              <h2 className="mt-3 font-display text-4xl leading-tight text-paper md:text-5xl">Development Vault</h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-paper/62">
                Early concepts, alternate pages, layout studies, and visual experiments from the making of the opening movement.
              </p>
            </div>
            <ArtifactGrid records={developmentVaultRecords} archiveMode="vault" />
          </section>
        </section>
      </main>
    </PublicSiteShell>
  );
}
