import { ArchiveNav } from "@/components/navigation/archive-nav";
import { StudioOverview } from "@/components/studio/studio-overview";
import { getStudioOverview } from "@/lib/content/queries";
import { getDemoStudioWorkflow } from "@/lib/studio/demo-workflow";

export default function StudioPage() {
  const data = getStudioOverview();
  const workflow = getDemoStudioWorkflow();

  return (
    <main className="min-h-screen pb-16">
      <ArchiveNav />
      <section className="archive-shell pt-8">
        <StudioOverview data={data} workflow={workflow} />
      </section>
    </main>
  );
}
