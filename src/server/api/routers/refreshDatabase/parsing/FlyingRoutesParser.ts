import { CsvParser } from "./baseParsers/CsvParser";
import { type PrismaTransactionClient } from "./baseParsers/Parser";

export class FlyingRoutesParser extends CsvParser<FlyingRoutesCsvProperties> {
  constructor() {
    super("flying_routes.csv");
  }

  async setupDatabase(
    transactionClient: PrismaTransactionClient
  ): Promise<void> {
    await transactionClient.$executeRaw`TRUNCATE TABLE "FlyingRoutes"`;
  }

  async saveElement(
    element: FlyingRoutesCsvProperties,
    transactionClient: PrismaTransactionClient
  ): Promise<void> {
    const airlines = this.getAirlines(element);

    await transactionClient.$executeRaw`INSERT INTO "FlyingRoutes"
      (
        "id",
        "RouteIata",
        "Type",
        "LengthMiles",
        "LengthKm",
        "FlightDuration",
        "TimeDifference",
        "CO2Emissions",
        "IntroEn",
        "DetailsEn",
        "MetaDescriptionEn",
        "OriginAirportName",
        "OriginAirportId",
        "OriginCityName",
        "OriginCityId",
        "OriginCountryName",
        "OriginCountryId",
        "OriginIata",
        "OriginIcao",
        "OriginGpsCoordinates",
        "OriginCoordinates",
        "DestinationAirportName",
        "DestinationAirportId",
        "DestinationCityName",
        "DestinationCityId",
        "DestinationCountryName",
        "DestinationCountryId",
        "DestinationIata",
        "DestinationIcao",
        "DestinationGpsCoordinates",
        "DestinationCoordinates",
        "Airlines"
      )
      VALUES
      ( ${parseInt(element.id)},
        ${element.route_iata},
        ${element.type}::"FlyingRouteType",
        ${parseInt(element.length_miles)},
        ${parseInt(element.length_km)},
        ${element.flight_duration},
        ${element.time_difference},
        ${element.co2_emissions},
        ${element.intro_en},
        ${element.details_en},
        ${element.meta_description_en},
        ${element.origin_airport_name},
        ${element.origin_airport_id},
        ${element.origin_city_name},
        ${element.origin_city_id},
        ${element.origin_country_name},
        ${element.origin_city_id},
        ${element.origin_iata},
        ${element.origin_icao},
        ${element.origin_gps_coordinates},
        ST_SetSRID(ST_MakePoint(
          ${parseInt(element.origin_longitude)},${parseInt(
      element.origin_latitude
    )} 
        ), 4326),
        ${element.destination_airport_name},
        ${element.destination_airport_id},
        ${element.destination_city_name},
        ${element.destination_city_id},
        ${element.destination_country_name},
        ${element.destination_country_id},
        ${element.destination_iata},
        ${element.destination_icao},
        ${element.destination_gps_coordinates},
        ST_SetSRID(ST_MakePoint(
          ${parseInt(element.destination_longitude)}, ${parseInt(
      element.destination_latitude
    )}
        ), 4326),
        ${airlines}
      )`;
  }

  getAirlines(element: FlyingRoutesCsvProperties): string[] {
    const ans: string[] = [];
    const size = parseInt(element.nr_airlines ?? "0");
    for (let i = 0; i < size; i++) {
      const airlineName = `airline_${i + 1}`;
      const airline = element[airlineName as keyof typeof element];
      if (airline !== undefined) {
        ans.push(airline);
      }
    }
    const knownMismatchingAirlineIds: string[] = ["30658"];
    if (size !== ans.length) {
      if (!knownMismatchingAirlineIds.includes(element.id)) {
        throw new Error(
          `some airports are missing in id: ${element.id}. Contact source file maintainer about mismatch`
        );
      }
    } else {
      if (knownMismatchingAirlineIds.includes(element.id)) {
        throw new Error(
          `airline with id: ${element.id} is no longer broken, remove exception from code`
        );
      }
    }
    return ans;
  }
}

interface FlyingRoutesCsvProperties {
  id: string;
  route_iata: string;
  type: string;
  length_miles: string;
  length_km: string;
  flight_duration: string;
  time_difference: string;
  co2_emissions: string;
  intro_en?: string;
  details_en?: string;
  meta_description_en?: string;
  origin_airport_name: string;
  origin_airport_id?: string;
  origin_city_name: string;
  origin_city_id?: string;
  origin_country_name: string;
  origin_country_id?: string;
  origin_iata: string;
  origin_icao: string;
  origin_gps_coordinates: string;
  origin_latitude: string;
  origin_longitude: string;
  destination_airport_name: string;
  destination_airport_id?: string;
  destination_city_name: string;
  destination_city_id?: string;
  destination_country_name: string;
  destination_country_id?: string;
  destination_iata: string;
  destination_icao: string;
  destination_gps_coordinates: string;
  destination_latitude: string;
  destination_longitude: string;
  nr_airlines: string;
}
