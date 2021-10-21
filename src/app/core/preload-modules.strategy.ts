import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

// ARCH HINT: This is a custom strategy that indicates if a Module should be
// loaded from the begining or on-demand.
// Setting the preload flag to true will make the application to lazy load
// a module from the begining as the user is interacting with the app, no
// matter if the user requested it or not.
// Pre-loading makes sense if we know that a Feature Module will most likely be used.
// Setting the preload flag to false will cause the module to be loaded on-demand,
// in other words, once the user actually requests the module, for example by accessing
// the route path
@Injectable()
export class PreloadModulesStrategy implements PreloadingStrategy {
  constructor() {}

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data['preload']) {
      return load();
    } else {
      return of(null);
    }
  }
}
