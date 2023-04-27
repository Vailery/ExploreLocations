import type { AirportItem } from "~/src/utils/types";
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
  airport: AirportItem;
  airportsAround: AirportItem[];
  airportsInCountry: AirportItem[];
}

export const AirportPage = ({
  airport,
  airportsAround,
  airportsInCountry,
}: IHomePage) => {
  return (
    <>
      <Header />
      <main className="mb-5 min-h-screen lg:mb-10">
        <RouterSection
          city={airport.City}
          country={airport.Country}
          name={airport.Name}
        />
        <DescriptionSection name={airport.Name} />
        <MapSection
          name={airport.Name}
          position={{ lng: airport.CenterX, lat: airport.CenterY }}
        />
        <InfoSection airportInfo={airport} />
        <AirportsAroundSection
          name={airport.Name}
          position={{ lng: airport.CenterX, lat: airport.CenterY }}
          airportsAround={airportsAround}
        />
        <AllAirportsSection
          country={airport.Country}
          airportsInCountry={airportsInCountry}
        />
        <PopularFlightsSection name={airport.Name} />
      </main>
      <Footer />
    </>
  );
};
