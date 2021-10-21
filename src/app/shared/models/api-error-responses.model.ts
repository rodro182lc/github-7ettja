import { ResponseStatus } from '@shared/enumerations/core/response-status.enum';

// These interfaces below match exaclty the responses gotten from server for different types of error
export interface ValidationError {
  status: ResponseStatus;
  message: string;
  statusDetails: any;
}

export interface UnAuthorizedError {
  status: ResponseStatus;
  message: string;
  statusDetails: {
    type: string;
  };
}

export interface BizFailure {
  status: ResponseStatus;
  message: string;
  statusDetails: {
    failureCode: string; // Code defined by the service that represents the business case that was not successfully passed
    global?: string; // When the error is general to the whole request, not to a specific field
    details: any;
  };
}

export interface Failure {
  status: ResponseStatus;
  message: string;
  statusDetails: {
    traceId: string; // Unique identifier that helps to track the issue in internal backend logs
  };
}

// This interface below will be used in our Angular Forms to show errors for specific fields
export interface FriendlyError {
  generalLevelError?: string;
  fieldLevelErrors: any;
}
