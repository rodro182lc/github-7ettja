export enum NoteTypes {
  TripEvent = 'TripEvent',
  Trip = 'Trip'
}

export type NoteTypesKey = keyof typeof NoteTypes;
