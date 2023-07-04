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

export const FlyingDistancePage = ({
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
        <title>{`${originAirport.City} to ${destinationAirport.City} Flight Time`}</title>
        <meta
          name="description"
          content={`Explore how long is the flight time, distance, and route between ${originAirport.City}, ${originAirport.Country} and ${destinationAirport.City}, ${destinationAirport.Country}`}
        />
      </Head>
      <Header />
      <main className="mb-5 min-h-screen lg:mb-10">
        <RouterSection />
        <DescriptionSection
          OriginCityName={originAirport.City}
          DestinationCityName={destinationAirport.City}
          OriginCountryName={originAirport.Country}
          DestinationCountryName={destinationAirport.Country}
          FlightDuration={data.FlightDuration}
          DistanceKm={data.LengthKm}
          DistanceMiles={data.LengthMiles}
        />
        <MapSection
          OriginCenterX={originAirport.CenterX}
          OriginCenterY={originAirport.CenterY}
          DestinationCenterX={destinationAirport.CenterX}
          DestinationCenterY={destinationAirport.CenterY}
          FlightDuration={data.FlightDuration}
          LengthKm={data.LengthKm}
          OriginCityName={originAirport.City}
          DestinationCityName={destinationAirport.City}
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
        <MoreSection country={originAirport.Country} />
        <MoreSection country={destinationAirport.Country} />
      </main>
      <Footer />
    </>
  );
};
