import Link from "next/link";
import type { Artifact, MediaAsset } from "@/types/content";
import { ArtifactMedia } from "@/components/archive/artifact-media";
import { MetadataLine } from "@/components/ui/metadata-line";

interface ArtifactCardProps {
  artifact: Artifact;
  media?: MediaAsset;
  linkedSceneSlug?: string;
  archiveMode?: "exhibit" | "vault";
}

export function ArtifactCard({ artifact, media, linkedSceneSlug, archiveMode = "exhibit" }: ArtifactCardProps) {
  const isVault = archiveMode === "vault";

  return (
    <article
      id={artifact.slug}
      className={`group scroll-mt-24 rounded-[6px] border p-5 transition hover:border-signal/40 ${
        isVault ? "border-paper/10 bg-ink/36 hover:bg-paper/5" : "border-paper/12 bg-ink/50 hover:bg-signal/5"
      }`}
    >
      <Link href={`/archive/${artifact.slug}`} aria-label={`Open artifact: ${artifact.title}`}>
        <ArtifactMedia media={media} />
      </Link>
      <MetadataLine label={isVault ? "Development material" : "Exhibit"} value={artifact.classification} />
      <h2 className="mt-3 font-display text-2xl text-paper">{artifact.title}</h2>
      <p className="mt-3 text-sm leading-6 text-paper/68">{artifact.publicDescription}</p>
      {isVault ? (
        <p className="mt-3 border-l border-ember/30 pl-3 text-xs uppercase tracking-[0.18em] text-ember/62">
          Not a finished canon page
        </p>
      ) : null}
      <div className="mt-5 flex flex-wrap gap-4 text-xs uppercase tracking-[0.22em]">
        {linkedSceneSlug ? (
          <Link href={`/reader/${linkedSceneSlug}`} className="text-signal transition group-hover:text-ember">
            Read linked scene
          </Link>
        ) : null}
        <Link href={`/archive/${artifact.slug}`} className="text-paper/48 transition hover:text-signal">
          {isVault ? "View study" : "View exhibit"}
        </Link>
      </div>
    </article>
  );
}
