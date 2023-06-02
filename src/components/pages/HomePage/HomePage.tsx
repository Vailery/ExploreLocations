import Head from "next/head";
import type { LocationsType } from "~/src/utils/types";
import { Footer } from "../../Footer";
import { Header } from "../../Header";
import { DescriptionSection } from "./subcomponents/DescriptionSection";
import { MostPopularSection } from "./subcomponents/MostPopularSection";
import { NavigationSection } from "./subcomponents/NavigationSection";
import { SubscribeSection } from "./subcomponents/SubscribeSection";

interface HomePageProps {
  topLocations: LocationsType[];
}

export const HomePage = ({ topLocations }: HomePageProps) => (
  <>
    <Head>
      <title>{"Explore Locations"}</title>
      <meta name="description" content={"SEO description"} />
    </Head>
    <Header />
    <main className="mb-6">
      <DescriptionSection />
      <NavigationSection />
      <MostPopularSection topLocations={topLocations} />
      <SubscribeSection />
    </main>
    <Footer />
  </>
);
