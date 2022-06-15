import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {NGXLogger} from 'ngx-logger';
import {Observable} from 'rxjs';
import {UNAUTHORIZED} from '../constants/logger';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedDash implements CanActivate {
  constructor(private router: Router,
              private logger: NGXLogger) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return (true) ? true : this.router.navigateByUrl('/dashboard').then(_ => {
      this.logger.info(UNAUTHORIZED);
      return false;
    });
  }

}
