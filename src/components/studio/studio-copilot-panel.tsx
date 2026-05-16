import Link from "next/link";
import type { StudioCopilotSuggestion, StudioWorkflowTask } from "@/types/studio-workflow";
import { MetadataLine } from "@/components/ui/metadata-line";

interface StudioCopilotPanelProps {
  suggestions: StudioCopilotSuggestion[];
  tasks: StudioWorkflowTask[];
}

export function StudioCopilotPanel({ suggestions, tasks }: StudioCopilotPanelProps) {
  const taskTitleById = new Map(tasks.map((task) => [task.id, task.title]));

  return (
    <aside className="rounded-[6px] border border-signal/18 bg-signal/5 p-5">
      <MetadataLine label="Copilot shell" value="no external AI call" />
      <h2 className="mt-3 font-display text-3xl text-paper">Next Signals</h2>
      <p className="mt-3 text-sm leading-6 text-paper/62">
        Deterministic suggestions from the visible board. No paid model, API, external service, or private material leaves the app.
      </p>

      <div className="mt-5 space-y-4">
        {suggestions.map((suggestion, index) => {
          const sourceTitles = suggestion.sourceTaskIds
            .map((taskId) => taskTitleById.get(taskId))
            .filter(Boolean)
            .join(" / ");

          return (
            <div key={suggestion.id} className="border-t border-paper/10 pt-4 first:border-t-0 first:pt-0">
              <div className="flex gap-3">
                <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-[4px] border border-signal/25 bg-signal/10 text-xs text-signal">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-xl leading-6 text-paper">{suggestion.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-paper/62">{suggestion.body}</p>
                </div>
              </div>
              {sourceTitles ? (
                <p className="ml-10 mt-3 text-[0.68rem] uppercase tracking-[0.16em] text-paper/36">
                  Board signal: {sourceTitles}
                </p>
              ) : null}
              {suggestion.href ? (
                <Link
                  href={suggestion.href}
                  className="ml-10 mt-3 inline-block text-xs uppercase tracking-[0.2em] text-ember transition hover:text-signal"
                >
                  {suggestion.actionLabel}
                </Link>
              ) : (
                <span className="ml-10 mt-3 inline-block text-xs uppercase tracking-[0.2em] text-paper/38">
                  {suggestion.actionLabel}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
