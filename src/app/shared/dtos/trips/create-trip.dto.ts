export interface CreateTripDto {
  id: string;
  createdOn: string;
  createdBy: string;
  mainDriver: {
    id: string;
  };
  teamDriver: {
    id: string;
  };
  tripCategory: {
    id: string;
  };
  tripRole: {
    id: string;
  };
}
