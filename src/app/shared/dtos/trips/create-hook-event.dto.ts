export interface CreateHookEventDto {
  tripId: string;
  location: {
    id: string;
  };
  trailer: {
    id: string;
  };
  eventType: {
    id: string;
  };
}
