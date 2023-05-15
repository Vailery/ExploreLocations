import { Footer } from "../../Footer";
import { Header } from "../../Header";
import { DescriptionSection } from "./subcomponents/DescriptionSection";
import { InfoSection } from "./subcomponents/InfoSection";
import { MapSection } from "./subcomponents/MapSection";
import { RouterSection } from "./subcomponents/RouterSection";
import { AirportsSection } from "./subcomponents/AirportsSection";
import { RelatedFlightsSection } from "./subcomponents/RelatedFlightsSection/RelatedFlightsSection";
import { MoreSection } from "./subcomponents/MoreSection";
import { FAQSection } from "../../shared/FAQSection";
import type { DrivingDistanceType } from "~/src/utils/types";

interface DrivingDistancePageProps {
  drivingDistanceData: DrivingDistanceType;
}

export const DrivingDistancePage = ({
  drivingDistanceData,
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
      <Header />
      <main className="mb-5 min-h-screen lg:mb-10">
        <RouterSection />
        <DescriptionSection
          from={RegionFromCityName}
          to={RegionToCityName}
          time={DrivingTime}
          distance={DistanceKm}
          distanceMiles={DistanceMiles}
        />
        <MapSection
          time={DrivingTime}
          distance={DistanceKm}
          distanceMiles={DistanceMiles}
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
        <AirportsSection
          originX={OriginCenterX}
          originY={OriginCenterY}
          destinationX={DestinationCenterX}
          destinationY={DestinationCenterY}
          countryFrom={CountryFromName}
          countryTo={CountryToName}
          from={RegionFromCityName}
          to={RegionToCityName}
        />
        <FAQSection />
        <RelatedFlightsSection />
        <MoreSection />
        <MoreSection />
      </main>
      <Footer />
    </>
  );
};
