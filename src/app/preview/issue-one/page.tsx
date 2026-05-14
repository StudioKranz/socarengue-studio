import type { Metadata } from "next";
import Link from "next/link";
import { getIssueOnePreviewPages } from "@/lib/content/queries";
import { MetadataLine } from "@/components/ui/metadata-line";

export const metadata: Metadata = {
  title: "The Sticks Return | Socarengue Studio",
  description: "A first glimpse from the opening movement of Socarengue Issue One.",
};

export default function IssueOnePreviewPage() {
  const pages = getIssueOnePreviewPages();

  return (
    <main className="min-h-screen pb-20">
      <section className="archive-shell pt-8">
        <div className="mb-8 flex flex-col gap-5 border-b border-paper/12 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <MetadataLine label="Public preview" value="Issue One" />
            <h1 className="mt-3 font-display text-5xl leading-tight text-paper md:text-7xl">
              The Sticks Return
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-paper/68">
              A first glimpse from the opening movement of Socarengue Issue One.
            </p>
          </div>
          <Link
            href="/archive"
            className="w-fit border border-paper/14 bg-ink/52 px-4 py-3 text-xs uppercase tracking-[0.22em] text-paper/58 transition hover:border-signal/50 hover:text-signal"
          >
            Return to archive
          </Link>
        </div>

        <div className="mx-auto max-w-5xl space-y-10">
          {pages.length > 0 ? (
            pages.map(({ artifact, media, label }) => (
              <figure key={artifact.id} className="space-y-3">
                <div className="overflow-hidden rounded-[6px] border border-paper/12 bg-ink/72 shadow-signal">
                  <img
                    src={media.source}
                    alt={media.altText ?? artifact.title}
                    className="h-auto w-full"
                  />
                </div>
                <figcaption className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.22em] text-paper/46">
                  <span>{label}</span>
                  <span>{artifact.classification}</span>
                </figcaption>
              </figure>
            ))
          ) : (
            <section className="rounded-[6px] border border-paper/12 bg-ink/55 p-8">
              <MetadataLine label="Signal absent" value="no local pages found" />
              <p className="mt-4 text-sm leading-6 text-paper/60">
                Issue One pages will appear here once local preview media is represented in the archive.
              </p>
            </section>
          )}
        </div>
      </section>
    </main>
  );
}
