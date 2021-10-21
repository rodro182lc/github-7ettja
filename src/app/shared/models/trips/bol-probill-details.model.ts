export interface BolProbillDetails {
  references?: {
    referenceNumber: string;
    cargoDescription: string;
    quantity: number;
    quantityUnits: string;
    weight: number;
    weightUnits: string;
  }[];
  probillType: {
    omitProbill: boolean;
    truckLoad: boolean;
    expedite: boolean;
    hazmat: boolean;
    farmOut: boolean;
  };
  numberOfPackages: number;
  declaredValue: number;
  packageType: string;
  countryOfOrigin: string;
  shippingName: string;
  class: string;
  subClass: string;
  unCode: string;
  pg: string;
  emergencyContact: string;
  phone: string;
}
