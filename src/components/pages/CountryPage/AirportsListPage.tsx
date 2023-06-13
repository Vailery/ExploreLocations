import type {
  AirportItem,
  AirportsCountType,
  RegionType,
} from "~/src/utils/types";
import { Footer } from "../../Footer";
import { Header } from "../../Header";
import { AirportsByCountrySection } from "./subcomponents/AirportsByCountrySection";
import { DescriptionSection } from "./subcomponents/DescriptionSection";
import { FAQSection } from "../../shared/FAQSection";
import { ListSection } from "./subcomponents/ListSection";
import { MapSection } from "./subcomponents/MapSection";
import { MoreSection } from "./subcomponents/MoreSection";
import { RouterSection } from "./subcomponents/RouterSection";
import { useState } from "react";
import Head from "next/head";

interface CountryPageProps {
  currentRegion: RegionType;
  regions: RegionType[];
  airports: AirportItem[];
  airportsCount: AirportsCountType;
}

export const CountryPage = ({
  currentRegion,
  regions,
  airports: defaultAirports,
  airportsCount,
}: CountryPageProps) => {
  const [airports, setAirports] = useState(defaultAirports);
  return (
    <>
      <Head>
        <title>
          List of Airports in {currentRegion.Name} - ExploreLocations.com
        </title>
        <meta
          name="description"
          content={`
          "List of all major and international airports from ${currentRegion.Name}, as well as domestic and small local airports. Explore them on the map.`}
        />
      </Head>
      <Header />
      <main className="mb-5 min-h-screen lg:mb-10">
        {currentRegion && (
          <>
            <RouterSection region={currentRegion} />
            <DescriptionSection
              region={currentRegion}
              airportsCount={airportsCount}
            />
            <MapSection region={currentRegion} airports={airports} />
            <ListSection
              setAirports={setAirports}
              region={currentRegion}
              airports={airports}
              airportsCount={airportsCount}
            />
            <FAQSection region={currentRegion} />
            <AirportsByCountrySection
              regions={regions}
              countryCode={currentRegion.Code}
            />
            <MoreSection region={currentRegion} />
          </>
        )}
      </main>
      <Footer />
    </>
  );
};
