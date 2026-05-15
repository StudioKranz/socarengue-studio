import { notFound } from "next/navigation";
import { ArchiveNav } from "@/components/navigation/archive-nav";
import { PublicSiteShell } from "@/components/navigation/public-site-shell";
import { ArtifactDetail } from "@/components/archive/artifact-detail";
import {
  getArtifactBySlug,
  getLoreByIds,
  getMediaById,
  getPublicArtifacts,
  getScenesByIds,
  getTracksByIds,
} from "@/lib/content/queries";

interface ArtifactDetailPageProps {
  params: Promise<{ artifactSlug: string }>;
}

export function generateStaticParams() {
  return getPublicArtifacts().map((artifact) => ({
    artifactSlug: artifact.slug,
  }));
}

export default async function ArtifactDetailPage({ params }: ArtifactDetailPageProps) {
  const { artifactSlug } = await params;
  const artifact = getArtifactBySlug(artifactSlug);

  if (!artifact) {
    notFound();
  }

  return (
    <PublicSiteShell>
      <main className="min-h-screen pb-16">
        <ArchiveNav />
        <section className="archive-shell pt-8">
          <ArtifactDetail
            artifact={artifact}
            media={getMediaById(artifact.primaryMediaId)}
            scenes={getScenesByIds(artifact.linkedSceneIds)}
            loreEntries={getLoreByIds(artifact.linkedLoreIds)}
            tracks={getTracksByIds(artifact.linkedTrackIds)}
          />
        </section>
      </main>
    </PublicSiteShell>
  );
}
