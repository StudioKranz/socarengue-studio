import type { StudioCollaboratorSession } from "@/types/studio-workflow";
import { MetadataLine } from "@/components/ui/metadata-line";

interface CollaboratorSessionPanelProps {
  session: StudioCollaboratorSession;
}

export function CollaboratorSessionPanel({ session }: CollaboratorSessionPanelProps) {
  return (
    <section className="rounded-[6px] border border-paper/12 bg-ink/50 p-5">
      <MetadataLine label="Session" value="demo identity only" />
      <div className="mt-4 flex items-center gap-4">
        <div className="grid h-14 w-14 place-items-center rounded-[6px] border border-ember/35 bg-ember/10 font-display text-3xl text-ember">
          {session.name.charAt(0)}
        </div>
        <div>
          <h2 className="font-display text-3xl leading-8 text-paper">{session.name}</h2>
          <p className="text-xs uppercase tracking-[0.2em] text-signal/70">{session.role}</p>
        </div>
      </div>

      <dl className="mt-5 grid gap-3 text-sm leading-6">
        <div className="rounded-[4px] border border-paper/10 bg-paper/[0.03] p-3">
          <dt className="text-[0.68rem] uppercase tracking-[0.18em] text-paper/42">Current focus</dt>
          <dd className="mt-1 text-paper/76">{session.currentFocus}</dd>
        </div>
        <div className="rounded-[4px] border border-blood/24 bg-blood/8 p-3">
          <dt className="text-[0.68rem] uppercase tracking-[0.18em] text-blood/80">Today's signal</dt>
          <dd className="mt-1 text-paper/80">{session.todaysSignal}</dd>
        </div>
      </dl>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-[4px] border border-signal/16 bg-signal/5 p-3">
          <p className="text-[0.68rem] uppercase tracking-[0.18em] text-signal/70">Review lane</p>
          <p className="mt-1 font-display text-lg leading-5 text-paper">Story gaps</p>
        </div>
        <div className="rounded-[4px] border border-ember/18 bg-ember/[0.06] p-3">
          <p className="text-[0.68rem] uppercase tracking-[0.18em] text-ember/75">Session state</p>
          <p className="mt-1 font-display text-lg leading-5 text-paper">Local only</p>
        </div>
      </div>

      <p className="mt-4 border-t border-paper/10 pt-3 text-xs leading-5 text-paper/42">{session.reviewMode}</p>
    </section>
  );
}
