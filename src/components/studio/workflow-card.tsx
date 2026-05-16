import Link from "next/link";
import type { StudioWorkflowTask } from "@/types/studio-workflow";

const priorityClass: Record<StudioWorkflowTask["priority"], string> = {
  high: "border-blood/50 bg-blood/12 text-paper",
  medium: "border-ember/45 bg-ember/10 text-paper",
  low: "border-signal/35 bg-signal/8 text-paper/80",
};

interface WorkflowCardProps {
  task: StudioWorkflowTask;
}

export function WorkflowCard({ task }: WorkflowCardProps) {
  return (
    <article className="rounded-[6px] border border-paper/12 bg-ink/58 p-4 shadow-[0_18px_48px_rgba(0,0,0,0.22)]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className={`rounded-[4px] border px-2 py-1 text-[0.62rem] uppercase tracking-[0.18em] ${priorityClass[task.priority]}`}>
          {task.priority}
        </span>
        <span className="text-[0.62rem] uppercase tracking-[0.18em] text-paper/36">Placeholder</span>
      </div>

      <h3 className="mt-4 font-display text-xl leading-6 text-paper">{task.title}</h3>
      <p className="mt-3 text-sm leading-6 text-paper/62">{task.summary}</p>

      <dl className="mt-4 space-y-3 text-xs leading-5">
        <div>
          <dt className="uppercase tracking-[0.18em] text-signal/70">Owner</dt>
          <dd className="mt-1 text-paper/70">{task.ownerRole}</dd>
        </div>
        {task.blockedBy ? (
          <div>
            <dt className="uppercase tracking-[0.18em] text-blood/80">Blocked by</dt>
            <dd className="mt-1 text-paper/70">{task.blockedBy}</dd>
          </div>
        ) : null}
        <div>
          <dt className="uppercase tracking-[0.18em] text-ember/80">Next action</dt>
          <dd className="mt-1 text-paper/76">{task.nextAction}</dd>
        </div>
      </dl>

      <div className="mt-4 flex flex-wrap gap-2">
        {task.linkedRecords.map((record) =>
          record.href ? (
            <Link
              key={`${task.id}-${record.type}-${record.label}`}
              href={record.href}
              className="rounded-[4px] border border-signal/20 bg-signal/5 px-2 py-1 text-[0.68rem] uppercase tracking-[0.16em] text-signal/78 transition hover:border-ember hover:text-ember"
            >
              {record.type}: {record.label}
            </Link>
          ) : (
            <span
              key={`${task.id}-${record.type}-${record.label}`}
              className="rounded-[4px] border border-paper/10 px-2 py-1 text-[0.68rem] uppercase tracking-[0.16em] text-paper/46"
            >
              {record.type}: {record.label}
            </span>
          ),
        )}
      </div>
    </article>
  );
}
