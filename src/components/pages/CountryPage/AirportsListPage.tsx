import type { AirportItem, RegionType } from "~/src/utils/types";
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

interface CountryPageProps {
  regions: RegionType[];
  airports: AirportItem[];
  airportsCount: number;
}

export const CountryPage = ({
  regions,
  airports: defaultAirports,
  airportsCount,
}: CountryPageProps) => {
  const [airports, setAirports] = useState(defaultAirports);
  return (
    <>
      <Header />
      <main className="mb-5 min-h-screen lg:mb-10">
        {regions[0] && (
          <>
            <RouterSection region={regions[0]} />
            <DescriptionSection region={regions[0]} />
            <MapSection region={regions[0]} airports={airports} />
            <ListSection
              setAirports={setAirports}
              region={regions[0]}
              airports={airports}
              airportsCount={airportsCount}
            />
            <FAQSection region={regions[0]} />
            <AirportsByCountrySection regions={regions} countryCode={regions[0].Code} />
            <MoreSection region={regions[0]} />
          </>
        )}
      </main>
      <Footer />
    </>
  );
};
