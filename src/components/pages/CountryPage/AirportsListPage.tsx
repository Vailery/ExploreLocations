import { Footer } from "../../Footer";
import { Header } from "../../Header";
import { AirportsByCountrySection } from "./subcomponents/AirportsByCountrySection";
import { DescriptionSection } from "./subcomponents/DescriptionSection";
import { FAQSection } from "./subcomponents/FAQSection";
import { ListSection } from "./subcomponents/ListSection";
import { MapSection } from "./subcomponents/MapSection";
import { MoreSection } from "./subcomponents/MoreSection";
import { RouterSection } from "./subcomponents/RouterSection";

export const CountryPage = () => {
  return (
    <>
      <Header />
      <main className="mb-5 min-h-screen lg:mb-10">
        <RouterSection />
        <DescriptionSection />
        <MapSection />
        <ListSection />
        <FAQSection />
        <AirportsByCountrySection />
        <MoreSection />
      </main>
      <Footer />
    </>
  );
};
