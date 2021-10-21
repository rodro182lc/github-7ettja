import { ResponseStatus } from '@shared/enumerations/core/response-status.enum';

export interface ApiResponse<T = void, U = void> {
  status: ResponseStatus;
  message: string;
  result?: T;
  meta?: U;
}
