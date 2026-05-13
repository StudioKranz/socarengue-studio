import { notFound } from "next/navigation";
import { ArchiveNav } from "@/components/navigation/archive-nav";
import { SceneReader } from "@/components/reader/scene-reader";
import {
  getArtifactsByIds,
  getCharactersByIds,
  getMediaByIds,
  getSceneBySlug,
  getSoundtrackCuesByIds,
} from "@/lib/content/queries";

interface ReaderPageProps {
  params: Promise<{ sceneSlug: string }>;
}

export default async function ReaderPage({ params }: ReaderPageProps) {
  const { sceneSlug } = await params;
  const scene = getSceneBySlug(sceneSlug);

  if (!scene) {
    notFound();
  }

  return (
    <main className="min-h-screen pb-16">
      <ArchiveNav />
      <section className="archive-shell pt-8">
        <SceneReader
          scene={scene}
          characters={getCharactersByIds(scene.characterIds)}
          artifacts={getArtifactsByIds(scene.artifactIds)}
          mediaAssets={getMediaByIds(scene.mediaAssetIds)}
          cues={getSoundtrackCuesByIds(scene.soundtrackCueIds)}
        />
      </section>
    </main>
  );
}
