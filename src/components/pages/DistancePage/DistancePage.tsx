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
import type { AirportItem, FlightDistanceType } from "~/src/utils/types";
import Head from "next/head";

interface DistancePageProps {
  data: FlightDistanceType;
  relatedOriginAirports: FlightDistanceType[];
  relatedDestinationAirports: FlightDistanceType[];
  originAirport: AirportItem;
  destinationAirport: AirportItem;
  airportsAroundOrigin: AirportItem[];
  airportsAroundDestination: AirportItem[];
}

export const DistancePage = ({
  data,
  relatedDestinationAirports,
  relatedOriginAirports,
  originAirport,
  destinationAirport,
  airportsAroundOrigin,
  airportsAroundDestination,
}: DistancePageProps) => {
  return (
    <>
      <Head>
        <title>{"SEO title"}</title>
        <meta name="description" content={"SEO description"} />
      </Head>
      <Header />
      <main className="mb-5 min-h-screen lg:mb-10">
        <RouterSection />
        <DescriptionSection
          OriginCityName={originAirport?.City || data.OriginCityName}
          DestinationCityName={
            destinationAirport?.City || data.DestinationCityName
          }
          OriginCountryName={originAirport?.Country || data.OriginCountryName}
          DestinationCountryName={
            destinationAirport?.Country || data.DestinationCountryName
          }
          FlightDuration={data.FlightDuration}
          DistanceKm={data.LengthKm}
          DistanceMiles={data.LengthMiles}
        />
        <MapSection
          OriginCenterX={originAirport?.CenterX || data.OriginCenterX}
          OriginCenterY={originAirport?.CenterY || data.OriginCenterY}
          DestinationCenterX={
            destinationAirport?.CenterX || data.DestinationCenterX
          }
          DestinationCenterY={
            destinationAirport?.CenterY || data.DestinationCenterY
          }
          FlightDuration={data.FlightDuration}
          LengthKm={data.LengthKm}
          OriginCityName={originAirport?.City || data.OriginCityName}
          DestinationCityName={
            destinationAirport?.City || data.DestinationCityName
          }
        />
        <InfoSection
          FlightDuration={data.FlightDuration}
          DistanceKm={data.LengthKm}
          DistanceMiles={data.LengthMiles}
          airportsAroundOrigin={airportsAroundOrigin}
          airportsAroundDestination={airportsAroundDestination}
          originAirport={originAirport}
          destinationAirport={destinationAirport}
        />
        <AirportsSection
          data={data}
          originAirport={originAirport}
          destinationAirport={destinationAirport}
        />
        <FAQSection />
        <RelatedFlightsSection
          originCountry={data.OriginCountryName}
          destinationCountry={data.DestinationCountryName}
          relatedOriginAirports={relatedOriginAirports}
          relatedDestinationAirports={relatedDestinationAirports}
        />
        <MoreSection />
        <MoreSection />
      </main>
      <Footer />
    </>
  );
};
