export interface Shipper {
  name: string;
  pickUpId: string;
  pickUpName: string;
  pickUpTypeId: string;
  scheduledPickUp: Date | null;
  actualPickUp: Date | null;
  mab: Date | null;
  pickupNo: string;
}
