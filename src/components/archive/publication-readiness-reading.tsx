import { MetadataLine } from "@/components/ui/metadata-line";
import { SignalFrame } from "@/components/ui/signal-frame";

export type PublicationReadinessState = "sealed" | "nearly ready" | "needs listening" | "keep private";

export interface PublicationReadinessData {
  state: PublicationReadinessState;
  explanation: string;
  mustResolve: string[];
  nextLane: {
    role: string;
    reason: string;
  };
  safeToShow: string[];
}

interface PublicationReadinessReadingProps {
  data: PublicationReadinessData;
}

const stateTone: Record<PublicationReadinessState, string> = {
  sealed: "border-signal/40 bg-signal/10 text-signal",
  "nearly ready": "border-ember/36 bg-ember/10 text-ember",
  "needs listening": "border-paper/18 bg-paper/6 text-paper/78",
  "keep private": "border-ember/28 bg-ink/72 text-ember/86",
};

function SignalList({ items, emptyText }: { items: string[]; emptyText: string }) {
  if (items.length === 0) {
    return <p className="text-sm leading-6 text-paper/52">{emptyText}</p>;
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item} className="border-l border-signal/30 pl-4 text-sm leading-6 text-paper/66">
          {item}
        </div>
      ))}
    </div>
  );
}

export function PublicationReadinessReading({ data }: PublicationReadinessReadingProps) {
  return (
    <SignalFrame className="p-6 md:p-10">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <MetadataLine label="Publication reading" value="archive travel weather" />
          <h2 className="mt-3 font-display text-4xl leading-tight text-paper md:text-5xl">
            Is the signal ready to travel?
          </h2>
          <div className={`mt-6 inline-flex border px-4 py-2 text-xs uppercase tracking-[0.24em] ${stateTone[data.state]}`}>
            {data.state}
          </div>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-paper/72">{data.explanation}</p>
        </div>

        <section className="rounded-[6px] border border-ember/20 bg-ember/6 p-5 md:p-6">
          <MetadataLine label="Next listening lane" value={data.nextLane.role} />
          <p className="mt-4 font-display text-3xl leading-tight text-paper">{data.nextLane.role}</p>
          <p className="mt-4 text-sm leading-6 text-paper/66">{data.nextLane.reason}</p>
        </section>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-[6px] border border-paper/12 bg-ink/45 p-5">
          <MetadataLine label="Before public display" value={`${data.mustResolve.length} unresolved echo${data.mustResolve.length === 1 ? "" : "es"}`} />
          <div className="mt-5">
            <SignalList
              items={data.mustResolve}
              emptyText="The archive hears no blocker in this local reading."
            />
          </div>
        </section>

        <section className="rounded-[6px] border border-signal/20 bg-signal/6 p-5">
          <MetadataLine label="Safe to show now" value={`${data.safeToShow.length} public fragment${data.safeToShow.length === 1 ? "" : "s"}`} />
          <div className="mt-5">
            <SignalList
              items={data.safeToShow}
              emptyText="Nothing should surface yet; the signal needs a quieter room."
            />
          </div>
        </section>
      </div>
    </SignalFrame>
  );
}
