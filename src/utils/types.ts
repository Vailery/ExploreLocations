export interface AirportItem {
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
}

export interface RegionType {
  id: 6568;
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
