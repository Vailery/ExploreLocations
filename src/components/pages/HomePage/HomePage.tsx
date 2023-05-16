import { Footer } from "../../Footer";
import { Header } from "../../Header";
import { DescriptionSection } from "./subcomponents/DescriptionSection";
import { MostPopularSection } from "./subcomponents/MostPopularSection";
import { NavigationSection } from "./subcomponents/NavigationSection";
import { SubscribeSection } from "./subcomponents/SubscribeSection";

export const HomePage = () => (
  <>
    <Header />
    <main className="mb-6">
      <DescriptionSection />
      <NavigationSection />
      <MostPopularSection />
      <SubscribeSection />
    </main>
    <Footer />
  </>
);
