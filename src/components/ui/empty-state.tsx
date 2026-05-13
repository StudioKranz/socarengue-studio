interface EmptyStateProps {
  title: string;
  detail: string;
}

export function EmptyState({ title, detail }: EmptyStateProps) {
  return (
    <div className="rounded-[6px] border border-dashed border-paper/18 bg-ink/34 p-5">
      <p className="font-display text-xl text-paper">{title}</p>
      <p className="mt-2 text-sm leading-6 text-paper/58">{detail}</p>
    </div>
  );
}
