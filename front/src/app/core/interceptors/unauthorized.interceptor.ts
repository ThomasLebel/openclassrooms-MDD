import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { SessionService } from '../services/session.service';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(private sessionService: SessionService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const skipUnauthorized =
      request.url.includes('/login') || request.url.includes('/register');

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401 && !skipUnauthorized) {
          this.sessionService.logout();
          this.router.navigate(['']);
        }
        return throwError(() => err);
      })
    );
  }
}
