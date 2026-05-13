interface MetadataLineProps {
  label: string;
  value: string;
}

export function MetadataLine({ label, value }: MetadataLineProps) {
  return (
    <p className="flex flex-wrap gap-x-2 gap-y-1 text-[0.68rem] uppercase tracking-[0.22em] text-paper/60">
      <span className="text-signal/70">{label}</span>
      <span>{value}</span>
    </p>
  );
}
