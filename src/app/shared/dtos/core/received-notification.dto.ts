export interface ReceivedNotificationDto {
  notificationLevel: string;
  entity: string;
  createdDateUtc: string;
  notificationType: string;
  entityId: string;
  displayText: string;
  i18nKey: string;
  id: string;
  vars: any;
}
