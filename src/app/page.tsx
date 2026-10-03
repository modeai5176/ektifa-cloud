import Arrival from '@/components/sections/Arrival';
import Place from '@/components/sections/Place';
import MaterialGallery from '@/components/sections/MaterialGallery';
import TheHouse from '@/components/sections/TheHouse';
import CraftSection from '@/components/sections/CraftSection';
import CollectionShowcase from '@/components/sections/CollectionShowcase';
import HoneyChapter from '@/components/sections/HoneyChapter';
import OriginAtlas from '@/components/sections/OriginAtlas';
import CreationCTA from '@/components/sections/CreationCTA';

export default function Home() {
  return (
    <>
      {/* 01 — The Arrival */}
      <Arrival />
      {/* 02 — Place */}
      <Place />
      {/* 03 — The Material */}
      <MaterialGallery />
      {/* 04 — The House */}
      <TheHouse />
      {/* 05 — Craft */}
      <CraftSection />
      {/* 06 — Collection */}
      <CollectionShowcase />
      {/* 08 — Honey */}
      <HoneyChapter />
      {/* 09 — Origin */}
      <OriginAtlas />
      {/* 10 — The EKTIFA Creation */}
      <CreationCTA />
    </>
  );
}
