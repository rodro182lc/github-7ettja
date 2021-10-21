import { CriteriaDto } from './criteria.dto';

export interface DriverSearchDto {
  filters: CriteriaDto[];
  search: {
    global: string;
  };
}
