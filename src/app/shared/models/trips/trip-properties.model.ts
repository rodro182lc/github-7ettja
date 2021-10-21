export interface TripProperties {
  tripId: string | null;
  tripNo: string | null;
  terminal: string[] | null;
  tripRole: string[] | null;
  dispatcher: string | null;
  tripCategory: string[] | null;
  leadDriver: string[] | null;
  teamDriver: string[] | null;
  dateOut: Date | null;
  dateIn: Date | null;
  createdOn: Date | null;
  markClose: boolean | null;
  modifiedBy: string | null;
  modifiedOn: string | null;
  isCompleted: boolean | null;
}
