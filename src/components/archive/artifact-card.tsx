import Link from "next/link";
import type { Artifact, MediaAsset } from "@/types/content";
import { ArtifactMedia } from "@/components/archive/artifact-media";
import { MetadataLine } from "@/components/ui/metadata-line";

interface ArtifactCardProps {
  artifact: Artifact;
  media?: MediaAsset;
  linkedSceneSlug?: string;
}

export function ArtifactCard({ artifact, media, linkedSceneSlug }: ArtifactCardProps) {
  return (
    <article
      id={artifact.slug}
      className="group scroll-mt-24 rounded-[6px] border border-paper/12 bg-ink/50 p-5 transition hover:border-signal/40 hover:bg-signal/5"
    >
      <Link href={`/archive/${artifact.slug}`} aria-label={`Open artifact: ${artifact.title}`}>
        <ArtifactMedia media={media} />
      </Link>
      <MetadataLine label="Exhibit" value={artifact.classification} />
      <h2 className="mt-3 font-display text-2xl text-paper">{artifact.title}</h2>
      <p className="mt-3 text-sm leading-6 text-paper/68">{artifact.publicDescription}</p>
      <div className="mt-5 flex flex-wrap gap-4 text-xs uppercase tracking-[0.22em]">
        {linkedSceneSlug ? (
          <Link href={`/reader/${linkedSceneSlug}`} className="text-signal transition group-hover:text-ember">
            Read linked scene
          </Link>
        ) : null}
        <Link href={`/archive/${artifact.slug}`} className="text-paper/48 transition hover:text-signal">
          View exhibit
        </Link>
      </div>
    </article>
  );
}
