import Head from "next/head";
import type { AirportItem, RegionType } from "~/src/utils/types";
import { Footer } from "../../Footer/Footer";
import { Header } from "../../Header";
import { AirportsAroundSection } from "./subcomponents/AirportsAroundSection/AirportsAroundSection";
import { AllAirportsSection } from "./subcomponents/AllAirportsSection";
import { DescriptionSection } from "./subcomponents/DescriptionSection";
import { InfoSection } from "./subcomponents/InfoSection";
import { MapSection } from "./subcomponents/MapSection";
import { RouterSection } from "./subcomponents/RouterSection";

interface IHomePage {
  airport: AirportItem;
  airportsAround: AirportItem[];
  regions: RegionType[];
  regionTree: RegionType[];
}

export const AirportPage = ({
  airport,
  airportsAround,
  regions,
  regionTree,
}: IHomePage) => {
  console.log(airport.Geometry);
  
  return (
    <>
      <Head>
        <title>{airport.Name}</title>
        <meta name="description" content={airport.SeoDescriptionEn} />
      </Head>
      <Header />
      <main className="mb-5 min-h-screen lg:mb-10">
        <RouterSection regionTree={regionTree} name={airport.Name} />
        <DescriptionSection
          name={airport.Name}
          description={airport.SeoDescriptionEn}
        />
        <MapSection
          name={airport.Name}
          description={airport.SeoDescriptionEn}
          position={{ lng: airport.CenterX, lat: airport.CenterY }}
          polygon={airport.Geometry.coordinates}
        />
        <InfoSection airportInfo={airport} />
        {airportsAround.length ? (
          <AirportsAroundSection
            name={airport.Name}
            description={airport.SeoDescriptionEn}
            airportsAround={airportsAround}
          />
        ) : (
          ""
        )}
        <AllAirportsSection regions={regions} />
        {/* <PopularFlightsSection name={airport.Name} /> */}
      </main>
      <Footer />
    </>
  );
};
