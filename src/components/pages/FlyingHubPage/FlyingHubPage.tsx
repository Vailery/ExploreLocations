import Head from "next/head";
import type { LocationsType } from "~/src/utils/types";
import { Footer } from "../../Footer";
import { Header } from "../../Header";
import { TopLocationsSection } from "../../shared/TopLocationsSection";
import { CountryLocationsSection } from "./subcomponents/CountryLocationsSection";
import { DescriptionSection } from "./subcomponents/DescriptionSection";
import { RouterSection } from "./subcomponents/RouterSection";

interface FlyingHubPageProps {
  topLocations?: LocationsType[];
  countryLocations?: LocationsType[];
  countryName?: string;
}

export const FlyingHubPage = ({
  topLocations,
  countryLocations,
  countryName,
}: FlyingHubPageProps) => {
  return (
    <>
      <Head>
        <title>{"Flying Hub"}</title>
        <meta name="description" content={"SEO description"} />
      </Head>
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
