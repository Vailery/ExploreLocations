import { Footer } from "../../Footer/Footer";
import { Header } from "../../Header";
import { AirportsAroundSection } from "./subcomponents/AirportsAroundSection/AirportsAroundSection";
import { AllAirportsSection } from "./subcomponents/AllAirportsSection";
import { DescriptionSection } from "./subcomponents/DescriptionSection";
import { InfoSection } from "./subcomponents/InfoSection";
import { MapSection } from "./subcomponents/MapSection";
import { PopularFlightsSection } from "./subcomponents/PopularFlightsSection";
import { RouterSection } from "./subcomponents/RouterSection";

interface IHomePage {
  name: string;
}

export const HomePage = ({ name }: IHomePage) => {
  return (
    <>
      <Header />
      <main className="mb-5 min-h-screen lg:mb-10">
        <RouterSection />
        <DescriptionSection name={name} />
        <MapSection name={name} />
        <InfoSection />
        <AirportsAroundSection />
        <AllAirportsSection />
        <PopularFlightsSection />
      </main>
      <Footer />
    </>
  );
};
