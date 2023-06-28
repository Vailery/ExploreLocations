CREATE EXTENSION IF NOT EXISTS postgis;

-- CreateEnum
CREATE TYPE "TypeOfAirport" AS ENUM ('domestic', 'local', 'international');

-- CreateEnum
CREATE TYPE "FlyingRouteType" AS ENUM ('Local', 'International');

-- CreateTable
CREATE TABLE "Airports" (
    "id" SERIAL NOT NULL,
    "Geometry" geography(MultiPolygon, 4326) NOT NULL,
    "Center" geography(Point, 4326) NOT NULL,
    "Name" TEXT NOT NULL,
    "IntroEn" TEXT NOT NULL,
    "SeoTitleEn" TEXT NOT NULL,
    "SeoDescriptionEn" TEXT NOT NULL,
    "Type" "TypeOfAirport" NOT NULL,
    "AltName" TEXT,
    "IATA" TEXT,
    "ICAO" TEXT,
    "Passengers" TEXT,
    "NameDe" TEXT,
    "NameEn" TEXT,
    "NameEs" TEXT,
    "NameFr" TEXT,
    "NameIT" TEXT,
    "NameNL" TEXT,
    "Operator" TEXT,
    "City" TEXT,
    "Country" TEXT,
    "ElFeet" INTEGER NOT NULL,
    "ElMeters" DOUBLE PRECISION NOT NULL,
    "Website" TEXT,
    "Wiki" TEXT,
    "TimezoneS" TEXT,
    "TimezoneD" TEXT,

    CONSTRAINT "Airports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Countries" (
    "id" SERIAL NOT NULL,
    "Geometry" geography(MultiPolygon, 4326) NOT NULL,
    "Name" TEXT NOT NULL,
    "Code" TEXT NOT NULL,

    CONSTRAINT "Countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminRegions" (
    "id" SERIAL NOT NULL,
    "Geometry" geography(MultiPolygon, 4326) NOT NULL,
    "Center" geography(Point, 4326) NOT NULL,
    "Code" TEXT NOT NULL,
    "Country" TEXT NOT NULL,
    "CountryI2" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "TypeLocal" TEXT NOT NULL,
    "TypeEn" TEXT NOT NULL,
    "Type" TEXT NOT NULL,
    "Points" TEXT NOT NULL,
    "Points2" TEXT NOT NULL,

    CONSTRAINT "AdminRegions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Districts" (
    "id" SERIAL NOT NULL,
    "Geometry" geography(MultiPolygon, 4326) NOT NULL,
    "Center" geography(Point, 4326) NOT NULL,
    "Code" TEXT NOT NULL,
    "Country" TEXT NOT NULL,
    "CountryID" INTEGER NOT NULL,
    "ParentADM" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "TypeLocal" TEXT NOT NULL,
    "TypeEn" TEXT NOT NULL,
    "Type" TEXT NOT NULL,

    CONSTRAINT "Districts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Municipalities" (
    "id" SERIAL NOT NULL,
    "Geometry" geography(MultiPolygon, 4326) NOT NULL,
    "Center" geography(Point, 4326) NOT NULL,
    "Code" TEXT NOT NULL,
    "Country" TEXT NOT NULL,
    "CountryID" INTEGER NOT NULL,
    "ParentADM" TEXT NOT NULL,
    "ParentDIS" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "TypeLocal" TEXT NOT NULL,
    "Type" TEXT NOT NULL,

    CONSTRAINT "Municipalities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cities" (
    "id" SERIAL NOT NULL,
    "Geometry" geography(Point, 4326) NOT NULL,
    "Name" TEXT NOT NULL,
    "Type" TEXT NOT NULL,
    "NameAlt" TEXT NOT NULL,
    "Country" TEXT NOT NULL,
    "ISO2" TEXT NOT NULL,
    "ISO3" TEXT NOT NULL,
    "ParentADM" TEXT NOT NULL,
    "Capital" TEXT NOT NULL,
    "Population" TEXT NOT NULL,

    CONSTRAINT "Cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlyingRoutes" (
    "id" SERIAL NOT NULL,
    "RouteIata" TEXT NOT NULL,
    "Type" "FlyingRouteType" NOT NULL,
    "LengthMiles" INTEGER NOT NULL,
    "LengthKm" INTEGER NOT NULL,
    "FlightDuration" TEXT NOT NULL,
    "TimeDifference" TEXT NOT NULL,
    "CO2Emissions" TEXT NOT NULL,
    "IntroEn" TEXT,
    "DetailsEn" TEXT,
    "MetaDescriptionEn" TEXT,
    "OriginAirportName" TEXT NOT NULL,
    "OriginAirportId" TEXT,
    "OriginCityName" TEXT NOT NULL,
    "OriginCityId" TEXT,
    "OriginCountryName" TEXT NOT NULL,
    "OriginCountryId" TEXT,
    "OriginIata" TEXT NOT NULL,
    "OriginIcao" TEXT NOT NULL,
    "OriginGpsCoordinates" TEXT NOT NULL,
    "OriginCoordinates" geography(Point, 4326) NOT NULL,
    "DestinationAirportName" TEXT NOT NULL,
    "DestinationAirportId" TEXT,
    "DestinationCityName" TEXT NOT NULL,
    "DestinationCityId" TEXT,
    "DestinationCountryName" TEXT NOT NULL,
    "DestinationCountryId" TEXT,
    "DestinationIata" TEXT NOT NULL,
    "DestinationIcao" TEXT NOT NULL,
    "DestinationGpsCoordinates" TEXT NOT NULL,
    "DestinationCoordinates" geography(Point, 4326) NOT NULL,
    "Airlines" TEXT[],

    CONSTRAINT "FlyingRoutes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DrivingRoutes" (
    "id" SERIAL NOT NULL,
    "TitleEn" TEXT NOT NULL,
    "DistanceKm" INTEGER NOT NULL,
    "DistanceMiles" INTEGER NOT NULL,
    "DrivingTime" INTEGER,
    "FlightDistance" INTEGER NOT NULL,
    "FlightDistanceMiles" INTEGER NOT NULL,
    "RegionFromCoordinates" geography(Point, 4326) NOT NULL,
    "RegionFromCoordinatesOriginal" TEXT NOT NULL,
    "RegionToCoordinates" geography(Point, 4326) NOT NULL,
    "RegionToCoordinatesOriginal" TEXT NOT NULL,
    "RegionFromCityName" TEXT NOT NULL,
    "RegionFromCityId" TEXT,
    "CountryFromName" TEXT NOT NULL,
    "CountryFromId" TEXT,
    "RegionToCityName" TEXT NOT NULL,
    "RegionToCityId" TEXT,
    "CountryToName" TEXT NOT NULL,
    "CountryToId" TEXT,
    "MNI" BOOLEAN NOT NULL,
    "SeoDemandEn" INTEGER,
    "MetaTitleEn" TEXT,
    "MetaDescriptionEn" TEXT,
    "IntroEn" TEXT,
    "ContentEn" TEXT,
    "FaqQ1En" TEXT,
    "FaqA1En" TEXT,
    "FaqQ2En" TEXT,
    "FaqA2En" TEXT,

    CONSTRAINT "DrivingRoutes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Example" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Example_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE INDEX "airports_geometry_idx" ON "Airports" USING GIST ("Geometry");

-- CreateIndex
CREATE INDEX "airports_center_point_idx" ON "Airports" USING GIST ("Center");

-- CreateIndex
CREATE INDEX "country_geometry_idx" ON "Countries" USING GIST ("Geometry");

-- CreateIndex
CREATE INDEX "admin_regions_geometry_idx" ON "AdminRegions" USING GIST ("Geometry");

-- CreateIndex
CREATE INDEX "admin_regions_center_point_idx" ON "AdminRegions" USING GIST ("Center");

-- CreateIndex
CREATE INDEX "districts_geometry_idx" ON "Districts" USING GIST ("Geometry");

-- CreateIndex
CREATE INDEX "districts_center_point_idx" ON "Districts" USING GIST ("Center");

-- CreateIndex
CREATE INDEX "municipalities_geometry_idx" ON "Municipalities" USING GIST ("Geometry");

-- CreateIndex
CREATE INDEX "municipalities_center_point_idx" ON "Municipalities" USING GIST ("Center");

-- CreateIndex
CREATE INDEX "flying_routes_origin_сoordinate_idx" ON "FlyingRoutes" USING GIST ("OriginCoordinates");

-- CreateIndex
CREATE INDEX "flying_routes_destination_сoordinate_idx" ON "FlyingRoutes" USING GIST ("DestinationCoordinates");

-- CreateIndex
CREATE INDEX "driving_routes_region_from_сoordinates_idx" ON "DrivingRoutes" USING GIST ("RegionFromCoordinates");

-- CreateIndex
CREATE INDEX "driving_routes_region_to_сoordinates_idx" ON "DrivingRoutes" USING GIST ("RegionToCoordinates");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
