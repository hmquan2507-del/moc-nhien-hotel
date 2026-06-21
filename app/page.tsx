import AboutSection from "@/components/AboutSection";
import AmenitiesSection from "@/components/AmenitiesSection";
import BookingBar from "@/components/BookingBar";
import ContactCta from "@/components/ContactCta";
import Footer from "@/components/Footer";
//import GallerySection from "@/components/GallerySection";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MobileStickyCta from "@/components/MobileStickyCta";
import RoomsSection from "@/components/RoomsSection";
import { getValidDuration } from "@/data/site";

type HomeProps = {
  searchParams: Promise<{
    duration?: string;
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const duration = getValidDuration(params.duration);

  return (
    <main className="min-h-screen bg-ivory pb-24 text-moss md:pb-0">
      <Header />
      <HeroSection />
      <BookingBar />
      <AboutSection />
      <RoomsSection duration={duration} />
      <AmenitiesSection />
      <ContactCta />
      <Footer />
      <MobileStickyCta />
    </main>
  );
}
