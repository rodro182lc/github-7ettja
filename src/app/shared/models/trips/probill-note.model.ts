export interface ProbillNote {
  isAlert: boolean;
  message: string;
  departments: string[];
  createdBy: string;
  createdOn: Date;
}
