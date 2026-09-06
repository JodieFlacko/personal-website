import { BookSection } from "@/components/sites/www-nateherk-com-dfc5c2e7/root-8a5edab2/BookSection";
import { CloseAct } from "@/components/sites/www-nateherk-com-dfc5c2e7/root-8a5edab2/CloseAct";
import { GlassBackdrop } from "@/components/sites/www-nateherk-com-dfc5c2e7/root-8a5edab2/GlassBackdrop";
import { HeroAct } from "@/components/sites/www-nateherk-com-dfc5c2e7/root-8a5edab2/HeroAct";
import { ProofSection } from "@/components/sites/www-nateherk-com-dfc5c2e7/root-8a5edab2/ProofSection";
import { RecognitionAct } from "@/components/sites/www-nateherk-com-dfc5c2e7/root-8a5edab2/RecognitionAct";
import { RoomsAct } from "@/components/sites/www-nateherk-com-dfc5c2e7/root-8a5edab2/RoomsAct";
import { ScrollRuntime } from "@/components/sites/www-nateherk-com-dfc5c2e7/root-8a5edab2/ScrollRuntime";
import { SiteNavPill } from "@/components/sites/www-nateherk-com-dfc5c2e7/root-8a5edab2/SiteNavPill";
import { StorySection } from "@/components/sites/www-nateherk-com-dfc5c2e7/root-8a5edab2/StorySection";

/**
 * nateherk.com home page.
 *
 * Seven acts alternating pinned stages and flow sections. Order is the page's
 * argument and the engine reads it from the DOM, so it must not change:
 *
 *   1 hero        pin  1.35vh   clarity
 *   2 proof       flow          confidence
 *   3 recognition pin  3.4vh    awe
 *   4 story       flow          intimacy
 *   5 rooms       pan  3.5vh    presence
 *   6 book        flow          delight
 *   7 close       pin  1.5vh    resolve
 *
 * Everything outside <main> is fixed furniture. ScrollRuntime boots the engine
 * after hydration; until it adds `.sc-ready` to <html>, the ported CSS keeps
 * main and the pill at opacity 0 so nothing paints before the acts are pinned.
 */
export default function Home() {
  return (
    <>
      <GlassBackdrop />
      <SiteNavPill />

      <main id="top">
        <HeroAct />
        <ProofSection />
        <RecognitionAct />
        <StorySection />
        <RoomsAct />
        <BookSection />
        <CloseAct />
      </main>

      <ScrollRuntime />
    </>
  );
}
