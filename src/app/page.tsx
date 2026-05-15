import Link from "next/link";
import { ArchiveNav } from "@/components/navigation/archive-nav";
import { PublicSiteShell } from "@/components/navigation/public-site-shell";
import { SignalFrame } from "@/components/ui/signal-frame";
import { getProject } from "@/lib/content/queries";

export default function HomePage() {
  const project = getProject();

  return (
    <PublicSiteShell
      cornerBox={{
        ariaLabel: "Socarengue home",
        variant: "cover",
        actionLabel: "Home",
      }}
    >
      <main className="min-h-screen pb-10">
        <ArchiveNav />
        <section className="archive-shell pt-10">
          <SignalFrame className="min-h-[68vh] p-8 md:p-12">
            <div className="grid min-h-[58vh] items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-signal/75">Preview / Issue One</p>
                <h1 className="mt-5 font-display text-6xl leading-[0.95] text-paper md:text-8xl">
                  The Sticks Return
                </h1>
                <p className="mt-6 max-w-2xl text-xl leading-9 text-paper/72">
                  A first glimpse from the opening movement of Socarengue Issue One.
                </p>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-paper/52">{project.logline}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/preview/issue-one"
                    className="border border-ember/50 bg-ember/12 px-5 py-3 text-xs uppercase tracking-[0.24em] text-ember transition hover:border-signal hover:text-signal"
                  >
                    Read Preview
                  </Link>
                  <Link
                    href="/archive"
                    className="border border-paper/18 px-5 py-3 text-xs uppercase tracking-[0.24em] text-paper/76 transition hover:border-signal hover:text-signal"
                  >
                    Browse Archive
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="overflow-hidden rounded-[6px] border border-paper/14 bg-ink/80 shadow-signal">
                  <img
                    src="/artifacts/issue-01/publish/01-cover-final.png"
                    alt="The Sticks Return cover."
                    className="h-auto w-full"
                  />
                </div>
              </div>
            </div>
          </SignalFrame>
        </section>
        <footer className="archive-shell mt-8 flex flex-wrap justify-between gap-4 border-t border-paper/10 pt-5 text-xs uppercase tracking-[0.18em] text-paper/32">
          <span>Reader Mode</span>
          <Link href="/studio" className="transition hover:text-signal">
            Studio
          </Link>
        </footer>
      </main>
    </PublicSiteShell>
  );
}
