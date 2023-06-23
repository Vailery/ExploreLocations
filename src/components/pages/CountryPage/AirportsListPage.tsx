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
import { RouterSection } from "./subcomponents/RouterSection";
import { useState } from "react";
import Head from "next/head";
import { MoreSection } from "./subcomponents/MoreSection";

interface CountryPageProps {
  currentRegion: RegionType;
  regionTree: RegionType[];
  regions: RegionType[];
  airports: AirportItem[];
  airportsCount: AirportsCountType;
}

export const CountryPage = ({
  currentRegion,
  regionTree,
  regions,
  airports: defaultAirports,
  airportsCount,
}: CountryPageProps) => {
  const [airports, setAirports] = useState(defaultAirports);
  return (
    <>
      <Head>
        <title>
          List of Airports in {currentRegion.Type !== "country" && 'and around'} {currentRegion.Name} - ExploreLocations.com
        </title>
        <meta
          name="description"
          content={`
          "List of all major and international airports ${currentRegion.Type === 'country' ? "from" : "in and around"} ${currentRegion.Name}, as well as domestic and small local airports. Explore them on the map.`}
        />
      </Head>
      <Header />
      <main className="mb-5 min-h-screen lg:mb-10">
        {currentRegion && (
          <>
            <RouterSection regionTree={regionTree} />
            <DescriptionSection
              region={currentRegion}
              airportsCount={airportsCount}
              country={regionTree[0]?.Name || ""}
            />
            <MapSection
              region={currentRegion}
              airports={airports}
              country={regionTree[0]?.Name || ""}
            />
            <ListSection
              setAirports={setAirports}
              region={currentRegion}
              airports={airports}
              airportsCount={airportsCount}
              country={regionTree[0]?.Name || ""}
            />
            <FAQSection region={currentRegion} />
            <AirportsByCountrySection
              regions={regions}
              countryCode={regionTree[0]?.Name || ""}
            />
            <MoreSection country={regionTree[0]?.Name || ""} />
          </>
        )}
      </main>
      <Footer />
    </>
  );
};
