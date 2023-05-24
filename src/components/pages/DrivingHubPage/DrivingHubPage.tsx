import type { LocationsType } from "~/src/utils/types";
import { Footer } from "../../Footer";
import { Header } from "../../Header";
import { DescriptionSection } from "./subcomponents/DescriptionSection";
import { RouterSection } from "./subcomponents/RouterSection";
import { TopLocationsSection } from "../../shared/TopLocationsSection";
import { CountryLocationsSection } from "./subcomponents/CountryLocationsSection";

interface DrivingHubPageProps {
  topLocations?: LocationsType[];
  countryLocations?: LocationsType[];
  countryName?: string;
}

export const DrivingHubPage = ({
  topLocations,
  countryLocations,
  countryName,
}: DrivingHubPageProps) => {
  return (
    <>
      <Header />
      <main className="mb-6 min-h-screen">
        <RouterSection />
        <DescriptionSection />
        {topLocations && (
          <TopLocationsSection locations={topLocations} defaultOpen />
        )}
        {countryLocations && (
          <CountryLocationsSection
            countryLocations={countryLocations}
            countryName={countryName}
            defaultOpen
          />
        )}
      </main>
      <Footer />
    </>
  );
};
