export interface TripLoadCriteriaDto {
  filters: TripQueryCriteriaDto[];
  search: TripSearchCriteriaDto;
}

export interface TripQueryCriteriaDto {
  criteria: number;
  ids: string[];
}

export interface TripSearchCriteriaDto {
  orderNo?: number;
  probillNo?: number;
  poNumber?: string;
  pickupNumber?: string;
  deliveryNumber?: string;
  tripNo?: number;
  driverCode?: string;
  truck?: string;
  trailer?: string;
}
