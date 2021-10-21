export interface CreateProbillEventDto {
  tripId: string;
  probill: {
    id: string;
  };
  eventType: {
    id: string;
  };
}
