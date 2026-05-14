interface IntakeEmptyStateProps {
  title: string;
  detail: string;
}

export function IntakeEmptyState({ title, detail }: IntakeEmptyStateProps) {
  return (
    <div className="rounded-[6px] border border-dashed border-ember/24 bg-ember/5 p-5">
      <p className="font-display text-xl text-paper">{title}</p>
      <p className="mt-2 text-sm leading-6 text-paper/58">{detail}</p>
    </div>
  );
}
