export interface TripEventUpsertDto {
  id: string;
  createdOn: string;
  createdBy: string;
  modifiedOn: string;
  modifiedBy: string;
  isRowDeleted: boolean;
  externalId: 0;
  eventType: {
    id: string;
    createdOn: string;
    createdBy: string;
    modifiedOn: string;
    modifiedBy: string;
    isRowDeleted: boolean;
    name: string;
    description: string;
  };
  tripId: string;
  contractId: 0;
  sequenceId: 0;
  locationId: string;
  location: {
    id: string;
    name: string;
    address: string;
  };
  truck: {
    id: string;
    unitNo: string;
    powerUnit: 0;
    truckCategoryId: string;
  };
  trailer: {
    id: string;
    unitNo: string;
    trailerCategoryId: string;
  };
  probil: {
    id: string;
    pickupNumber: string;
    deliveryNumber: string;
    orderId: string;
  };
  tripNotesId: string;
  tripNotes: {
    id: string;
    createdOn: string;
    createdBy: string;
    modifiedOn: string;
    modifiedBy: string;
    isRowDeleted: boolean;
    tripId: string;
    noteId: string;
    note: {
      id: string;
      createdOn: string;
      createdBy: string;
      modifiedOn: string;
      modifiedBy: string;
      isRowDeleted: boolean;
      note: string;
      noteTypeId: string;
    };
  };
  etAdate: string;
  startTime: string;
  finishTime: string;
  eventLogStatusId: string;
  eventLogStatus: {
    id: string;
    createdOn: string;
    createdBy: string;
    modifiedOn: string;
    modifiedBy: string;
    isRowDeleted: boolean;
    name: string;
  };
  estDuration: 0;
  stagings: [
    {
      attributeName: string;
      externalId: 0;
      referenceType: string;
    }
  ];
}
