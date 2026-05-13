import Link from "next/link";
import { ArchiveNav } from "@/components/navigation/archive-nav";
import { SignalFrame } from "@/components/ui/signal-frame";
import { getPrimaryIssue, getPrimaryRelease, getProject } from "@/lib/content/queries";

export default function HomePage() {
  const project = getProject();
  const issue = getPrimaryIssue();
  const release = getPrimaryRelease();

  return (
    <main className="min-h-screen pb-16">
      <ArchiveNav />
      <section className="archive-shell pt-10">
        <SignalFrame className="min-h-[68vh] p-8 md:p-12">
          <div className="grid min-h-[58vh] items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-signal/75">Recovered archive threshold</p>
              <h1 className="mt-5 font-display text-6xl leading-[0.95] text-paper md:text-8xl">
                {project.title}
              </h1>
              <p className="mt-6 max-w-2xl text-xl leading-9 text-paper/72">{project.logline}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/studio"
                  className="border border-ember/50 bg-ember/12 px-5 py-3 text-xs uppercase tracking-[0.24em] text-ember transition hover:border-signal hover:text-signal"
                >
                  Enter studio
                </Link>
                <Link
                  href="/reader/rain-signal"
                  className="border border-paper/18 px-5 py-3 text-xs uppercase tracking-[0.24em] text-paper/76 transition hover:border-signal hover:text-signal"
                >
                  Begin scene signal
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[3/4] rounded-[6px] border border-paper/14 bg-[radial-gradient(circle_at_28%_18%,rgba(214,163,74,0.36),transparent_18%),radial-gradient(circle_at_74%_28%,rgba(66,213,217,0.24),transparent_20%),linear-gradient(145deg,rgba(23,32,47,0.94),rgba(5,7,11,0.96))] p-5 shadow-signal">
                <div className="h-full border border-paper/10 p-5">
                  <p className="text-xs uppercase tracking-[0.28em] text-paper/48">{release.title}</p>
                  <div className="mt-16 h-px bg-signal/50" />
                  <p className="mt-6 font-display text-4xl leading-tight text-paper">{issue.title}</p>
                  <p className="mt-4 text-sm leading-6 text-paper/62">{release.summary}</p>
                  <div className="absolute bottom-8 right-8 h-24 w-24 rounded-full border border-ember/40 bg-ember/10" />
                </div>
              </div>
            </div>
          </div>
        </SignalFrame>
      </section>
    </main>
  );
}
