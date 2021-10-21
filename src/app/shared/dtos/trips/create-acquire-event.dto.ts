export interface CreateAcquireEventDto {
  tripId: string;
  location: {
    id: string;
  };
  truck: {
    id: string;
  };
  eventType: {
    id: string;
  };
}
