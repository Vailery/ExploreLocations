import { Footer } from "../../Footer";
import { Header } from "../../Header";
import { DescriptionSection } from "./subcomponents/DescriptionSection";
import { InfoSection } from "./subcomponents/InfoSection";
import { MapSection } from "./subcomponents/MapSection";
import { RouterSection } from "./subcomponents/RouterSection";
import { CitiesSection } from "./subcomponents/CitiesSection";
import { RelatedFlightsSection } from "./subcomponents/RelatedFlightsSection/RelatedFlightsSection";
import { MoreSection } from "./subcomponents/MoreSection";
import { FAQSection } from "../../shared/FAQSection";
import type { CityType, DrivingDistanceType } from "~/src/utils/types";
import Head from "next/head";

interface DrivingDistancePageProps {
  drivingDistanceData: DrivingDistanceType;
  relatedOriginDistances: DrivingDistanceType[];
  relatedDestinationDistances: DrivingDistanceType[];
  originCity: CityType | null;
  destinationCity: CityType | null;
}

export const DrivingDistancePage = ({
  drivingDistanceData,
  relatedDestinationDistances,
  relatedOriginDistances,
  originCity,
  destinationCity,
}: DrivingDistancePageProps) => {
  const {
    CountryFromName,
    CountryToName,
    DestinationCenterX,
    DestinationCenterY,
    DistanceKm,
    DistanceMiles,
    FlightDistance,
    FlightDistanceMiles,
    DrivingTime,
    OriginCenterX,
    OriginCenterY,
    RegionFromCityName,
    RegionToCityName,
  } = drivingDistanceData;
  return (
    <>
      <Head>
        <title>{`Distance from ${RegionFromCityName} to ${RegionToCityName} - ExploreLocations.com`}</title>
        <meta
          name="description"
          content={`The driving distance from ${RegionFromCityName} to ${RegionToCityName} is ${DistanceKm.toLocaleString(
            "en-US"
          )} kilometers / ${DistanceMiles.toLocaleString(
            "en-US"
          )} miles. Check the route on the map and explore everything about it.`}
        />
      </Head>
      <Header />
      <main className="mb-5 min-h-screen lg:mb-10">
        <RouterSection />
        <DescriptionSection
          from={RegionFromCityName}
          to={RegionToCityName}
          time={DrivingTime}
          distance={DistanceKm}
          distanceMiles={DistanceMiles}
          fromCountry={CountryFromName}
          toCountry={CountryToName}
        />
        <MapSection
          from={RegionFromCityName}
          to={RegionToCityName}
          originX={OriginCenterX}
          originY={OriginCenterY}
          destinationX={DestinationCenterX}
          destinationY={DestinationCenterY}
        />
        <InfoSection
          countryFrom={CountryFromName}
          countryTo={CountryToName}
          time={DrivingTime}
          distance={DistanceKm}
          distanceMiles={DistanceMiles}
          flightKm={FlightDistance}
          flightMiles={FlightDistanceMiles}
          from={RegionFromCityName}
          to={RegionToCityName}
          originX={OriginCenterX}
          originY={OriginCenterY}
          destinationX={DestinationCenterX}
          destinationY={DestinationCenterY}
        />
        <CitiesSection
          originX={OriginCenterX}
          originY={OriginCenterY}
          destinationX={DestinationCenterX}
          destinationY={DestinationCenterY}
          countryFrom={CountryFromName}
          countryTo={CountryToName}
          from={RegionFromCityName}
          to={RegionToCityName}
          dataFrom={originCity}
          dataTo={destinationCity}
        />
        <FAQSection />
        <RelatedFlightsSection
          fromCity={RegionFromCityName}
          toCity={RegionToCityName}
          relatedDestinationDistances={relatedOriginDistances}
          relatedOriginDistances={relatedDestinationDistances}
        />
        <MoreSection country={CountryFromName} />
        <MoreSection country={CountryToName} />
      </main>
      <Footer />
    </>
  );
};
