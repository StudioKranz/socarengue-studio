import { MetadataLine } from "@/components/ui/metadata-line";
import { SignalFrame } from "@/components/ui/signal-frame";

export interface ArtifactDossierRoutingSignal {
  role: string;
  intensity: "high" | "medium";
  reason: string;
}

export interface ArtifactDossierLoreTrace {
  id: string;
  title: string;
  publicText: string;
}

export interface ArtifactDossierPreviewData {
  eyebrow: string;
  title: string;
  classification: string;
  publicDescription: string;
  linkedSceneTitle: string;
  linkedSceneDetail: string;
  soundtrackTitle: string;
  soundtrackDetail: string;
  canonState: string;
  canonFrame: string;
  visibility: string;
  reviewState: string;
  resonanceTags: string[];
  loreTraces: ArtifactDossierLoreTrace[];
  routingSignals: ArtifactDossierRoutingSignal[];
  imageLabel?: string;
  imageTitle?: string;
  imageDetail?: string;
}

interface ArtifactDossierPreviewProps {
  data: ArtifactDossierPreviewData;
}

export function ArtifactDossierPreview({ data }: ArtifactDossierPreviewProps) {
  const resonance = data.resonanceTags.length > 0 ? data.resonanceTags : ["unlabeled resonance"];

  return (
    <SignalFrame className="p-6 md:p-10">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className="aspect-[4/5] overflow-hidden rounded-[6px] border border-paper/12 bg-[radial-gradient(circle_at_32%_18%,rgba(214,163,74,0.28),transparent_18%),radial-gradient(circle_at_72%_24%,rgba(66,213,217,0.22),transparent_20%),linear-gradient(145deg,rgba(23,32,47,0.92),rgba(5,7,11,0.96))] shadow-signal">
            <div className="flex h-full flex-col justify-end p-6">
              <p className="text-xs uppercase tracking-[0.26em] text-signal/68">
                {data.imageLabel ?? "Artifact image placeholder"}
              </p>
              <p className="mt-3 font-display text-3xl leading-tight text-paper">
                {data.imageTitle ?? "Visual fragment not yet recovered"}
              </p>
              <p className="mt-3 text-sm leading-6 text-paper/55">
                {data.imageDetail ?? "A future media attachment would surface here from local artifacts or Supabase Storage."}
              </p>
            </div>
          </div>
        </div>

        <div>
          <MetadataLine label="Dossier forming" value={data.eyebrow} />
          <h2 className="mt-4 font-display text-5xl leading-tight text-paper md:text-6xl">{data.title}</h2>
          <p className="mt-4 text-xs uppercase tracking-[0.24em] text-ember/75">{data.classification}</p>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-paper/72">{data.publicDescription}</p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="border-l border-signal/40 pl-4">
              <MetadataLine label="Linked scene" value={data.linkedSceneTitle} />
              <p className="mt-2 text-sm leading-6 text-paper/62">{data.linkedSceneDetail}</p>
            </div>
            <div className="border-l border-ember/40 pl-4">
              <MetadataLine label="Soundtrack cue" value={data.soundtrackTitle} />
              <p className="mt-2 text-sm leading-6 text-paper/62">{data.soundtrackDetail}</p>
            </div>
          </div>

          <div className="mt-8 rounded-[6px] border border-paper/12 bg-ink/42 p-5">
            <MetadataLine label="Canonical state" value={data.canonState} />
            <p className="mt-3 font-display text-2xl leading-9 text-paper/88">{data.canonFrame}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-[6px] border border-paper/12 bg-ink/45 p-5">
          <MetadataLine label="Linked lore" value={`${data.loreTraces.length} mythic trace${data.loreTraces.length === 1 ? "" : "s"}`} />
          <div className="mt-4 space-y-4">
            {data.loreTraces.length > 0 ? (
              data.loreTraces.map((entry) => (
                <div key={entry.id} className="border-l border-ember/35 pl-4">
                  <p className="font-display text-xl text-paper">{entry.title}</p>
                  <p className="mt-1 text-sm leading-6 text-paper/58">{entry.publicText}</p>
                </div>
              ))
            ) : (
              <p className="text-sm leading-6 text-paper/55">No lore has attached itself to this signal yet.</p>
            )}
          </div>
        </section>

        <section className="rounded-[6px] border border-paper/12 bg-ink/45 p-5">
          <MetadataLine label="Atmospheric metadata" value={data.visibility} />
          <dl className="mt-4 grid gap-4">
            <div>
              <dt className="text-xs uppercase tracking-[0.22em] text-signal/70">Review state</dt>
              <dd className="mt-1 text-sm leading-6 text-paper/66">{data.reviewState}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.22em] text-signal/70">Resonance tags</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {resonance.map((tag) => (
                  <span key={tag} className="rounded-full border border-ember/28 bg-ember/8 px-3 py-1 text-xs uppercase tracking-[0.16em] text-ember/80">
                    {tag}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </section>
      </div>

      <section className="mt-6 rounded-[6px] border border-ember/20 bg-ember/5 p-5">
        <MetadataLine label="Routing echo" value={`${data.routingSignals.length} awake lane${data.routingSignals.length === 1 ? "" : "s"}`} />
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {data.routingSignals.map((signal) => (
            <div key={signal.role} className="border-l border-ember/45 pl-4">
              <p className="font-display text-xl text-paper">{signal.role}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-paper/42">{signal.intensity}</p>
              <p className="mt-2 text-sm leading-6 text-paper/62">{signal.reason}</p>
            </div>
          ))}
        </div>
      </section>
    </SignalFrame>
  );
}
