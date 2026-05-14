import type { MediaAsset } from "@/types/content";

interface ArtifactMediaProps {
  media?: MediaAsset;
  priority?: "hero" | "card";
}

export function ArtifactMedia({ media, priority = "card" }: ArtifactMediaProps) {
  const isLocalArtifact = Boolean(media?.source.startsWith("/artifacts/"));
  const ratio = priority === "hero" ? "aspect-[4/5]" : "aspect-[4/3]";

  return (
    <div
      className={`${ratio} overflow-hidden rounded-[6px] border border-paper/12 bg-[radial-gradient(circle_at_30%_20%,rgba(214,163,74,0.3),transparent_18%),radial-gradient(circle_at_80%_10%,rgba(66,213,217,0.24),transparent_20%),linear-gradient(135deg,rgba(216,199,161,0.12),rgba(5,7,11,0.92))] shadow-signal`}
    >
      {isLocalArtifact && media ? (
        <img
          src={media.source}
          alt={media.altText ?? media.title}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full items-end p-5">
          <div>
            <p className="font-display text-2xl text-paper">{media?.title ?? "Unrecovered image"}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.22em] text-paper/45">
              Visual signal pending
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
