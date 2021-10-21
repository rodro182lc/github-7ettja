export interface ReceivedRealTimeUpdateDto {
  status: string;
  source: string;
  content: {
    entityType: string;
    eventType: string;
    entity: any;
    text: string;
  };
  createdDateUtc: string;
}
