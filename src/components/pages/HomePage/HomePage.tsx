import Head from "next/head";
import type { LocationsType } from "~/src/utils/types";
import { Footer } from "../../Footer";
import { Header } from "../../Header";
import { DescriptionSection } from "./subcomponents/DescriptionSection";
import { MostPopularSection } from "./subcomponents/MostPopularSection";
import { NavigationSection } from "./subcomponents/NavigationSection";

interface HomePageProps {
  topLocations: LocationsType[];
}

export const HomePage = ({ topLocations }: HomePageProps) => (
  <>
    <Head>
      <title>
        {
          "Explorelocations.com - Explore Airports, Flying and Driving Routes anywhere in the World"
        }
      </title>
      <meta
        name="description"
        content={
          "Explorelocations.com helps you discover airports anywhere in the world, but also find great flying or driving routes. Discover interesting locations for your next trip."
        }
      />
    </Head>
    <Header />
    <main className="mb-6">
      <DescriptionSection />
      <NavigationSection />
      <MostPopularSection topLocations={topLocations} />
      {/* <SubscribeSection /> */}
    </main>
    <Footer />
  </>
);
