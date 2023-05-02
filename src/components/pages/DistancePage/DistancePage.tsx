import { Footer } from "../../Footer";
import { Header } from "../../Header";
import { FAQSection } from "./subcomponents/FAQSection";
import { DescriptionSection } from "./subcomponents/DescriptionSection";
import { InfoSection } from "./subcomponents/InfoSection";
import { MapSection } from "./subcomponents/MapSection";
import { RouterSection } from "./subcomponents/RouterSection";
import { AirportsSection } from "./subcomponents/AirportsSection";
import { RelatedFlightsSection } from "./subcomponents/RelatedFlightsSection/RelatedFlightsSection";
import { MoreSection } from "./subcomponents/MoreSection";

export const DistancePage = () => {
  return (
    <>
      <Header />
      <main className="mb-5 min-h-screen lg:mb-10">
        <RouterSection />
        <DescriptionSection />
        <MapSection />
        <InfoSection />
        <AirportsSection />
        <FAQSection />
        <RelatedFlightsSection />
        <MoreSection />
        <MoreSection />
      </main>
      <Footer />
    </>
  );
};
