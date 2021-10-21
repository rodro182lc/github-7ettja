import { NoteType } from '../note-type.model';

export interface TripNoteToAdd {
  tripId: string;
  note: string;
  noteType: NoteType;
  isInternal: boolean;
}
