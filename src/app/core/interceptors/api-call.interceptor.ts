import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiCallInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // The Accept header indicates what kind of server response our application can accept
    if (!request.headers.has('Accept')) {
      request = request.clone({
        headers: request.headers.set('Accept', 'application/json')
      });
    }

    // The Content-Type header indicates in what format the content of the current request is
    if (!request.headers.has('Content-Type')) {
      // Only patch requests need Content-Type = 'application/json-patch+json'
      if (request.method.toLowerCase() === 'patch') {
        request = request.clone({
          headers: request.headers.set(
            'Content-Type',
            'application/json-patch+json'
          )
        });
      } else {
        request = request.clone({
          headers: request.headers.set('Content-Type', 'application/json')
        });
      }
    }

    return next.handle(request);
  }
}
