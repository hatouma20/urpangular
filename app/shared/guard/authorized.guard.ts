import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {NGXLogger} from 'ngx-logger';
import {Observable} from 'rxjs';
import {UNAUTHORIZED} from '../constants/logger';
import {AuthService} from '../services/back-end/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard implements CanActivate {
  constructor(private router: Router,
              private logger: NGXLogger,
              private authService: AuthService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return (this.authService.isAuthenticated) ? true : this.router.navigateByUrl('/auth').then(_ => {
      this.logger.info(UNAUTHORIZED);
      return false;
    });
  }
}



