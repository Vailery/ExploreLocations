import type { LocationsType } from "~/src/utils/types";
import { Footer } from "../../Footer";
import { Header } from "../../Header";
import { TopLocationsSection } from "../../shared/TopLocationsSection";
import { DescriptionSection } from "./subcomponents/DescriptionSection";
import { RouterSection } from "./subcomponents/RouterSection";

interface FlyingHubPageProps {
  topLocations: LocationsType[];
}

const countries = [
  "Europe",
  "Asia",
  "Africa",
  "North America",
  "South America",
];

export const FlyingHubPage = ({ topLocations }: FlyingHubPageProps) => {
  return (
    <>
      <Header />
      <main className="mb-6 min-h-screen">
        <RouterSection />
        <DescriptionSection />
        <TopLocationsSection locations={topLocations} defaultOpen />
        {/* {countries.map((el, idx) => (
          <CountryLocationsSection
            key={idx}
            country={el}
            defaultOpen={idx === 0}
          />
        ))} */}
      </main>
      <Footer />
    </>
  );
};
