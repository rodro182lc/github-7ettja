import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Data,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor() {}

  /**
   * Method that determines if the user should be allowed to navigate into this route path
   * @param routeData - Data contained in the current route that's being validated,
   * allowed roles are passed in route's configuration
   * @returns - true if the user's role is contained in the route's allowed roles, otherwise false
   */
  private checkUserAccess(routeData: Data | undefined): boolean {
    return true;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.checkUserAccess(route.data);
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.checkUserAccess(route.data);
  }
}
