import { KeyValue } from '@angular/common';

export enum TripFieldFilter {
  // This type below will just remove any client-side filter criteria
  ResetClientSearch = 'ResetClientSearch',
  // This type below will fetch all server side records without any kind of filtering
  ResetServerSearch = 'ResetServerSearch',
  // This type below will filter in client side the records that were last gotten by server (on a previous search/load)
  ClientSideSearch = 'ClientSideSearch',
  // All these types below will do a server side filtering by a specific field and value
  OrderNumber = 'OrderNumber',
  ProbillNumber = 'ProbillNumber',
  PONumber = 'PONumber',
  BOLNumber = 'BOLNumber',
  PickUpNumber = 'PickUpNumber',
  PickUpRefNumber = 'PickUpRefNumber',
  DeliveryNumber = 'DeliveryNumber',
  DeliveryRefNumber = 'DeliveryRefNumber',
  TripNumber = 'TripNumber',
  DriverCode = 'DriverCode',
  TruckNumber = 'TruckNumber',
  TrailerNumber = 'TrailerNumber'
}

export const TRIP_FIELD_FILTER_TYPES: KeyValue<TripFieldFilter, string>[] = [
  {
    key: TripFieldFilter.ClientSideSearch,
    value: ' - '
  },
  {
    key: TripFieldFilter.OrderNumber,
    value: 'Order #'
  },
  {
    key: TripFieldFilter.ProbillNumber,
    value: 'Probill #'
  },
  {
    key: TripFieldFilter.PONumber,
    value: 'PO #'
  },
  {
    key: TripFieldFilter.BOLNumber,
    value: 'BOL #'
  },
  {
    key: TripFieldFilter.PickUpNumber,
    value: 'Pickup #'
  },
  {
    key: TripFieldFilter.PickUpRefNumber,
    value: 'Pickup Ref #'
  },
  {
    key: TripFieldFilter.DeliveryNumber,
    value: 'Delivery #'
  },
  {
    key: TripFieldFilter.DeliveryRefNumber,
    value: 'Delivery Ref #'
  },
  {
    key: TripFieldFilter.TripNumber,
    value: 'Trip #'
  },
  {
    key: TripFieldFilter.DriverCode,
    value: 'Driver Code'
  },
  {
    key: TripFieldFilter.TruckNumber,
    value: 'Truck #'
  },
  {
    key: TripFieldFilter.TrailerNumber,
    value: 'Trailer #'
  }
];
