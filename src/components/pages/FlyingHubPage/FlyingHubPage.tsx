import { Footer } from "../../Footer";
import { Header } from "../../Header";
import { CountryLocationsSection } from "./subcomponents/CountryLocationsSection/CountryLocationsSection";
import { DescriptionSection } from "./subcomponents/DescriptionSection";
import { RouterSection } from "./subcomponents/RouterSection";
import { TopLocationsSection } from "./subcomponents/TopLocationsSection";

const countries = [
  "Europe",
  "Asia",
  "Africa",
  "North America",
  "South America",
];

export const FlyingHubPage = () => {
  return (
    <>
      <Header />
      <main className="mb-6 min-h-screen">
        <RouterSection />
        <DescriptionSection />
        <TopLocationsSection defaultOpen />
        {countries.map((el, idx) => (
          <CountryLocationsSection
            key={idx}
            country={el}
            defaultOpen={idx === 0}
          />
        ))}
      </main>
      <Footer />
    </>
  );
};
