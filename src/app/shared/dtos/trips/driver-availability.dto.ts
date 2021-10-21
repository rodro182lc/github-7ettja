export interface DriverAvailabilityDto {
  tripId: string;
  name: string;
  driverCode: string;
  availability: string;
  notes: string;
  isAcknowledge: boolean;
  approvedBy: string;
  approvedOn: string;
}
