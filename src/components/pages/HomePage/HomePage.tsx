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
