export interface TripToCloseDto {
  tripId: string;
  dateIn: string | null;
  note: string;
  isInternal: boolean;
}
