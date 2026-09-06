import { CapabilityRing } from "@/components/site/CapabilityRing";
import { CloseAct } from "@/components/site/CloseAct";
import { FeatureSection } from "@/components/site/FeatureSection";
import { GlassBackdrop } from "@/components/site/GlassBackdrop";
import { HeroAct } from "@/components/site/HeroAct";
import { ResultsSection } from "@/components/site/ResultsSection";
import { ScrollRuntime } from "@/components/site/ScrollRuntime";
import { SiteNavPill } from "@/components/site/SiteNavPill";
import { StorySection } from "@/components/site/StorySection";
import { WorkRail } from "@/components/site/WorkRail";

/**
 * Giuseppe Ciccone's home page — the whole site.
 *
 * Seven acts alternating pinned stages and flow sections. The order is the
 * page's argument and the engine reads it from the DOM, so it must not change:
 *
 *   1 hero         pin  1.35vh   clarity      who, and the two numbers
 *   2 results      flow          confidence   what changed, with the caveats
 *   3 capabilities pin  3.4vh    awe          what he can do, on a ring
 *   4 story        flow          intimacy     the record, in prose
 *   5 work         pan  3.5vh    presence     the five systems, in a rail
 *   6 feature      flow          delight      Marea, the one live product
 *   7 close        pin  1.5vh    resolve      the ask, and the footer
 *
 * Everything outside <main> is fixed furniture. ScrollRuntime boots the engine
 * after hydration; until it adds `.sc-ready` to <html>, the CSS keeps main and
 * the pill at opacity 0 so nothing paints before the acts are pinned.
 */
export default function Home() {
  return (
    <>
      <GlassBackdrop />
      <SiteNavPill />

      <main id="top">
        <HeroAct />
        <ResultsSection />
        <CapabilityRing />
        <StorySection />
        <WorkRail />
        <FeatureSection />
        <CloseAct />
      </main>

      <ScrollRuntime />
    </>
  );
}
