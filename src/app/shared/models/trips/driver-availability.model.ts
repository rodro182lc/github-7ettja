export interface DriverAvailability {
  tripId: string | null;
  name: string | null;
  driverCode: string | null;
  availability: string | null;
  notes: string | null;
  isAcknowledge: boolean | null;
  approvedBy: string | null;
  approvedOn: Date | null;
}
