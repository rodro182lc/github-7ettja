export interface OpeningHoursDto {
  day: string;
  closed?: boolean;
  openHour?: string;
  closedHour?: string;
  startBreakTime?: string;
  endBreakTime?: string;
  type: string;
}
