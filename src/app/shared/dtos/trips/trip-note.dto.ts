export interface TripNoteDto {
  note: string;
  noteTypeId: string;
  isInternal: boolean;
  noteType: {
    name: string;
    id: string;
    createdOn: string;
    isRowDeleted: boolean;
  };
  id: string;
  createdBy: string;
  createdOn: string;
  isRowDeleted: boolean;
}
