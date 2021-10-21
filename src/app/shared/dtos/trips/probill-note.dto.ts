export interface ProbillNoteDto {
  id: string;
  isAlert: boolean;
  message: string;
  departments: string[];
  createdBy: string;
  createdOn: string;
  isRowDeleted: boolean;
}
