"use client";

import Link from "next/link";
import { useState } from "react";
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
  const [isExpanded, setIsExpanded] = useState(false);
  const primaryLinkedRecord = task.linkedRecords[0];

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

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-[4px] border border-paper/10 bg-paper/[0.03] px-2 py-1 text-[0.68rem] uppercase tracking-[0.14em] text-paper/64">
          {task.ownerRole}
        </span>
        {task.blockedBy ? (
          <span className="rounded-[4px] border border-blood/40 bg-blood/10 px-2 py-1 text-[0.68rem] uppercase tracking-[0.14em] text-paper/82">
            Blocked
          </span>
        ) : null}
      </div>

      {primaryLinkedRecord ? (
        <div className="mt-3">
          {primaryLinkedRecord.href ? (
            <Link
              href={primaryLinkedRecord.href}
              className="inline-flex max-w-full rounded-[4px] border border-signal/20 bg-signal/5 px-2 py-1 text-[0.68rem] uppercase tracking-[0.14em] text-signal/78 transition hover:border-ember hover:text-ember"
            >
              <span className="truncate">
                {primaryLinkedRecord.type}: {primaryLinkedRecord.label}
              </span>
            </Link>
          ) : (
            <span className="inline-flex max-w-full rounded-[4px] border border-paper/10 px-2 py-1 text-[0.68rem] uppercase tracking-[0.14em] text-paper/46">
              <span className="truncate">
                {primaryLinkedRecord.type}: {primaryLinkedRecord.label}
              </span>
            </span>
          )}
        </div>
      ) : null}

      <button
        type="button"
        className="mt-4 w-full rounded-[4px] border border-paper/10 bg-paper/[0.03] px-3 py-2 text-left text-[0.68rem] uppercase tracking-[0.18em] text-paper/56 transition hover:border-signal/40 hover:text-signal"
        aria-expanded={isExpanded}
        onClick={() => setIsExpanded((current) => !current)}
      >
        {isExpanded ? "Hide next action" : "Show next action"}
      </button>

      {isExpanded ? (
        <div className="mt-3 rounded-[4px] border border-ember/18 bg-ember/[0.06] p-3">
          <p className="text-[0.68rem] uppercase tracking-[0.18em] text-ember/80">Next action</p>
          <p className="mt-2 text-sm leading-6 text-paper/76">{task.nextAction}</p>
          {task.blockedBy ? <p className="mt-2 text-xs leading-5 text-paper/50">{task.blockedBy}</p> : null}
        </div>
      ) : null}

      <div className="mt-3 flex flex-wrap gap-2">
        {task.tags.map((tag) => (
          <span key={`${task.id}-${tag}`} className="text-[0.68rem] uppercase tracking-[0.14em] text-paper/34">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
