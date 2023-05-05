import { CsvParser } from "./baseParsers/CsvParser";
import { type PrismaTransactionClient } from "./baseParsers/Parser";

export class DrivingRoutesParser extends CsvParser<DrivingRoutesCsvProperties> {
  constructor() {
    super("driving_routes_database_1.csv", "driving_routes_database_2.csv");
  }

  async setupDatabase(
    transactionClient: PrismaTransactionClient
  ): Promise<void> {
    await transactionClient.$executeRaw`TRUNCATE TABLE "DrivingRoutes"`;
  }

  async saveElement(
    element: DrivingRoutesCsvProperties,
    transactionClient: PrismaTransactionClient
  ): Promise<void> {
    const regionFromCoordinates = this.сoordinatesToLonLat(
      element.region_from_coordinates_1
    );
    const regionToCoordinates = this.сoordinatesToLonLat(
      element.region_to_coordinates_1
    );

    await transactionClient.$executeRaw`INSERT INTO "DrivingRoutes"
      (
        -- "id",
        "TitleEn",
        "DistanceKm",
        "DistanceMiles",
        "DrivingTime",
        "FlightDistance",
        "FlightDistanceMiles",
        "RegionFromCoordinates",
        "RegionFromCoordinatesOriginal",
        "RegionToCoordinates",
        "RegionToCoordinatesOriginal",
        "RegionFromCityName",
        "RegionFromCityId",
        "CountryFromName",
        "CountryFromId",
        "RegionToCityName",
        "RegionToCityId",
        "CountryToName",
        "CountryToId",
        "MNI",
        "SeoDemandEn",
        "MetaTitleEn",
        "MetaDescriptionEn",
        "IntroEn",
        "ContentEn",
        "FaqQ1En",
        "FaqA1En",
        "FaqQ2En",
        "FaqA2En"
      )
      VALUES
      ( --${parseInt(element.id)},
        ${element.title_en},
        ${parseInt(element.distance_km)},
        ${parseInt(element.distance_miles)},
        ${element.driving_time},
        ${parseInt(element.flight_distance)},
        ${parseInt(element.flight_distance_miles)},
        ST_SetSRID(ST_MakePoint(
          ${parseFloat(regionFromCoordinates[1] || "")}, ${parseFloat(
      regionFromCoordinates[0] || ""
    )}
        ), 4326),
        ${element.region_from_coordinates_2},
        ST_SetSRID(ST_MakePoint(
          ${parseFloat(regionToCoordinates[1] || "")}, ${parseFloat(
      regionToCoordinates[0] || ""
    )}
        ), 4326),
        ${element.region_to_coordinates_2},
        ${element.region_from_city_name},
        ${element.region_from_city_id},
        ${element.country_from_name},
        ${element.country_from_id},
        ${element.region_to_city_name},
        ${element.region_to_city_id},
        ${element.country_to_name},
        ${element.country_to_id},
        ${element.mni === "true"},
        ${parseInt(element.seo_demand_en)},
        ${element.meta_title_en},
        ${element.meta_description_en},
        ${element.intro_en},
        ${element.content_en},
        ${element.faq_q1_en},
        ${element.faq_a1_en},
        ${element.faq_q2_en},
        ${element.faq_a2_en}
      )`;
  }

  сoordinatesToLonLat(pointStr: string): string[] {
    const result = pointStr.split(/[ ,]+/);
    return result;
  }
}

interface DrivingRoutesCsvProperties {
  id: string;
  title_en: string;
  distance_km: string;
  distance_miles: string;
  driving_time?: string;
  flight_distance: string;
  flight_distance_miles: string;
  region_from_coordinates_1: string;
  region_from_coordinates_2: string;
  region_to_coordinates_1: string;
  region_to_coordinates_2: string;
  region_from_city_name: string;
  region_from_city_id?: string;
  country_from_name: string;
  country_from_id?: string;
  region_to_city_name: string;
  region_to_city_id?: string;
  country_to_name: string;
  country_to_id?: string;
  mni: string;
  seo_demand_en: string;
  meta_title_en?: string;
  meta_description_en?: string;
  intro_en?: string;
  content_en?: string;
  faq_q1_en?: string;
  faq_a1_en?: string;
  faq_q2_en?: string;
  faq_a2_en?: string;
}
