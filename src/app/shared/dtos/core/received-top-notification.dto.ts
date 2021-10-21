export interface ReceivedTopNotificationDto {
  entityType: string;
  eventType: string;
  entityId: string;
  text: string;
  createdDateUtc: string;
}
