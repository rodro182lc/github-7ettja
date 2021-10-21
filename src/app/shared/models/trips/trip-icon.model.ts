import { TripEventColumnIcon } from './trip-event-column-icon.model';

export interface TripIcon {
  // ...: Trip number is still in process of being generated
  isBrandNewTrip: boolean;
  appointment: {
    // 📞: Probill information is missing, needs to call customer for appointment
    missingAppointment: boolean;
    // 🚪: Probill information is confirmed for specific time period
    confirmedAppointment: boolean;
  };
  // Bullet ● at left of Driver name
  ace: {
    danger: boolean;
    warning: boolean;
    success: boolean;
  };
  // Bullet ● at right of Driver name
  aci: {
    danger: boolean;
    warning: boolean;
    success: boolean;
  };
  // ⚠️: Reefer fuel level is low or deviation in reefer
  fuelWarning: boolean;
  // Rules for the Next Event field
  nextEvent: TripEventColumnIcon;
  // Rules for the Last Event field
  finalEvent: TripEventColumnIcon;
}
