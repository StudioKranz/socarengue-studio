import Link from "next/link";
import type { StudioCopilotSuggestion } from "@/types/studio-workflow";
import { MetadataLine } from "@/components/ui/metadata-line";

interface StudioCopilotPanelProps {
  suggestions: StudioCopilotSuggestion[];
}

export function StudioCopilotPanel({ suggestions }: StudioCopilotPanelProps) {
  return (
    <aside className="rounded-[6px] border border-signal/18 bg-signal/5 p-5">
      <MetadataLine label="Copilot shell" value="no external AI call" />
      <h2 className="mt-3 font-display text-3xl text-paper">Next Signals</h2>
      <p className="mt-3 text-sm leading-6 text-paper/62">
        Suggested actions are deterministic demo prompts from the local workflow data. No paid model, API, or private material leaves the app.
      </p>

      <div className="mt-5 space-y-4">
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className="border-t border-paper/10 pt-4 first:border-t-0 first:pt-0">
            <h3 className="font-display text-xl text-paper">{suggestion.title}</h3>
            <p className="mt-2 text-sm leading-6 text-paper/62">{suggestion.body}</p>
            {suggestion.href ? (
              <Link
                href={suggestion.href}
                className="mt-3 inline-block text-xs uppercase tracking-[0.2em] text-ember transition hover:text-signal"
              >
                {suggestion.actionLabel}
              </Link>
            ) : (
              <span className="mt-3 inline-block text-xs uppercase tracking-[0.2em] text-paper/38">
                {suggestion.actionLabel}
              </span>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
