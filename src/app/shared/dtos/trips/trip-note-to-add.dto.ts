export interface TripNoteToAddDto {
  tripId: string;
  noteId: string;
  note: {
    note: string;
    noteTypeId: string;
    isInternal: boolean;
  };
}
