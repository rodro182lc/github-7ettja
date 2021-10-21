import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalErrorHandlerService } from '@core/services/global-error-handler.service';
import { FriendlyError } from '@shared/models/api-error-responses.model';

// ARCH HINT: All http errors will be caught by this interceptor
@Injectable()
export class HandleHttpErrorInterceptor implements HttpInterceptor {
  private readonly errorsToRethrow = [400, 422];

  constructor(private errorHandler: GlobalErrorHandlerService) {}

  private convertToFriendlyError(
    error: HttpErrorResponse
  ): FriendlyError | null {
    let friendlyError: FriendlyError | null = null;
    switch (error.status) {
      case 400:
        friendlyError = automapper.map(
          'ValidationError',
          'FriendlyError',
          error.error
        );
        break;
      case 422:
        friendlyError = automapper.map(
          'BizFailure',
          'FriendlyError',
          error.error
        );
        break;
    }
    return friendlyError;
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
        // Errors are re-thrown for specific cases when the subscriber
        // wants to do something else with the error, if it's not re-thrown then those subscribers
        // won't be able to catch the error
        const shouldThrow = this.errorsToRethrow.indexOf(error.status) >= 0;
        if (shouldThrow) {
          const friendlyError: FriendlyError | null =
            this.convertToFriendlyError(error);
          return throwError(friendlyError);
        } else {
          return of(new HttpResponse());
        }
      })
    );
  }
}
