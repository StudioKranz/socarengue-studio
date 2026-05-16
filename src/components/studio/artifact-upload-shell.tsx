import Link from "next/link";
import type { StudioArtifactUploadShell } from "@/types/studio-workflow";
import { MetadataLine } from "@/components/ui/metadata-line";

interface ArtifactUploadShellProps {
  shell: StudioArtifactUploadShell;
}

export function ArtifactUploadShell({ shell }: ArtifactUploadShellProps) {
  return (
    <section className="rounded-[6px] border border-ember/18 bg-ember/[0.04] p-5">
      <MetadataLine label="Intake shell" value="no upload operation" />
      <h2 className="mt-3 font-display text-3xl leading-8 text-paper">{shell.title}</h2>
      <p className="mt-3 text-sm leading-6 text-paper/62">{shell.description}</p>

      <div className="mt-5 space-y-2">
        {shell.fields.map((field) => (
          <div key={field.label} className="grid gap-1 rounded-[4px] border border-paper/10 bg-ink/35 p-3">
            <span className="text-[0.68rem] uppercase tracking-[0.18em] text-paper/42">{field.label}</span>
            <span className="text-sm leading-5 text-paper/74">{field.value}</span>
          </div>
        ))}
      </div>

      <Link
        href={shell.href}
        className="mt-5 inline-block text-xs uppercase tracking-[0.2em] text-ember transition hover:text-signal"
      >
        {shell.actionLabel}
      </Link>
    </section>
  );
}
