export interface TripEventIcon {
  // 📞: Probill information is missing, needs to call customer for appointment
  missingAppointment: boolean;
  // 🚪: Probill information is confirmed for specific time period
  confirmedAppointment: boolean;
}
