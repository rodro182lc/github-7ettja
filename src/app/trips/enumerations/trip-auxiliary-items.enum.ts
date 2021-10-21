export enum TripAuxiliaryItems {
  ReeferInfo = 'Reefer Info',
  ACIStatus = 'ACI Status',
  ProbillPickUpInfo = 'Probill Pickup Info',
  ACEStatus = 'ACE Status',
  ProbillDeliverInfo = 'Probill Deliver Info'
}

export type TripAuxiliaryItemsKey = keyof typeof TripAuxiliaryItems;
