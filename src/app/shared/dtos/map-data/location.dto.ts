export interface LocationDto {
  id: string;
  externalId: number;
  name: string;
  address1: string;
  address2: string;
  city: string;
  postalCode: string;
  lon: number;
  lat: number;
  geolocationExt: string;
  jurisdiction: {
    id: string;
    name: string;
    code: string;
  };
}
