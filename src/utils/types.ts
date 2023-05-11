export interface AirportItem {
  id: number;
  Name: string;
  Type: AirportType;
  IATA: string;
  ICAO: string;
  City: string;
  Country: string;
  CenterX: number;
  CenterY: number;
  Distance?: number;
  Passengers: number;
  IntroEn: string;
  SeoTitleEn: string;
  SeoDescriptionEn: string;
}

export interface RegionType {
  id: number;
  Code: string;
  Country: string;
  CountryI2: number;
  Name: string;
  TypeLocal: string;
  TypeEn: string;
  Type: string;
  Points: string;
  Points2: string;
}

export type AirportType = "All" | "International" | "Domestic" | "Local";

export interface FlightDistanceType {
  LengthKm: number;
  FlightDuration: string;
  OriginAirportName: string;
  DestinationAirportName: string;
  OriginCenterX: number;
  OriginCenterY: number;
  DestinationCenterX: number;
  DestinationCenterY: number;
  OriginCityName: string;
  DestinationCityName: string;
  OriginCountryName: string;
  DestinationCountryName: string;
  OriginIata: string;
  DestinationIata: string;
}

export interface DrivingDistanceType {
  DistanceKm: number;
  DrivingTime: string;
  RegionFromCityName: string;
  RegionToCityName: string;
  CountryFromName: string;
  CountryToName: string;
  OriginCenterX: number;
  OriginCenterY: number;
  DestinationCenterX: number;
  DestinationCenterY: number;
}
