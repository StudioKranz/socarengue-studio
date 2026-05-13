import Link from "next/link";
import type { Issue, Scene } from "@/types/content";
import { MetadataLine } from "@/components/ui/metadata-line";

interface IssuePanelProps {
  issue: Issue;
  scenes: Scene[];
}

export function IssuePanel({ issue, scenes }: IssuePanelProps) {
  return (
    <div className="rounded-[6px] border border-paper/12 bg-ink/45 p-6">
      <MetadataLine label="Current issue" value={`No. ${issue.issueNumber} / ${issue.status}`} />
      <h2 className="mt-3 font-display text-3xl text-paper">{issue.title}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-paper/70">{issue.summary}</p>
      <div className="mt-6 space-y-3">
        {scenes.map((scene) => (
          <Link
            href={`/reader/${scene.slug}`}
            key={scene.id}
            className="block border-l border-signal/30 bg-signal/5 px-4 py-3 transition hover:border-ember hover:bg-ember/5"
          >
            <span className="text-xs uppercase tracking-[0.22em] text-signal/80">
              Scene {String(scene.sequenceIndex).padStart(2, "0")}
            </span>
            <p className="mt-1 font-display text-xl text-paper">{scene.title}</p>
            <p className="mt-1 text-sm text-paper/60">{scene.emotionalBeat}</p>
          </Link>
        ))}
      </div>
      <Link
        href={`/studio/issues/${issue.slug}`}
        className="mt-6 inline-block text-xs uppercase tracking-[0.22em] text-ember transition hover:text-signal"
      >
        Open issue detail
      </Link>
    </div>
  );
}
