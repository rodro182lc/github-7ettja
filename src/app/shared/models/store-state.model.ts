import { UserAuthSettings } from './user-auth-settings.model';
import { Terminal } from './trips/terminal.model';
import { TripRole } from './trips/trip-role.model';
import { TripStatus } from './trips/trip-status.model';
import { SettingCategory } from './profile/setting-category.model';
import { TripQuery } from './trips/trip-query.model';
import { EventType } from './trips/event-type.model';
import { EquipmentType } from './trips/equipment-type.model';
import { HandlingType } from './trips/handling-type.model';
import { TripReeferMode } from './trips/trip-reefer-mode.model';
import { PickUpType } from './trips/pick-up-type.model';
import { EventLocationStatus } from './trips/event-location-status.model';
import { EventLocationTimeZone } from './trips/event-location-time-zone';
import { TripAuxiliaryItem } from './trips/trip-auxiliary-item.model';
import { Country } from './trips/country,model';
import { Unit } from './trips/unit.model';
import { ProbillStatus } from './trips/probill-status.model';
import { TrailerLoadStatus } from './trips/trailer-load-status.model';
import { TrailerStatus } from './trips/trailer-status.model';
import { NoteType } from './note-type.model';
import { TruckStatus } from './trips/truck-status.model';
import { DriverStatus } from './trips/driver-status.model';

export interface StoreState {
  userAuthSettings: UserAuthSettings;
  terminals: Terminal[];
  tripRoles: TripRole[];
  tripStatuses: TripStatus[];
  tripQuery: TripQuery;
  settingCategories: SettingCategory[];
  eventTypes: EventType[];
  handlingTypes: HandlingType[];
  equipmentTypes: EquipmentType[];
  tripReeferModes: TripReeferMode[];
  pickUpTypes: PickUpType[];
  eventLocationStatuses: EventLocationStatus[];
  eventLocationTimeZones: EventLocationTimeZone[];
  tripAuxItems: TripAuxiliaryItem[];
  countries: Country[];
  quantities: Unit[];
  weights: Unit[];
  probillStatuses: ProbillStatus[];
  trailerLoadStatuses: TrailerLoadStatus[];
  trailerStatuses: TrailerStatus[];
  truckStatuses: TruckStatus[];
  driverStatuses: DriverStatus[];
  noteTypes: NoteType[];
}
