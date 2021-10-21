// This enum contains the relationship between a column displayed in Trips Grid
// and the source field name that such column uses
export enum TripGridColumn {
  TripId = 'tripId',
  Trip = 'tripWithIcons',
  Driver = 'driver',
  Truck = 'truck',
  Trailer1 = 'trailer1',
  TruckLocation = 'truckLocation',
  TrailerLocation = 'trailerLocation',
  NextEventETA = 'nextEventETA',
  HOS = 'hos',
  LastDate = 'lastDate',
  NextDate = 'nextDate',
  LastEvent = 'lastEventName',
  NextEvent = 'nextEventName',
  LastLocation = 'lastLocation',
  NextLocation = 'nextLocation',
  NextState = 'nextState',
  NextCity = 'nextCity',
  LastCity = 'lastCity',
  Category = 'category',
  Dispatcher = 'dispatcher',
  Status = 'status'
}

export type TripGridColumnKey = keyof typeof TripGridColumn;
