import {HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NGXLogger} from 'ngx-logger';
import {Observable, throwError} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {AUTHORISATION_BEARER_HEADER, SKIP_AUTH_INTERCEPTOR_HEADER, TOKEN_REFRESH_HEADER} from '../constants/header';
import {Token} from '../model/response-payload/token';
import {AuthService} from '../services/back-end/auth/auth.service';

@Injectable()
export class AuthTokenInjectorInterceptor implements HttpInterceptor {

  private isRefreshing = false;

  constructor(private router: Router,
              private authService: AuthService,
              private logger: NGXLogger) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.authService.authenticationToken;
    if (request.headers.has(SKIP_AUTH_INTERCEPTOR_HEADER.name)) {
      this.logger.trace('skipping token injection');
      return next.handle(this.removeHeader(request, SKIP_AUTH_INTERCEPTOR_HEADER.name));
    } else {
      this.logger.trace('performing JWT token injection');
      const tokenizedReq = this.injectToken(request, token.value);
      return next.handle(tokenizedReq).pipe(catchError(err => {
        if (err instanceof HttpErrorResponse  && err.status === 401 && token.value !== null /*&& err.error.message.includes('JWT expired at')*/) {
          this.logger.trace('refreshing JWT token');
          return this.handle401Error(request, next, token.value);
        } else {
          throwError(err);
        }
      }));
    }
  }

  private removeHeader(request: HttpRequest<any>, header: string): HttpRequest<any> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    return request.clone({headers});
  }

  private injectToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      headers: request.headers.set(AUTHORISATION_BEARER_HEADER.name, AUTHORISATION_BEARER_HEADER.value + token)
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler, token: string) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      return this.authService.refreshToken({token: token} ).pipe(
        switchMap((response: Token) => {
          this.isRefreshing = false;
          return next.handle(this.injectToken(request, response.value));
        }));

    } else {
      return next.handle(this.injectToken(request, token));
    }
  }
}

