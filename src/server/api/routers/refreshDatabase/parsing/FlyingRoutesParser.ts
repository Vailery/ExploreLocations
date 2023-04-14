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
    const originGpsCoordinates = this.dmsCoordinatesToLonLat(
      element.origin_gps_coordinates,
      element.id
    );
    const destinationGpsCoordinates = this.dmsCoordinatesToLonLat(
      element.destination_gps_coordinates,
      element.id
    );
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
        "DestinationAirportName",
        "DestinationAirportId",
        "DestinationCityName",
        "DestinationCityId",
        "DestinationCountryName",
        "DestinationCountryId",
        "DestinationIata",
        "DestinationIcao",
        "DestinationGpsCoordinates",
        "Airlines"
      )
      VALUES
      ( ${Number.parseInt(element.id)},
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
        ST_SetSRID(ST_MakePoint(
          ${originGpsCoordinates[0]}, ${originGpsCoordinates[1]}
        ), 4326),
        ${element.destination_airport_name},
        ${element.destination_airport_id},
        ${element.destination_city_name},
        ${element.destination_city_id},
        ${element.destination_country_name},
        ${element.destination_country_id},
        ${element.destination_iata},
        ${element.destination_icao},
        ST_SetSRID(ST_MakePoint(
          ${destinationGpsCoordinates[0]}, ${destinationGpsCoordinates[1]}
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

  //DMS - Degrees Minutes Seconds coordinates format
  //example: 31°32′50″N, 102°21′14″E
  dmsCoordinatesToLonLat(pointStr: string, id: string): number[] {
    const groups = pointStr.match(
      /(\d{1,3})°(\d{1,2})′(\d{1,2})″([NS]), (\d{1,3})°(\d{1,2})′(\d{1,2})″([EW])/
    );
    if (groups == null) {
      throw new Error(
        `origin_gps_coordinates is broken: ${pointStr} in id: ${id}`
      );
    }
    const latSign = groups[4] === "N" ? 1 : -1;
    const lonSign = groups[8] === "E" ? 1 : -1;

    const lat = this.toCoordinate(groups[1], groups[2], groups[3], latSign);
    const lon = this.toCoordinate(groups[5], groups[6], groups[7], lonSign);
    return [lon, lat];
  }

  toCoordinate(
    degrees: string | undefined,
    minuets: string | undefined,
    seconds: string | undefined,
    sign: number
  ): number {
    if (
      degrees === undefined ||
      minuets === undefined ||
      seconds === undefined
    ) {
      throw new Error("origin_gps_coordinates is broken in coords");
    }
    return (
      sign *
      (parseFloat(degrees) +
        parseFloat(minuets) / 60.0 +
        parseFloat(seconds) / 3600.0)
    );
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
  destination_airport_name: string;
  destination_airport_id?: string;
  destination_city_name: string;
  destination_city_id?: string;
  destination_country_name: string;
  destination_country_id?: string;
  destination_iata: string;
  destination_icao: string;
  destination_gps_coordinates: string;
  nr_airlines: string;
}
