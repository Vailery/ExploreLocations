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
import { AirportsAroundListSection } from "./subcomponents/AirportsAroundListSection";

interface CountryPageProps {
  currentRegion: RegionType;
  regionTree: RegionType[];
  regions: RegionType[];
  airportsInRegion: AirportItem[];
  airportsAroundRegion: AirportItem[];
  airportsCount: AirportsCountType;
}

export const CountryPage = ({
  currentRegion,
  regionTree,
  regions,
  airportsInRegion: defaultAirports,
  airportsAroundRegion,
  airportsCount,
}: CountryPageProps) => {
  const [airports, setAirports] = useState(defaultAirports);
  return (
    <>
      <Head>
        <title>
          <>
            List of Airports in{" "}
            {currentRegion.Type !== "country" && "and around"}{" "}
            {currentRegion.Name} - ExploreLocations.com
          </>
        </title>
        <meta
          name="description"
          content={`
          "List of all major and international airports ${
            currentRegion.Type === "country" ? "from" : "in and around"
          } ${
            currentRegion.Name
          }, as well as domestic and small local airports. Explore them on the map.`}
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
              airports={airports.concat(airportsAroundRegion)}
              country={regionTree[0]?.Name || ""}
            />
            {airports.length === 0 ? (
              <div className="container mb-6 rounded-md bg-white px-3 py-6 text-lg font-bold tracking-wide shadow-md">
                There are no International or Domestic airports in{" "}
                {currentRegion.Name}, but below you can find airports located on
                a 200 km buffer around the region
              </div>
            ) : (
              <ListSection
                setAirports={setAirports}
                region={currentRegion}
                airports={airports}
                airportsCount={airportsCount}
                country={regionTree[0]?.Name || ""}
              />
            )}
            {airportsAroundRegion.length === 0 ? (
              <></>
            ) : (
              <AirportsAroundListSection
                airports={airportsAroundRegion}
                country={regionTree[0]?.Name || ""}
                region={currentRegion}
              />
            )}
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
