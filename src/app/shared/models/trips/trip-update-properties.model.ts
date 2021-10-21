export interface TripUpdateProperties {
  tripId: string;
  leadDriver: string;
  teamDriver: string;
  dateOut: Date;
  dateIn: Date;
  tripCategory: string;
  terminal: string;
  tripRole: string;
  newDriverNote: string;
  newTripNote: string;
  markClose: boolean;
}
