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

export const DrivingHubPage = () => {
  return (
    <>
      <Header />
      <main className="mb-5 min-h-screen lg:mb-10">
        <RouterSection />
        <DescriptionSection />
        <TopLocationsSection />
        {countries.map((el, idx) => (
          <CountryLocationsSection key={idx} country={el} />
        ))}
      </main>
      <Footer />
    </>
  );
};
