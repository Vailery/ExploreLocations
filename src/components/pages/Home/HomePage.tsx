import { Footer } from "../../Footer/Footer";
import { Header } from "../../Header";
import { AirportsAroundSection } from "./subcomponents/AirportsAroundSection/AirportsAroundSection";
import { AllAirportsSection } from "./subcomponents/AllAirportsSection";
import { DescriptionSection } from "./subcomponents/DescriptionSection";
import { InfoSection } from "./subcomponents/InfoSection";
import { MapSection } from "./subcomponents/MapSection";
import { PopularFlightsSection } from "./subcomponents/PopularFlightsSection";
import { RouterSection } from "./subcomponents/RouterSection";

export const HomePage = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen lg:mb-10 mb-5">
        <RouterSection />
        <DescriptionSection />
        <MapSection />
        <InfoSection />
        <AirportsAroundSection />
        <AllAirportsSection />
        <PopularFlightsSection />
      </main>
      <Footer />
    </>
  );
};
