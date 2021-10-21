export interface DriverLastInfoDto {
  externalId: number;
  mainDriver: {
    id: string;
    firstName: string;
    lastName: string;
    locationId: string;
    driverCategoryId: string;
  };
  tripCategory: {
    externalId: number;
    name: string;
    id: string;
    createdOn: string;
    isRowDeleted: boolean;
  };
  isCompleted: boolean;
  startTime: string;
  tripRole: {
    name: string;
    id: string;
    createdOn: string;
    isRowDeleted: boolean;
  };
  trailer: {
    id: string;
    unitNo: string;
    trailerStatusId: string;
  };
  truck: {
    id: string;
    unitNo: string;
    powerUnit: number;
    truckStatusId: string;
  };
  status: {
    name: string;
    id: string;
    createdOn: string;
    isRowDeleted: boolean;
  };
  tripAuxiliaries: [];
  id: string;
  createdOn: string;
  createdBy: string;
  modifiedOn: string;
  modifiedBy: string;
  isRowDeleted: boolean;
}
