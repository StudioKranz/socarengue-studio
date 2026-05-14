import { MetadataLine } from "@/components/ui/metadata-line";
import { SignalFrame } from "@/components/ui/signal-frame";

export interface PublicTransmissionPreview {
  title: string;
  classification: string;
  publicDescription: string;
  resonanceTags: string[];
  linkedSceneTitle: string;
  linkedLoreTitles: string[];
  soundtrackCueTitle?: string;
  soundtrackCueNote: string;
  canonFraming: string;
}

export interface OperatorMemoryPreview {
  privateNotes: string;
  reviewState: string;
  canonUncertainty: string;
  collaboratorLanes: string[];
  sensitiveRouting: string[];
  internalVisibility: string;
  unresolvedQuestions: string[];
}

export interface TransmissionPrivacyPreviewData {
  publicTransmission: PublicTransmissionPreview;
  operatorMemory: OperatorMemoryPreview;
}

interface TransmissionPrivacyPreviewProps {
  data: TransmissionPrivacyPreviewData;
}

function TextTrace({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l border-signal/35 pl-4">
      <dt className="text-xs uppercase tracking-[0.2em] text-signal/70">{label}</dt>
      <dd className="mt-2 text-sm leading-6 text-paper/68">{value}</dd>
    </div>
  );
}

function SignalList({ items, emptyText, tone = "signal" }: { items: string[]; emptyText: string; tone?: "signal" | "ember" }) {
  if (items.length === 0) {
    return <p className="text-sm leading-6 text-paper/52">{emptyText}</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.16em] ${
            tone === "ember"
              ? "border-ember/28 bg-ember/8 text-ember/80"
              : "border-signal/24 bg-signal/8 text-signal/78"
          }`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function NumberedSignalList({ items, emptyText }: { items: string[]; emptyText: string }) {
  if (items.length === 0) {
    return <p className="text-sm leading-6 text-paper/52">{emptyText}</p>;
  }

  return (
    <ol className="space-y-3">
      {items.map((item, index) => (
        <li key={item} className="grid grid-cols-[2rem_1fr] gap-3 text-sm leading-6 text-paper/66">
          <span className="font-display text-xl text-ember/70">{String(index + 1).padStart(2, "0")}</span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

export function TransmissionPrivacyPreview({ data }: TransmissionPrivacyPreviewProps) {
  const { publicTransmission, operatorMemory } = data;

  return (
    <SignalFrame className="p-6 md:p-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <MetadataLine label="Transmission split" value="public face / operator memory" />
          <h2 className="mt-3 font-display text-4xl leading-tight text-paper md:text-5xl">
            What the archive may reveal
          </h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-paper/58">
          A local reading of what can surface for audience discovery and what should remain protected inside the studio signal.
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-[6px] border border-signal/22 bg-signal/7 p-5 md:p-6">
          <MetadataLine label="Public transmission" value="safe audience-facing signal" />
          <h3 className="mt-4 font-display text-4xl leading-tight text-paper">{publicTransmission.title}</h3>
          <p className="mt-3 text-xs uppercase tracking-[0.24em] text-ember/75">
            {publicTransmission.classification}
          </p>
          <p className="mt-5 text-base leading-8 text-paper/72">{publicTransmission.publicDescription}</p>

          <dl className="mt-6 grid gap-5">
            <TextTrace label="Linked scene" value={publicTransmission.linkedSceneTitle} />
            <TextTrace
              label="Soundtrack cue"
              value={publicTransmission.soundtrackCueTitle ?? publicTransmission.soundtrackCueNote}
            />
            <TextTrace label="Canon framing" value={publicTransmission.canonFraming} />
          </dl>

          <div className="mt-6 space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-signal/70">Public resonance</p>
            <SignalList
              items={publicTransmission.resonanceTags}
              emptyText="No public resonance has been named yet."
              tone="ember"
            />
          </div>

          <div className="mt-6 space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-signal/70">Lore traces</p>
            <SignalList
              items={publicTransmission.linkedLoreTitles}
              emptyText="No lore title is ready for audience discovery."
            />
          </div>
        </section>

        <section className="rounded-[6px] border border-ember/20 bg-ember/6 p-5 md:p-6">
          <MetadataLine label="Operator memory" value={operatorMemory.internalVisibility} />
          <h3 className="mt-4 font-display text-4xl leading-tight text-paper">What stays below the surface</h3>
          <p className="mt-5 text-base leading-8 text-paper/70">{operatorMemory.privateNotes}</p>

          <dl className="mt-6 grid gap-5">
            <TextTrace label="Review weather" value={operatorMemory.reviewState} />
            <TextTrace label="Canon uncertainty" value={operatorMemory.canonUncertainty} />
          </dl>

          <div className="mt-6 space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-ember/70">Awake lanes</p>
            <SignalList
              items={operatorMemory.collaboratorLanes}
              emptyText="Only the operator lane is quietly listening."
            />
          </div>

          <div className="mt-6 space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-ember/70">Sensitive routing</p>
            <NumberedSignalList
              items={operatorMemory.sensitiveRouting}
              emptyText="No sensitive routing has surfaced from this signal yet."
            />
          </div>

          <div className="mt-6 space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-ember/70">Unresolved questions</p>
            <NumberedSignalList
              items={operatorMemory.unresolvedQuestions}
              emptyText="The signal is unusually clear for now."
            />
          </div>
        </section>
      </div>
    </SignalFrame>
  );
}
