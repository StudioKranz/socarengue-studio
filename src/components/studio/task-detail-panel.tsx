import Link from "next/link";
import type { StudioWorkflowTask } from "@/types/studio-workflow";
import { MetadataLine } from "@/components/ui/metadata-line";

interface TaskDetailPanelProps {
  task: StudioWorkflowTask;
}

export function TaskDetailPanel({ task }: TaskDetailPanelProps) {
  return (
    <aside className="mt-2 rounded-[6px] border border-ember/20 bg-ember/[0.045] p-4 md:p-5">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.45fr)]">
        <div>
          <MetadataLine label="Selected signal" value={`${task.ownerRole} / ${task.priority} priority`} />
          <h3 className="mt-3 font-display text-3xl leading-9 text-paper">{task.title}</h3>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-paper/68">{task.summary}</p>
          <div className="mt-4 rounded-[4px] border border-paper/10 bg-ink/35 p-4">
            <p className="text-[0.68rem] uppercase tracking-[0.18em] text-ember/82">Next action</p>
            <p className="mt-2 text-sm leading-6 text-paper/82">{task.nextAction}</p>
          </div>
          {task.blockedBy ? (
            <div className="mt-3 rounded-[4px] border border-blood/30 bg-blood/10 p-4">
              <p className="text-[0.68rem] uppercase tracking-[0.18em] text-blood/85">Blocker</p>
              <p className="mt-2 text-sm leading-6 text-paper/76">{task.blockedBy}</p>
            </div>
          ) : null}
        </div>

        <div>
          <MetadataLine label="Linked records" value="demo references" />
          <div className="mt-3 space-y-2">
            {task.linkedRecords.map((record) =>
              record.href ? (
                <Link
                  key={`${task.id}-${record.type}-${record.label}`}
                  href={record.href}
                  className="block rounded-[4px] border border-signal/18 bg-signal/5 p-3 transition hover:border-ember hover:text-ember"
                >
                  <span className="text-[0.68rem] uppercase tracking-[0.18em] text-signal/72">{record.type}</span>
                  <span className="mt-1 block text-sm leading-5 text-paper/78">{record.label}</span>
                </Link>
              ) : (
                <div key={`${task.id}-${record.type}-${record.label}`} className="rounded-[4px] border border-paper/10 bg-ink/30 p-3">
                  <span className="text-[0.68rem] uppercase tracking-[0.18em] text-paper/42">{record.type}</span>
                  <span className="mt-1 block text-sm leading-5 text-paper/68">{record.label}</span>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
