import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BizFailure,
  Failure,
  ValidationError
} from '@shared/models/api-error-responses.model';
//import { EventBusService } from './event-bus.service';
//import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService extends ErrorHandler {
  constructor(
    //private loggerService: LoggerService,
    private router: Router //private toasterEventBusService: EventBusService<ToasterEvents>, //private notificationBusService: EventBusService<BellEvents>
  ) {
    super();
  }

  handleError(error: any): void {
    // ARCH HINT: Here we can inspect the error to determine exactly what to do
    const errorStatus = error['status'];
    if (errorStatus === 400) {
      // 400 = ValidationError
      const typedError: ValidationError = automapper.map(
        'ValidationError',
        'ValidationError',
        error['error']
      );
      this.showNotification(typedError.message);
    } else if (errorStatus === 422) {
      // 422 = BizFailure
      const typedError: BizFailure = automapper.map(
        'BizFailure',
        'BizFailure',
        error['error']
      );
      this.showNotification(
        `${typedError.message} ${typedError.statusDetails?.global}`
      );
    } else if (errorStatus === 401 || errorStatus === 403) {
      // 401 = Unauthorized
      // 403 = Forbidden
      this.redirect('unauthorized');
    } else if (errorStatus === 404) {
      const url = error['url'];
      const errorMessage = url
        ? `The resource does not exist: ${url}`
        : `The resource does not exist`;
      // eslint-disable-next-line no-console
      console.log(errorMessage);
      /*this.notificationBusService.emit(
        new BusEvent(BellEvents.MessageReceived, errorMessage)
      );*/
    } else if (errorStatus === 500) {
      // 500 = Server-side failure
      const typedError: Failure = automapper.map(
        'Failure',
        'Failure',
        error['error']
      );
      let errorMessage = 'There was an unhandled server error';
      if (typedError?.statusDetails?.traceId) {
        errorMessage += `, trace Id: ${typedError.statusDetails.traceId}`;
      }
      this.showNotification(errorMessage);
    } else {
      const url = error['url'];
      const errorMessage = url
        ? `Unknown error when trying to call: ${url}`
        : `Unknown error`;
      // eslint-disable-next-line no-console
      console.log(errorMessage, error);
      this.showNotification(errorMessage);
      this.logError(error);
    }
  }

  private showNotification(message: string): void {
    message = message || 'Unknown error';
    /*this.toasterEventBusService.emit(
      new BusEvent(ToasterEvents.ShowFailure, message)
    );*/
  }

  private logError(error: any): void {
    //this.loggerService.logException(error);
  }

  private redirect(routePath: string): void {
    this.router.navigate([routePath]);
  }
}
