import type { StudioWorkflowBoardData } from "@/types/studio-workflow";
import { WorkflowCard } from "@/components/studio/workflow-card";
import { MetadataLine } from "@/components/ui/metadata-line";

interface WorkflowBoardProps {
  workflow: StudioWorkflowBoardData;
}

export function WorkflowBoard({ workflow }: WorkflowBoardProps) {
  return (
    <section className="rounded-[6px] border border-paper/12 bg-ink/42 p-4 md:p-5">
      <div className="flex flex-wrap items-end justify-between gap-4 px-1 pb-4">
        <div>
          <MetadataLine label="Workflow board" value="local placeholder data" />
          <h2 className="mt-2 font-display text-3xl text-paper">Signal Work In Motion</h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-paper/58">{workflow.warning}</p>
      </div>

      <div className="-mx-4 overflow-x-auto px-4 pb-3 md:-mx-5 md:px-5">
        <div className="flex min-w-max gap-4">
          {workflow.columns.map((column) => {
            const tasks = workflow.tasks.filter((task) => task.columnId === column.id);

            return (
              <div
                key={column.id}
                className="min-h-[300px] w-[min(84vw,340px)] min-w-[300px] rounded-[6px] border border-paper/10 bg-storm/28 p-3 md:w-[320px] lg:w-[340px]"
              >
                <div className="mb-4 border-b border-paper/10 pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl leading-6 text-paper">{column.title}</h3>
                    <span className="rounded-[4px] border border-paper/12 px-2 py-1 text-xs text-paper/54">
                      {tasks.length}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-paper/46">{column.signal}</p>
                </div>

                <div className="space-y-3">
                  {tasks.map((task) => (
                    <WorkflowCard key={task.id} task={task} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
