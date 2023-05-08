import { Footer } from "../../Footer";
import { Header } from "../../Header";
import { FAQSection } from "../../shared/FAQSection";
import { DescriptionSection } from "./subcomponents/DescriptionSection";
import { InfoSection } from "./subcomponents/InfoSection";
import { MapSection } from "./subcomponents/MapSection";
import { RouterSection } from "./subcomponents/RouterSection";
import { AirportsSection } from "./subcomponents/AirportsSection";
import { RelatedFlightsSection } from "./subcomponents/RelatedFlightsSection/RelatedFlightsSection";
import { MoreSection } from "./subcomponents/MoreSection";
import type { FlightDistanceType } from "~/src/utils/types";

interface DistancePageProps {
  data: FlightDistanceType;
}

export const DistancePage = ({ data }: DistancePageProps) => {
  return (
    <>
      <Header />
      <main className="mb-5 min-h-screen lg:mb-10">
        <RouterSection />
        <DescriptionSection
          OriginCityName={data.OriginCityName}
          DestinationCityName={data.DestinationCityName}
          OriginCountryName={data.OriginCountryName}
          DestinationCountryName={data.DestinationCountryName}
          FlightDuration={data.FlightDuration}
        />
        <MapSection
          OriginCenterX={data.OriginCenterX}
          OriginCenterY={data.OriginCenterY}
          DestinationCenterX={data.DestinationCenterX}
          DestinationCenterY={data.DestinationCenterY}
          FlightDuration={data.FlightDuration}
          LengthKm={data.LengthKm}
          OriginCityName={data.OriginCityName}
          DestinationCityName={data.DestinationCityName}
        />
        <InfoSection
          FlightDuration={data.FlightDuration}
          OriginCityName={data.OriginCityName}
          DestinationCityName={data.DestinationCityName}
          OriginCountryName={data.OriginCountryName}
          DestinationCountryName={data.DestinationCountryName}
        />
        <AirportsSection data={data} />
        <FAQSection />
        <RelatedFlightsSection />
        <MoreSection />
        <MoreSection />
      </main>
      <Footer />
    </>
  );
};
