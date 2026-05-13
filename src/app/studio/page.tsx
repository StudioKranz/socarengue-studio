import { ArchiveNav } from "@/components/navigation/archive-nav";
import { StudioOverview } from "@/components/studio/studio-overview";
import { getStudioOverview } from "@/lib/content/queries";

export default function StudioPage() {
  const data = getStudioOverview();

  return (
    <main className="min-h-screen pb-16">
      <ArchiveNav />
      <section className="archive-shell pt-8">
        <StudioOverview data={data} />
      </section>
    </main>
  );
}
