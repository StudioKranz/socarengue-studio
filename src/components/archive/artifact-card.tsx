import Link from "next/link";
import type { Artifact } from "@/types/content";
import { MetadataLine } from "@/components/ui/metadata-line";

interface ArtifactCardProps {
  artifact: Artifact;
}

export function ArtifactCard({ artifact }: ArtifactCardProps) {
  return (
    <article className="group rounded-[6px] border border-paper/12 bg-ink/50 p-5 transition hover:border-signal/40 hover:bg-signal/5">
      <div className="mb-5 aspect-[4/3] rounded-[4px] border border-paper/10 bg-[radial-gradient(circle_at_30%_20%,rgba(214,163,74,0.3),transparent_18%),radial-gradient(circle_at_80%_10%,rgba(66,213,217,0.24),transparent_20%),linear-gradient(135deg,rgba(216,199,161,0.12),rgba(5,7,11,0.92))]" />
      <MetadataLine label="Class" value={artifact.classification} />
      <h2 className="mt-3 font-display text-2xl text-paper">{artifact.title}</h2>
      <p className="mt-3 text-sm leading-6 text-paper/68">{artifact.publicDescription}</p>
      <Link href={`/reader/${artifact.linkedSceneIds[0]?.replace("scene_", "").replaceAll("_", "-") || "rain-signal"}`} className="mt-5 inline-block text-xs uppercase tracking-[0.22em] text-signal transition group-hover:text-ember">
        Trace linked scene
      </Link>
    </article>
  );
}
