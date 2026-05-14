import { ArchiveNav } from "@/components/navigation/archive-nav";
import { IntakeConsole } from "@/components/intake/intake-console";
import { getIntakeReferenceData } from "@/lib/content/queries";

export default function IntakePage() {
  const referenceData = getIntakeReferenceData();

  return (
    <main className="min-h-screen pb-16">
      <ArchiveNav />
      <section className="archive-shell pt-8">
        <IntakeConsole
          issues={referenceData.issues}
          scenes={referenceData.scenes}
          loreEntries={referenceData.loreEntries}
          tracks={referenceData.tracks}
        />
      </section>
    </main>
  );
}
