export enum SettingCategories {
  DriverCategory = 'DriverCategory',
  Dispatcher = 'Dispatcher',
  TruckCategory = 'TruckCategory',
  Role = 'Role',
  Status = 'Status',
  TripCategory = 'TripCategory',
  Terminal = 'Terminal'
}

export type SettingCategoriesKey = keyof typeof SettingCategories;
