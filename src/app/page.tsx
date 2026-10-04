import Hero from '@/components/sections/Hero';
import QandSection from '@/components/sections/QandSection';
import AlFayaSection from '@/components/sections/AlFayaSection';
import Ingredients from '@/components/sections/Ingredients';
import About from '@/components/sections/About';
import ShopCTA from '@/components/sections/ShopCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <QandSection />
      <AlFayaSection />
      <Ingredients />
      <About />
      <ShopCTA />
    </>
  );
}
