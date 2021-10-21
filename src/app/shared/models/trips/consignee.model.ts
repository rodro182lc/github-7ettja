export interface Consignee {
  name: string;
  destinationId: string;
  destinationName: string;
  deliveryTypeId: string;
  scheduledDelivery: Date | null;
  actualDelivery: Date | null;
  mab: Date | null;
  deliveryNo: string;
}
